import pathToRegexp from 'path-to-regexp';
import isEqual from 'lodash/isEqual';
/**
 * 记忆化库-memoize-one
 * 这个库的每个实例都缓存了一个结果，
 * 下一次不同的结果将覆盖上一次的。
 * 虽然只能缓存一个数据，但是用到合适的地方却能发挥很大的作用。
 */
import memoizeOne from 'memoize-one';
import {
  // menu,
  title,
} from '../config/defaultSettings';

export const matchParamsPath = (pathname, breadcrumbNameMap) => {
  const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
  return breadcrumbNameMap[pathKey];
};

const getPageTitle = (pathname, breadcrumbNameMap) => {
  const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currRouterData) {
    return title;
  }
  const pageName = currRouterData.name;
  // const pageName = menu.disableLocal
  //   ? currRouterData.name
  //   : formatMessage({
  //       id: currRouterData.locale || currRouterData.name,
  //       defaultMessage: currRouterData.name,
  //     });

  return `${pageName} - ${title}`;
};

export default memoizeOne(getPageTitle, isEqual);
