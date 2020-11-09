import { useState, useCallback } from 'react';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { history } from 'umi';

import { login } from '../services/api';

export default function useAuthModel() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('init');
  const [submitting, setSubmitting] = useState(false);
  const signin = useCallback(async (payload, setInitialState, refresh) => {
    setSubmitting(false);
    const { data, code } = await login(payload);
    setSubmitting(true);
    if (code === 200) {
      setUser(data);
      setInitialState(setInitialState);
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      message.success('🎉 🎉 🎉  登录成功！');
      let { redirect } = params;

      if (redirect) {
        const redirectUrlParams = new URL(redirect);

        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);

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
  }, []);
  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, []);
  return {
    user,
    submitting,
    status,
    signin,
    signout,
  };
}
