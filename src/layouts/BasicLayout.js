import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Layout } from 'antd';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import getPageTitle from '../util/getPageTitle';
import Header from './Header';
import Footer from './Footer';
import Context from './MenuContext';
import SiderMenu from '../components/SiderMenu';
import routes from '../router/routes';
import styles from './BasicLayout.module.less';
import logo from '../assets/logo.svg';
// import Media from 'react-media';

const { Content } = Layout;

class BasicLayout extends Component {
  getLayoutStyle = () => {
    const {
      fixSiderbar, isMobile, collapsed, layout,
    } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContext() {
    const { location, breadcrumbNameMap, menuData } = this.props;
    return {
      menuData,
      location,
      breadcrumbNameMap,
    };
  }

  /**
   * rematch 的两种使用方式
   * const mapDispatchToProps = ({ global: { changeLayoutCollapsed } }) => ({
   *  changeLayoutCollapsed: payload => changeLayoutCollapsed(payload),
   * });
   * // const { dispatch } = this.props;
   * // dispatch.global.changeLayoutCollapsed(collapsed);
   *
   * @memberof BasicLayout
   */
  handleMenuCollapse = (collapsed) => {
    const { changeLayoutCollapsed } = this.props;
    changeLayoutCollapsed(collapsed);
    // const { dispatch } = this.props;
    // dispatch.global.changeLayoutCollapsed(collapsed);
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      // children,
      location,
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
    } = this.props;
    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (<SiderMenu
          logo={logo}
          theme={navTheme}
          onCollapse={this.handleMenuCollapse}
          routes={routes}
          {...this.props}
        />)}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content
            className={styles.content}
            style={contentStyle}
          >
            {/* <Switch location={location}> */}
            {/** react-router 静态 routes 配置使用方法 */}
            {renderRoutes(routes.slice(1), {
              ...this.props,
            })}
            {/* </Switch> */}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <>
        <DocumentTitle title={getPageTitle(location.pathname, breadcrumbNameMap)}>
          <Context.Provider value={this.getContext()}>
            {layout}
          </Context.Provider>
        </DocumentTitle>
      </>
    );
  }
}
const mapStateToProps = ({
  menu, global, setting, loading,
}) => ({
  breadcrumbNameMap: menu.breadcrumbNameMap,
  layout: setting.layout,
  menuData: menu.menuData,
  collapsed: global.collapsed,
  ...setting,
  loading,
});
const mapDispatchToProps = ({ global: { changeLayoutCollapsed } }) => ({
  changeLayoutCollapsed: payload => changeLayoutCollapsed(payload),
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
