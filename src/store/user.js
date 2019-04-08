/* eslint-disable compat/compat */
/* eslint-disable no-param-reassign */
import { getUsers, login } from '../services/api';
import { getPageQuery } from '../util/utils';
import history from '../router/history';

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
      const res = await login(payload);
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          redirect = null;
        }
      }
      dispatch.user.setIsLogin(true);
      history.replace(redirect || '/');
    },
    async getUsers() {
      const res = await getUsers();
      // dispatch.user.setIsLogin(payload);
    },
    async logout(payload = false) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.user.setIsLogin(payload);
    },
  }),
};
