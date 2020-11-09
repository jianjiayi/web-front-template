// import { request } from 'umi';
import { apiCommonPath } from '@/constants';
import request from '@/utils/request';

const API_GET_CURRENT_USER = `${apiCommonPath}/user/getCurrentUser`;

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  // return {
  //   url: API_GET_CURRENT_USER,
  // };
  return request(API_GET_CURRENT_USER, {
    // showToast: false,
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
