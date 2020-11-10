import {
  PATH_HOME, PATH_USER, PATH_USER_LOGIN, rootPathName,
} from '../constants/routesConfig';
import HooksRouter from './Hooks/router';

const routes = () => ([
  {
    path: PATH_USER,
    layout: false,
    routes: [
      {
        name: 'login',
        path: PATH_USER_LOGIN,
        component: './user/login',
      },
    ],
  },
  {
    path: PATH_HOME,
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/demo',
    name: 'formDemo',
    icon: 'smile',
    component: './Demo/Welcome',
  },
  {
    path: `${rootPathName}/admin`,
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: `${rootPathName}/admin/sub-page`,
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  HooksRouter(),
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: `${rootPathName}/list`,
  //   // component: './ListTableList',
  //   routes: [
  //     {
  //       path: `${rootPathName}/list/hooks`,
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Hooks/routes',
  //     },
  //     {
  //       path: `${rootPathName}/list/first-page`,
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       path: `${rootPathName}/list/sub-page`,
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './ListTableList',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: PATH_HOME,
  },
  {
    component: './404',
  },
]);
export default routes;
