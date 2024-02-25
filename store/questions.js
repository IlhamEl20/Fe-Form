export const state = () => ({});

export const mutations = {};

export const actions = {
  async store({}, id) {
    const response = await this.$axios.$post(`forms/${id}/questions`);

    if (!response) {
      return false;
    }

    return response;
  },
};
