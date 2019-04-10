import React from 'react';
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import history from './history';
import ScrollToTop from '../components/ScrollToTop';
import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';
import PageLoging from '../components/PageLoading';

class Root extends React.Component {
  componentDidMount() {
    // console.log(this.props, 'router');
    const { getUsers } = this.props;
    getUsers();
  }

  render() {
    const { isLogin, appLoading } = this.props;
    if (!appLoading) {
      return <PageLoging />;
    }
    return (
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <Route
              path="/user"
              component={UserLayout}
            />
            <Route
              path="/"
              render={() => (
                isLogin ? (
                  <Route component={BasicLayout} />
                ) : (
                  <Redirect to={`/user/login?redirect=${encodeURIComponent(window.location.href)}`} />
                )
              )}
            />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default connect(({ user }) => ({
  isLogin: user.isLogin,
  appLoading: user.appLoading,
}), ({ user }) => ({
  isLoginAsync: user.isLoginAsync,
  getUsers: user.getUsers,
}))(Root);
