/* eslint-disable max-len */
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';

import routes, { userRoutes } from '../router/routes';

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  if (!data) {
    return undefined;
  }
  return data
    .map((item) => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName && parentName !== '/') {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      // const name = menu.disableLocal
      //   ? item.name
      //   : formatMessage({ id: locale, defaultMessage: item.name });
      const { name } = item;
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
// const getSubMenu = (item) => {
//   // doc: add hideChildrenInMenu
//   if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
//     return {
//       ...item,
//       children: filterMenuData(item.children), // eslint-disable-line
//     };
//   }
//   return item;
// };
/**
 * filter menuData
 */
const filterMenuData = (menuData) => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    // .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = (menuData) => {
  if (!menuData) {
    return {};
  }
  const routerMap = {};

  const flattenMenuData = (data) => {
    data.forEach((menuItem) => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};
const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);
const originalMenuData = memoizeOneFormatter(routes);
const originalUserRoutes = memoizeOneFormatter(userRoutes);
const menuData = filterMenuData(originalMenuData);
const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData.concat(originalUserRoutes));
export default {
  state: {
    menuData,
    breadcrumbNameMap,
  }, // 初始化 state
  reducers: {
    // 使用纯函数处理状态更改
    setMenuData(state, payload) {
      return state + payload;
    },
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // 使用async / await进行异步操作
    async getMenuData(payload, rootState) {
      // eslint-disable-next-line no-console
      console.log(rootState);
      // eslint-disable-next-line compat/compat
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.menu.setMenuData(payload);
    },
  }),
};
