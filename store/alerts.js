export const state = () => ({
  alerts: [
    { message: "test alert", type: "error", show: true },
    { message: "test alert2", type: "success", show: true },
  ],
});
export const mutations = {
  show(state, alert) {
    state.alerts.push(alert);
  },
  close(state, index) {
    state.alerts[index].show = false;
  },
  reset(state) {
    state.alerts = [];
  },
};
