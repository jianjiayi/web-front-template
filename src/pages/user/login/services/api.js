import { apiCommonPath } from '@/constants';
import request from '@/utils/request';

export const API_LOGIN = `${apiCommonPath}/auth/login`;

export async function login(data) {
  return request(API_LOGIN, {
    method: 'post',
    data: {
      ...data,
      password: btoa(data.password),
    },
  });
}

export default {};
