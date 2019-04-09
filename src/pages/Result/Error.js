import React, { Fragment } from 'react';
// import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Button, Icon, Card } from 'antd';
import Result from '../../components/Result';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 16,
      }}
    >
      The content you submitted has the following error:
    </div>
    <div style={{ marginBottom: 16 }}>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
      Your account has been frozen
      <a href="#nokey" style={{ marginLeft: 16 }}>
        Thaw immediately
        <Icon type="right" />
      </a>
    </div>
    <div>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
      Your account is not yet eligible to apply
      <a href="#nokey" style={{ marginLeft: 16 }}>
        Upgrade immediately
        <Icon type="right" />
      </a>
    </div>
  </Fragment>
);

const actions = (
  <Button type="primary">
    Return to modify
  </Button>
);

export default () => (
  <PageHeaderWrapper>
    <Card bordered={false}>
      <Result
        type="error"
        title="提交失败"
        description="请核对并修改以下信息后，再重新提交。"
        extra={extra}
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderWrapper>
);
