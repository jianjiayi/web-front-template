import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
} from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';

import useRequest from '../../utils/useRequest';
import {
  getRoles,
  switchRoleStatus,
} from '../../services/api';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import List from './List';
import AddRole from './AddRole';

const Roles = () => {
  const defaultRolsParams = {
    page: 1,
    length: 10,
  };
  const [roleId, setRoleId] = useState(); // 用于详情
  const [searchParams, setSearhParams] = useState(defaultRolsParams);
  const { data: { data: dataSource, total }, run } = useRequest(getRoles(searchParams), {
    initialData: [],
    refreshDeps: [searchParams],
    // ready: !!searchParams,
  });

  const [form] = Form.useForm();
  const onFinish = (values) => {
    setSearhParams(values);
  };
  const handleTableChange = ({ current, pageSize, total: all }) => {
    setSearhParams({
      ...searchParams,
      page: current,
      length: pageSize,
      total: all,
    });
  };
  const pagination = {
    current: searchParams.page,
    pageSize: searchParams.length,
    total,
    showQuickJumper: true,
  };

  // 添加、修改角色
  const [visibleAddRole, setVisibleAddRole] = useState(false);
  const showAddRole = () => {
    setVisibleAddRole(true);
  };
  const handleOk = (type) => {
    setVisibleAddRole(false);
    if (type) { // 如果是新建，初始化第一页
      setSearhParams(defaultRolsParams);
    }
    setRoleId(0);
    run();
  };
  const handleCancel = () => {
    setRoleId(0);
    setVisibleAddRole(false);
  };

  // 列表操作
  const updataRole = ({ id }) => () => {
    setRoleId(id);
    showAddRole();
  };
  const updataStatus = ({ id, status }) => () => {
    switchRoleStatus(id)().then((res) => {
      if (res.success) {
        message.success(status ? '停用成功' : '启用成功');
        run();
      }
    });
  };

  return (
    <PageHeaderWrapper
      title="角色管理"
    >
      <Card title={null} bordered={false} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          <Col span={12}>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} size="large">
              <Form.Item
                name="search"
                // rules={[{ required: true, message: '请输入角色名！' }]}
              >
                <Input prefix={<SearchOutlined />} placeholder="角色名" style={{ width: 300 }} allowClear />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  搜 索
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={showAddRole}
            >
              <PlusCircleOutlined />
              新建角色
            </Button>
          </Col>
        </Row>
      </Card>
      <List
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
        updataRole={updataRole}
        updataStatus={updataStatus}
      />
      {visibleAddRole && (
        <AddRole
          visible={visibleAddRole}
          onOk={handleOk}
          onCancel={handleCancel}
          roleId={roleId}
        />
      )}
    </PageHeaderWrapper>
  );
};

export default Roles;
