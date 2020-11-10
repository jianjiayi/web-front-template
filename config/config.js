// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import theme from './theme';
import routes, { basename as base } from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  base, // 设置路由前缀，通常用于部署到非根目录。
  hash: true, // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
  antd: {},
  dva: false,
  layout: {
    locale: false,
    ...defaultSettings,
  },
  // dva: {
  //   hmr: true,
  // },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  history: {
    type: 'browser',
  },
  // umi routes: https://umijs.org/docs/routing
  // routes: [
  //   {
  //     path: '/user',
  //     component: '../layouts/UserLayout',
  //     routes: [
  //       {
  //         name: 'login',
  //         path: '/user/login',
  //         component: './user/login',
  //       },
  //     ],
  //   },
  //   {
  //     path: '/',
  //     component: '../layouts/SecurityLayout',
  //     routes: [
  //       {
  //         path: '/',
  //         component: '../layouts/BasicLayout',
  //         authority: ['admin', 'user'],
  //         routes: [
  //           {
  //             path: '/',
  //             redirect: '/welcome',
  //           },
  //           {
  //             path: '/welcome',
  //             name: 'welcome',
  //             icon: 'smile',
  //             component: './Welcome',
  //           },
  //           {
  //             path: '/admin',
  //             name: 'admin',
  //             icon: 'crown',
  //             component: './Admin',
  //             authority: ['admin'],
  //             routes: [
  //               {
  //                 path: '/admin/sub-page',
  //                 name: 'sub-page',
  //                 icon: 'smile',
  //                 component: './Welcome',
  //                 authority: ['admin'],
  //               },
  //             ],
  //           },
  //           {
  //             name: 'list.table-list',
  //             icon: 'table',
  //             path: '/list',
  //             component: './ListTableList',
  //           },
  //           {
  //             component: './404',
  //           },
  //         ],
  //       },
  //       {
  //         component: './404',
  //       },
  //     ],
  //   },
  //   {
  //     component: './404',
  //   },
  // ],
  routes: routes(),
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme,
  // theme: {
  //   // ...darkTheme,
  //   'primary-color': defaultSettings.primaryColor,
  // },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // plugins: [
  //   '@umijs/plugin-layout',
  // ]
});
