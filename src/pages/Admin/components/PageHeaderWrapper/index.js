import {
  // PageHeader,
  // Tabs,
  Card,
} from 'antd';
import React from 'react';
// import styles from './index.module.less';

const PageHeaderWrapper = (props) => {
  const {
    title,
    children,
    hideHeader,
    // bordered = false,
    ...cardProps
  } = props;
  return (
    <Card
      title={title}
      // bordered={bordered}
      {...cardProps}
    >
      {children}
    </Card>
  );
};

export default PageHeaderWrapper;
