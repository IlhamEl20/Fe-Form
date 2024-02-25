export const state = () => ({});

export const mutations = {};

export const actions = {
  async store() {
    const response = await this.$axios.$post("/forms");
    if (!response) {
      return false;
    }

    return response;
  },
};
