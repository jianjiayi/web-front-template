import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import PageLoading from '../components/PageLoading';

const Login = React.lazy(() => import('../pages/User/Login'));
const Analysis = React.lazy(() => import('../pages/Dashboard/Analysis'));
const BasicForm = React.lazy(() => import('../pages/Forms/BasicForm'));
const TableList = React.lazy(() => import('../pages/List/TableList'));
const lazy = CusComponent => (<Suspense fallback={<PageLoading />}>{CusComponent}</Suspense>);

const RdeTo = () => (
  <Redirect to="/dashboard/analysis" />
);
const Root = ({ route }) => (
  <>
    {/* <h1>Root</h1> */}
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </>
);
const routes = [
  {
    path: '/',
    redirect: '/dashboard/',
    authority: [
      'admin',
      'user',
    ],
    exact: true,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: Root,
    routes: [
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: props => lazy(<Analysis {...props} />),
      },
      {
        path: '/dashboard/monitor',
        name: 'monitor',
        component: () => (<div>asd</div>),
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    icon: 'form',
    component: Root,
    routes: [
      {
        path: '/form/basic-form',
        name: 'basic-form',
        component: props => lazy(<BasicForm {...props} />),
      },
      {
        path: '/form/step-form',
        name: 'step-form',
        component: () => (<div>step-form</div>),
      },
    ],
  },
  {
    path: '/list',
    name: 'list',
    icon: 'table',
    redirect: '/list/table-list',
    component: Root,
    routes: [
      {
        path: '/list/table-list',
        name: 'table-list',
        component: props => lazy(<TableList {...props} />),
      },
      {
        path: '/list/step-form',
        name: 'step-form',
        component: () => (<div>step-form</div>),
      },
    ],
  },
  {
    path: '/setting',
    name: 'setting',
    icon: 'setting',
    component: Root,
    routes: [
      {
        path: '/setting/info',
        name: 'info',
        component: () => (<div>info</div>),
      },
      {
        path: '/setting/password',
        name: 'password',
        component: () => (<div>password</div>),
      },
    ],
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: RdeTo,
  },
];


export const userRoutes = [
  {
    path: '/user',
    name: 'user',
    icon: 'dashboard',
    component: Root,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: props => lazy(<Login {...props} />),
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => (<div>register</div>),
      },
      {
        path: '/user/forget',
        name: 'forget',
        component: () => (<div>forget</div>),
      },
    ],
  },
];
export default routes;
