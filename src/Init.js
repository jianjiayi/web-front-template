import React, { Component } from 'react';
/**
 * antd 组件内置语言默认是英文
 * LocaleProvider 传入中文
 */
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import 'nprogress/nprogress.css';

import store from './store';
import Router from './router';

class Init extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={zhCN}>
          <Router />
        </LocaleProvider>
      </Provider>
    );
  }
}
export default Init;
