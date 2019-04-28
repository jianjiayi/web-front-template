/* eslint-disable no-param-reassign */
export default {
  state: 0, // 初始化 state
  reducers: {
    //  使用纯函数处理状态更改
    /**
     *  非 immer 写法，或 return {
     *    ...state,
     *    state: state + payload
     *  }
     *  increment(state, payload) {
          return state + payload;
        },
     * @param {*} state
     * @param {*} payload
     * @returns state
     */
    increment(state, payload) {
      state += payload;
      return state;
    },
  },
  effects: dispatch => ({
    // 非纯函数
    /**
     * 使用async / await进行异步操作
     * dispatch[model][action] model是namespace，可调用任何 namespace
     *    |       |      |
     * dispatch.count.increment
     * @param {*} payload
     * @param {*} rootState
     */
    async incrementAsync(payload) {
      // eslint-disable-next-line no-console
      // eslint-disable-next-line compat/compat
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
};
