/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
export default {
  state: {
    collapsed: false,
  },
  reducers: {
    setCollapsed(state, payload) {
      state.collapsed = payload;
      return state;
    },
  },
  effects: dispatch => ({
    changeLayoutCollapsed(payload, _rootState) {
      dispatch.global.setCollapsed(payload);
    },
  }),
};
