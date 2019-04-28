/* eslint-disable compat/compat */
/* eslint-disable no-param-reassign */
import { getUsers, login, logout } from '../services/api';
import { getPageQuery } from '../util/utils';
import history from '../router/history';

export default {
  state: {
    isLogin: false,
    appLoading: false,
    currentUser: {},
  },
  reducers: {
    setIsLogin(state, payload) {
      state.isLogin = payload;
      if (!payload) {
        state.currentUser = {};
      }
      return state;
    },
    setAppLoading(state, payload) {
      state.appLoading = payload;
      return state;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
      state.isLogin = true;
      state.appLoading = true;
      return state;
    },
  },
  effects: dispatch => ({
    async login(payload) {
      const res = await login(payload);
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      if (res.code === 0) {
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
        dispatch.user.setCurrentUser(res.data);
        history.replace(redirect || '/');
      }
    },
    async getUsers() {
      const res = await getUsers();
      if (res.code === 0) {
        dispatch.user.setCurrentUser(res.data);
      } else {
        dispatch.user.setAppLoading(true);
      }
    },
    async logout() {
      await logout();
      dispatch.user.setIsLogin(false);
    },
  }),
};
