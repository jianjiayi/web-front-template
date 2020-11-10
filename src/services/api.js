import { apiCommonPath } from '@/constants';
import request from '@/utils/request';

export const API_LOGIN = `${apiCommonPath}/auth/login`;
export const API_LOGIN_OUT = `${apiCommonPath}/auth/logout`;

export async function login(data) {
  return request(API_LOGIN, {
    method: 'post',
    data: {
      ...data,
      password: btoa(data.password),
    },
  });
}
export async function loginOut() {
  return request(API_LOGIN_OUT);
}

export default {};
