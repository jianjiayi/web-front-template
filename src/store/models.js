/**
 * 注意导出的default as xxx 的别名，此处的 xxx 即是
 * dispatch[model][action]的model名(namespace)
 * eq:
 * dispatch.count.increment(1)
 * 此处我故意使用的sample.js 文件名，以作示例。
 * 实际情况应文件名和导出名相同
 * export { default as count } from './count';
 */
// eslint-disable-next-line import/prefer-default-export
export { default as menu } from './menu';
export { default as global } from './global';
export { default as setting } from './setting';
export { default as count } from '../pages/Sample/model';
export { default as chart } from '../pages/Dashboard/models/chart';
export { default as rule } from '../pages/List/models/rule';

export { default as user } from './user';

// 上面的写法 触发eslint-disable-next-line警告，下面的写法正常
// import sample from './sample';
// export { sample as default };
