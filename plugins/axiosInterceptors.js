export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.accessToken) {
      const accessToken = store.state.auth.accessToken;
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
  });

  $axios.onResponseError(async (err) => {
    try {
      if (err.response.status === 401) {
        let refreshToken = store.state.auth.refreshToken;

        const response = await $axios.$post("/refresh-token", {
          refreshToken: refreshToken,
        });
        // simpan token baru
        store.commit("auth/setAccessToken", response.accessToken);
        store.commit("auth/setRefreshToken", response.refreshToken);

        let originalRequest = err.config;
        originalRequest.headers["Authorization"] =
          "Bearer " + response.accessToken;

        return $axios(originalRequest);
      }
    } catch (error) {
      console.log(error);
    }
  });
}
