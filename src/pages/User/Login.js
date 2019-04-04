/* eslint-disable compat/compat */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Checkbox, Alert, Icon } from 'antd';

import { dispatch } from '../../store';
import Login from '../../components/Login';
import styles from './Login.module.less';

const {
  Tab, UserName, Password, Mobile, Captcha, Submit,
} = Login;

class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = (type) => {
    this.setState({ type });
  };

  onGetCaptcha = () => new Promise((resolve, reject) => {
    this.loginForm.validateFields(['mobile'], {}, (err, values) => {
      if (err) {
        reject(err);
      } else {
        // const { dispatch } = this.props;
        // dispatch({
        //   type: 'login/getCaptcha',
        //   payload: values.mobile,
        // })
        //   .then(resolve)
        //   .catch(reject);
      }
    });
  });

  handleSubmit = (err, values) => {
    // const { type } = this.state;
    if (!err) {
      console.log(values);
      // login
      dispatch.user.login({
        ...values,
        validateCode: '2134',
        rememberMe: 'no',
      });
    }
  };

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    console.log(this.props);
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={(form) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="用户名密码">
            {login && login.status === 'error'
              && login.type === 'account'
              && !submitting
              && this.renderMessage('account error')}
            <UserName
              name="username"
              placeholder="用户名: admin or user"
              rules={[
                {
                  required: true,
                  message: '用户名必须填写',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码: ant.design"
              rules={[
                {
                  required: true,
                  message: '密码必须填写',
                },
              ]}
              onPressEnter={(e) => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
          <Tab key="mobile" tab="手机号">
            {login && login.status === 'error'
              && login.type === 'mobile'
              && !submitting
              && this.renderMessage(
                '请填写手机号！',
              )}
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '请填写手机号',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '必须是数字',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="验证码"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="获取验证码"
              getCaptchaSecondText="已发送"
              rules={[
                {
                  required: true,
                  message: '请填写验证码！',
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="/forget">
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>
            登录
          </Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              注册
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default withRouter(connect(({ user }) => ({
  isLogin: user.isLogin,
}), ({ user: { login } }) => ({
  login,
}))(LoginPage));
