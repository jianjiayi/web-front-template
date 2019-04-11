import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import { renderRoutes } from 'react-router-config';
import styles from './setp.module.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'register':
        return 0;
      case 'incoming':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { route } = this.props;
    return (
      <div className={styles.main}>
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
      </div>
    );
  }
}
