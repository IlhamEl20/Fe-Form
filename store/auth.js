export const state = () => ({
  accessToken: null,
  refreshToken: null,
  fullname: null,
  // isLoggedIn:false,
  // isAdmin:false,
  // isSuperAdmin:false,
});

export const getters = {
  authenticated(state) {
    if (state.accessToken) {
      return true;
    }
    return false;
  },
};
export const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },

  setFullname(state, fullname) {
    state.fullname = fullname;
  },
  logout(state) {
    state.refreshToken = null;
    state.accessToken = null;
    state.fullname = null;
  },
};

export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.post("/login", payload);
    if (!response) {
      return false;
    }
    commit("setAccessToken", response.data.accessToken);
    commit("setRefreshToken", response.data.refreshToken);
    commit("setFullname", response.data.fullname);
    return response;
  },
};
