/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/**
 * localStorage 命名约束
 * 采用命名空间 PEOPLE_TOOLS_[model]_[key]
 * /constant/storeKeys
 * @param {*} key
 */

export function getStorage(key) {
  if (key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}
export function setStorage(key, value) {
  if (key) {
    try {
      return localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}

export function removeStorage(key) {
  if (key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}

// 慎用，你会把别人的也清除
export function clearStorage() {
  try {
    localStorage.clear();
  } catch (e) {
    return false;
  }
}
