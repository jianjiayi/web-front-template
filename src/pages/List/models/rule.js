export default {
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  reducers: {

  },
  effects: dispatch => ({
    update(paylod, rootState) {
      console.log(paylod, rootState);
    },
  }),
};
