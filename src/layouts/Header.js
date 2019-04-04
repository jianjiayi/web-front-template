import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Animate from 'rc-animate';

import GlobalHeader from '../components/GlobalHeader';
import TopNavHeader from '../components/TopNavHeader';
import styles from './Header.module.less';

const { Header } = Layout;

class HeaderView extends Component {
  state = {
    visible: true,
  };

  /**
   * 新的生命周期函数getDerivedStateFromProps
   * 在很长一段时间内，componentWillReceiveProps是在没有附加渲染的情况下更新状态的唯一方法。
   * 在版本16.3中，引入了一个全新的生命周期函数——getDerivedStateFromProps
   * 用来替换componentWillReceiveProps，并用更安全的方式处理相同的场景。
   * getDerivedStateFromProps的存在只有一个目的。它使组件能够根据changes in props的结果更新其内部状态。
   * 根据一般规则——谨慎使用派生状态
   * @static
   * @param {*} props
   * @param {*} state
   * @returns
   * @memberof HeaderView
   */
  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    console.log(key, dispatch, 'handleMenuClick');
    // if (key === 'userCenter') {
    //   router.push('/account/center');
    //   return;
    // }
    // if (key === 'triggerError') {
    //   router.push('/exception/trigger');
    //   return;
    // }
    // if (key === 'userinfo') {
    //   router.push('/account/settings/base');
    //   return;
    // }
    // if (key === 'logout') {
    //   dispatch({
    //     type: 'login/logout',
    //   });
    // }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  render() {
    const { isMobile, handleMenuCollapse, setting } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
        {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        ) : (
          <GlobalHeader
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        )}
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

const mapStateToProps = ({ menu, global, setting }) => ({
  breadcrumbNameMap: menu.breadcrumbNameMap,
  layout: setting.layout,
  menuData: menu.menuData,
  collapsed: global.collapsed,
  setting,
});
export default connect(mapStateToProps)(HeaderView);
