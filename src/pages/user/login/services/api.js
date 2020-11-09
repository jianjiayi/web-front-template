import { apiCommonPath } from '@/constants';
import request from '@/utils/request';

export const API_LOGIN = `${apiCommonPath}/user/login`;

export async function login(data) {
  return request(API_LOGIN, {
    method: 'post',
    data,
  });
}

export default {};
