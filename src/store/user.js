/* eslint-disable compat/compat */
/* eslint-disable no-param-reassign */
import { getUsers, login } from '../services/api';

export default {
  state: {
    isLogin: false,
  },
  reducers: {
    setIsLogin(state, payload) {
      state.isLogin = payload;
      return state;
    },
  },
  effects: dispatch => ({
    async login(payload) {
      const res = await login({
        ...payload,
        validateCode: '2134',
        rememberMe: 'no',
      });
      console.log(res, 'login');
      dispatch.user.setIsLogin(true);
    },
    async getUsers() {
      const res = await getUsers();
      console.log(res, 'getUsers');
      // dispatch.user.setIsLogin(payload);
    },
    async logout(payload = false) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.user.setIsLogin(payload);
    },
  }),
};
