/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';

import { PATH_USER_LOGIN } from '../../config/routesConfig';
import { getStorage } from './localStorage';

const successCode = 200;
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
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

const errorHandler = ({ showToast = true }) => (error) => {
  let err = error;
  try {
    // code非0时的error
    err = JSON.parse(error.message);
  } catch {
    // console.log(error, 'error')
  }
  const { response } = err;
  if (response.code !== successCode && showToast) {
    const message = response.data || response.data.desc || codeMessage[response.code] || '';
    notification.error({
      message,
    });
  }
  if (response && response.status && showToast) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response && showToast) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  // errorHandler,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});
request.interceptors.request.use((url, { tokenName, credentials = 'include', ...options }) => {
  const newOptions = {
    method: 'get',
    headers: {},
    ...options,
  };

  // 默认错误处理 传递配置参数
  newOptions.errorHandler = errorHandler(newOptions);
  // 默认请求是否带上cookie，允许关闭
  if (credentials) {
    newOptions.credentials = credentials;
  }
  // 添加时间戳，避免缓存
  if (newOptions.method === 'get') {
    newOptions.params = {
      _t: Date.parse(new Date()) / 1000,
      ...newOptions.params,
    };
  } else {
    newOptions.data = {
      ...newOptions.data,
      _t: Date.parse(new Date()) / 1000,
    };
  }
  // if (
  //   newOptions.method.toUpperCase() === 'POST'
  //   || newOptions.method.toUpperCase() === 'PUT'
  //   || newOptions.method.toUpperCase() === 'DELETE'
  // ) {
  //   if (!(newOptions.body instanceof FormData)) {
  //     newOptions.headers = {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json; charset=utf-8',
  //       ...newOptions.headers,
  //     };
  //     newOptions.body = JSON.stringify(newOptions.body);
  //   } else {
  //     // newOptions.body is FormData
  //     newOptions.headers = {
  //       Accept: 'application/json',
  //       ...newOptions.headers,
  //     };
  //   }
  // }

  const token = getStorage(tokenName || 'JWT_JHFF_TOKEN');
  // 权限
  if (token) {
    // eslint-disable-next-line dot-notation
    newOptions.headers['Authorization'] = token;
  }
  return {
    url: `${url}`,
    options: {
      ...newOptions,
    },
  };
}, { global: false });
// eslint-disable-next-line consistent-return
request.interceptors.response.use(async (response, { showToast = true }) => {
  if (response && response.status === 200) {
    const data = await response.clone().json();
    if (data.code !== successCode) {
      // 未登录跳转
      if (data.code === 401 && history.location.pathname !== PATH_USER_LOGIN) {
        return history.push(`${PATH_USER_LOGIN}?redirect=${encodeURIComponent(window.location.href)}`);
      }
      throw new Error(JSON.stringify({
        ...data,
        response: data,
      }));
    }
    // return RequestResults.success(data)
    return data;
  }
  if (response && response.status) {
    if (showToast) {
      notification.error({
        message: codeMessage[response.status] || response.statusText,
      });
    }
    return response;
  }
  return response;
  // return RequestResults.error('错误', -9999)
}, { global: false });
export default request;
