import React from 'react';
import { StarOutlined } from '@ant-design/icons';

import lazyComponent, { redirectTo, renderChildren } from '@/utils/lazyComponent';
import { rootPathName } from '@/config';

const InitView = React.lazy(() => import('./routes'));
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
    path: `${rootPathName}/hooks`,
    name: 'Hooks',
    icon: <StarOutlined />,
    component: renderChildren,
    routes: [
      {
        path: `${rootPathName}/hooks/component`,
        name: 'component',
        component: lazyComponent(InitView),
      },
      {
        path: '*',
        name: '404',
        hideInMenu: true,
        component: () => redirectTo(`${rootPathName}/hooks/component`),
      },
    ],
  },
]);
export default routes;
