export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.accessToken) {
      const accessToken = store.state.auth.accessToken;
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
  });

  $axios.onResponseError(async (err) => {
    try {
      if (
        err.response.data.message === "REFRESH_TOKEN_EXP" ||
        err.response.data.message === "INVALID_REFRESH_TOKEN"
      ) {
        throw new Error("LOGOUT");
      }
      if (
        err.response.status === 401 &&
        err.response.data.message === "ACCESS_TOKEN_EXP"
      ) {
        let refreshToken = store.state.auth.refreshToken;

        const response = await $axios.$post("/refresh-token", {
          refreshToken: refreshToken,
        });
        if (!response) {
          throw new Error("LOGOUT");
        }
        // simpan token baru
        store.commit("auth/setAccessToken", response.accessToken);
        store.commit("auth/setRefreshToken", response.refreshToken);

        let originalRequest = err.config;
        originalRequest.headers["Authorization"] =
          "Bearer " + response.accessToken;

        return $axios(originalRequest);
      } else {
        // console.log(err);
        return Promise.reject(err);
      }
    } catch (error) {
      if (error.message === "LOGOUT") {
        return redirect("/logout");
      }
    }
  });
}
