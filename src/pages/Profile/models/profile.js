export default {
  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },
  reducers: {},
  effects: dispatch => ({
    load(payload, rootState) {
      console.log(dispatch, payload, rootState);
    },
  }),
};
