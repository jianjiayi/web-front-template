import React from 'react';
import { notification } from 'antd';
import { history } from 'umi';
import HeaderContent from '@/components/HeaderContent';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import logo from '@/assets/logo.svg';

// import { ResponseError } from 'umi-request';
// import { PATH_USER_LOGIN } from '../config/routesConfig';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const { data: currentUser, code } = await queryCurrent();
      // console.log(currentUser, 'currentUser')
      if (code === 200) {
        return {
          ...currentUser,
          // access: 'admin',
        };
      }
      return undefined;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  const currentUser = await fetchUserInfo();
  // 如果是登录页面，不执行
  // if (history.location.pathname !== '/user/login') {
  //   const currentUser = await fetchUserInfo();
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: defaultSettings,
  //   };
  // }
  return {
    currentUser,
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}) => ({
  logo,
  headerContentRender: (props) => <HeaderContent {...props} />,
  rightContentRender: () => <RightContent />,
  disableContentMargin: false,
  footerRender: () => <Footer />,
  // onPageChange: () => {
  //   const { currentUser } = initialState;
  //   const { location } = history;
  //   // 如果没有登录，重定向到 login || request 请求封装中也跳转
  //   if (!currentUser && location.pathname !== PATH_USER_LOGIN) {
  //     history.push(PATH_USER_LOGIN);
  //   }
  // },
  menuHeaderRender: undefined,
  ...initialState,
});

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

export const request = {
  errorHandler,
};

// // 修改路由。请求服务端根据响应动态更新路由
// let extraRoutes;
// export function patchRoutes({ routes }) {
//   merge(routes, extraRoutes);
// }

// 比如用于渲染之前做权限校验

// export function render() {
//   fetch('/api/routes').then((res) => { extraRoutes = res.routes })
// }

// 在初始加载和路由切换时做一些事情。

// 比如用于做埋点统计
// export function onRouteChange({ location, routes, action }) {
//   bacon(location.pathname);
// }

// rootContainer(LastRootContainer, args)
// 修改交给 react-dom 渲染时的根组件。

// 比如用于在外面包一个 Provider，
// args 包含：

// routes，全量路由配置
// plugin，运行时插件机制
// history，history 实例
// export function rootContainer(container) {
//   return React.createElement(ThemeProvider, null, container);
// }
