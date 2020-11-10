import { apiCommonPath } from '@/config';
import request from '../utils/request';

// const createRequest = async (url, params) => request(url, params);
// async function createRequest(url, params) {
//   return request(url, params);
// }

// 系统菜单
export function getMenus() {
  return async () => request(`${apiCommonPath}/menus`);
}
// 角色管理共 (5) 个
// 获取角色列表
export function getRoles(params) {
  return async () => request(`${apiCommonPath}/roles`, {
    params,
  });
  // return async () => createRequest(`${apiCommonPath}/roles`, {
  //   params,
  // });
}
// 角色详情
export function getRoleDetail(roleId) {
  return async () => request(`${apiCommonPath}/roles/${roleId}`);
}
// 删除角色
export function deleteRoleId(roleId) {
  return async () => request(`${apiCommonPath}/roles/${roleId}/delete`, {
    method: 'post',
  });
}
// 增加角色
// name T文本 是
// description T文本 是
// menuIds T文本 是
// [1,2,3,4] 菜单id集合，需要注意的是如果子id被选中，父id默认选中
// status T文本 是 0:禁用；1：启用
export function addRole(data) {
  return async () => request(`${apiCommonPath}/roles`, {
    data,
    method: 'post',
  });
}
// 更新角色
export function updateRole(roleId, data) {
  return async () => request(`${apiCommonPath}/roles/${roleId}`, {
    data,
    method: 'post',
  });
}
// 禁用启用角色状态
export function switchRoleStatus(roleId, data) {
  return async () => request(`${apiCommonPath}/roles/${roleId}/switch`, {
    data,
    method: 'post',
  });
}

// 用户相关共 (3) 个
// 管理员列表
export function getAdmins(params) {
  return async () => request(`${apiCommonPath}/admins`, { params });
}
// 管理员详情
export function getAdminDetail(adminId) {
  return async () => request(`${apiCommonPath}/admins/${adminId}`);
}
// 管理员角色授权
export function setAdminRoles(adminId, data) {
  return async () => request(`${apiCommonPath}/admins/${adminId}/roles`, {
    data, // {roleIds: [1,2,3,4]}
    method: 'post',
  });
}
