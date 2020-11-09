import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import lazyComponent, { redirectTo, renderChildren } from '@/utils/lazyComponent';
import { rootPathName } from '@/config';

// const InitView = React.lazy(() => import('./routes'));
const Users = React.lazy(() => import('./routes/Users'));
const Roles = React.lazy(() => import('./routes/Roles'));
/**
* 相关routes
* renderRoutes(route.routes) 父级必须添加
 * 渲染子路由
 * child routes won't render without this
 * @param {*} { route }
 * export const renderChildren = ({ route }) => (
    <>
      {renderRoutes(route.routes)}
    </>
  );
 * 或自定义公共布局
 * ...
 * component: renderLayout,
 * ...
 * export const renderLayout = ({ route }) => (
    <Card bordered={false}>
      <Fragment>
        <Steps current={this.getCurrentStep()} className={styles.steps}>
          <Step title="账户注册" />
          <Step title="入驻信息" />
          <Step title="完成" />
        </Steps>
        {renderRoutes(route.routes)}
      </Fragment>
    </Card>
  );

* redirectTo 重定向到模块首页
*/

const routes = () => ([
  {
    path: `${rootPathName}/admin`,
    name: '其他功能',
    icon: <ExclamationCircleOutlined />,
    component: renderChildren,
    routes: [
      {
        path: `${rootPathName}/admin/users`,
        name: '用户管理',
        component: lazyComponent(Users),
      },
      {
        path: `${rootPathName}/admin/roles`,
        name: '角色管理',
        component: lazyComponent(Roles),
      },
      {
        path: '*',
        name: '404',
        hideInMenu: true,
        component: () => redirectTo(`${rootPathName}/admin/users`),
      },
    ],
  },
]);
export default routes;
