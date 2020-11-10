/* eslint-disable no-console */
export default {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      console.log(rootState);
      // eslint-disable-next-line no-console
      // eslint-disable-next-line compat/compat
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.sample.increment(payload);
    },
  }),
};
