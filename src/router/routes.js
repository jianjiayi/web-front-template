import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import PageLoading from '../components/PageLoading';

const Login = React.lazy(() => import('../pages/User/Login'));
const Register = React.lazy(() => import('../pages/User/Register'));
const StepLayout = React.lazy(() => import('../pages/User/StepLayout'));
const Step3 = React.lazy(() => import('../pages/User/Step3'));
const Analysis = React.lazy(() => import('../pages/Dashboard/Analysis'));
const BasicForm = React.lazy(() => import('../pages/Forms/BasicForm'));
const TableList = React.lazy(() => import('../pages/List/TableList'));
const AdvancedProfile = React.lazy(() => import('../pages/Profile/AdvancedProfile'));
const Success = React.lazy(() => import('../pages/Result/Success'));
const Error = React.lazy(() => import('../pages/Result/Error'));
const BraftEditor = React.lazy(() => import('../pages/Editor'));
const SettingLayout = React.lazy(() => import('../pages/Setting/SettingLayout'));
const BaseView = React.lazy(() => import('../pages/Setting/BaseView'));
const lazy = CusComponent => (<Suspense fallback={<PageLoading />}>{CusComponent}</Suspense>);

const RdeTo = path => (
  <Redirect to={path || '/dashboard/analysis'} />
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
    path: '/profile',
    name: 'profile',
    icon: 'profile',
    redirect: '/profile/table-list',
    component: Root,
    routes: [
      {
        path: '/profile/advanced',
        name: 'advanced',
        component: props => lazy(<AdvancedProfile {...props} />),
      },
      {
        path: '/profile/step-form',
        name: 'step-form',
        component: () => (<div>step-form</div>),
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    icon: 'check-circle',
    redirect: '/result/success',
    component: Root,
    routes: [
      {
        path: '/result/success',
        name: 'success',
        component: props => lazy(<Success {...props} />),
      },
      {
        path: '/result/fail',
        name: 'fail',
        component: props => lazy(<Error {...props} />),
      },
    ],
  },
  {
    path: '/editor',
    name: 'editor',
    icon: 'highlight',
    redirect: '/editor/BraftEditor',
    component: Root,
    routes: [
      {
        path: '/editor/BraftEditor',
        name: 'BraftEditor',
        component: props => lazy(<BraftEditor {...props} />),
      },
      {
        path: '/editor/ueEditor',
        name: 'fail',
        component: () => <div>ueEditor</div>,
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    icon: 'setting',
    component: props => lazy(<SettingLayout {...props} />),
    routes: [
      {
        path: '/settings/base',
        name: 'base',
        component: props => lazy(<BaseView {...props} />),
      },
      {
        path: '/settings/security',
        name: 'security',
        component: () => (<div>security</div>),
      },
      {
        path: '/settings/binding',
        name: 'binding',
        component: () => (<div>binding</div>),
      },
      {
        path: '/settings/notification',
        name: 'notification',
        component: () => (<div>notification</div>),
      },
    ],
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: () => RdeTo(),
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
        component: props => lazy(<Register {...props} />),
      },
      {
        path: '/user/step-register',
        name: 'register',
        component: props => lazy(<StepLayout {...props} />),
        routes: [
          {
            path: '/user/step-register/register',
            name: '注册',
            component: props => lazy(<Register {...props} />),
          },
          {
            path: '/user/step-register/incoming',
            name: '入驻',
            component: () => (<div>notification</div>),
          },
          {
            path: '/user/step-register/result',
            name: '完成',
            component: props => lazy(<Step3 {...props} />),
          },
          {
            path: '*',
            name: '404',
            hideInMenu: true,
            component: () => RdeTo('/user/step-register/register'),
          },
        ],
      },
      {
        path: '/user/forget',
        name: 'forget',
        component: () => (<div>forget</div>),
      },
      {
        path: '*',
        name: '404',
        hideInMenu: true,
        component: () => RdeTo('/user/login'),
      },
    ],
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: () => RdeTo(`/user/login?redirect=${encodeURIComponent(window.location.href)}`),
  },
];
export default routes;
