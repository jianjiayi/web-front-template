/* eslint-disable import/prefer-default-export */
import React from 'react';
// import PropTypes from 'prop-types';
import {
  Table,
  // Tag,
  // Space,
  Button,
} from 'antd';
import styles from './index.module.less';

const List = ({
  dataSource,
  onChange = () => {},
  updataRole = () => () => {},
  updataStatus = () => () => {},
  ...props
}) => {
  const handleTableChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    onChange(pagination, filters, sorter, extra);
  };
  const columns = [
    {
      title: '角色名',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      // align: 'center',
    },
    {
      title: '模块权限',
      dataIndex: 'description',
      key: 'description',
      // align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      align: 'center',
      render: (text, record) => (
        <>
          <Button type="link" onClick={updataRole(record)}>配置</Button>
          <Button type="link" onClick={updataStatus(record)}>{record.status ? '停用' : '启用'}</Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.contentWrap}>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        onChange={handleTableChange}
        {...props}
      />
    </div>
  );
};

export default List;
