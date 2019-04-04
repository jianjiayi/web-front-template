import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import { Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { renderRoutes } from 'react-router-config';

import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.module.less';
import logo from '../assets/logo.svg';
import getPageTitle from '../util/getPageTitle';
import { userRoutes } from '../router/routes';


const fullYear = new Date().getFullYear();
const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> {fullYear} 技术部出品
  </Fragment>
);
class UserLayout extends Component {
  componentDidMount() {}

  render() {
    const {
      // children,
      location,
      breadcrumbNameMap,
    } = this.props;
    const { pathname } = location;
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Ant Design</span>
                </Link>
              </div>
              <div className={styles.desc}>Ant Design Web 设计规范</div>
            </div>
            <Switch location={location}>
              {/* <Route exact path="/user/login" component={() => <div>log</div>} /> */}
              {renderRoutes(userRoutes)}
            </Switch>
          </div>
          <GlobalFooter copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu }) => ({
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
}))(UserLayout);
