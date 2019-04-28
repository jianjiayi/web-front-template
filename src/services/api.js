import request from '../util/request';

export async function fakeChartData() {
  return request('/api/mock/fake_chart_data');
}
export async function getUsers() {
  return request('/api/users/user/current');
}
export async function login(params) {
  return request('/auth/login', {
    method: 'post',
    data: params,
  });
}
export async function logout() {
  return request('/auth/logout', {
    method: 'get',
  });
}

export default {};
