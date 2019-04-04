import React, { PureComponent } from 'react';
import {
  Spin, Menu, Icon, Avatar,
} from 'antd';
// import moment from 'moment';
// import groupBy from 'lodash/groupBy';
import HeaderSearch from '../HeaderSearch';

import HeaderDropdown from '../HeaderDropdown';
import styles from './index.module.less';

export default class GlobalHeaderRight extends PureComponent {
  render() {
    const {
      onMenuClick,
      theme,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder="站内搜索"
          dataSource={[
            '搜索提示1',
            '搜索提示2',
            '搜索提示3',
          ]}
          onSearch={(value) => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={(value) => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <HeaderDropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              alt="avatar"
            />
            <span className={styles.name}>admin</span>
          </span>
        </HeaderDropdown>
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </div>
    );
  }
}
