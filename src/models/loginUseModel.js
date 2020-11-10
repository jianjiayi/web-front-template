import { useState, useCallback } from 'react';
import { stringify } from 'querystring';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { history } from 'umi';

import { PATH_USER_LOGIN } from '@/constants/routesConfig';
import { setStorage, removeStorage } from '@/utils/localStorage';
import { tokenName } from '@/constants';
import { login, loginOut } from '@/services/api';
import { basename } from '../../config/routes';

export default function useAuthModel() {
  const [userInfo, setUser] = useState(null);
  const [status, setStatus] = useState('init');
  const [submitting, setSubmitting] = useState(false);
  const signin = useCallback(async (payload, setInitialState, refresh) => {
    setSubmitting(false);
    try {
      const res = await login(payload);
      const { user, success } = res;
      setSubmitting(true);
      if (success) {
        setUser(user);
        if (user.token) {
          setStorage(tokenName, user.token);
        }
        setInitialState(setInitialState);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(`${urlParams.origin}${basename}`.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
        refresh();
      } else {
        setStatus('error');
      }
    } catch (error) {
      // console.log(error, 'error')
    }
  }, []);
  const signout = useCallback(async () => {
    try {
      await loginOut();
    } catch (error) {
      //
    }
    removeStorage(tokenName);
    const { redirect } = getPageQuery(); // Note: There may be security issues, please note

    if (window.location.pathname !== PATH_USER_LOGIN && !redirect) {
      history.replace({
        pathname: PATH_USER_LOGIN,
        search: stringify({
          redirect: window.location.href,
        }),
      });
    }
  }, []);
  return {
    user: userInfo,
    submitting,
    status,
    signin,
    signout,
  };
}
