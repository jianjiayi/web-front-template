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
import { SearchOutlined } from '@ant-design/icons';

import useRequest from '../../utils/useRequest';
import {
  getAdmins,
  getRoles,
  // switchRoleStatus,
  setAdminRoles,
} from '../../services/api';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import List from './List';

const Users = () => {
  const defaultRolsParams = {
    page: 1,
    length: 10,
  };
  // const [roleId, setRoleId] = useState(); // 用于详情
  const [searchParams, setSearhParams] = useState(defaultRolsParams);
  const { data: { data: dataSource, total }, run } = useRequest(getAdmins(searchParams), {
    initialData: [],
    refreshDeps: [searchParams],
    // ready: !!searchParams,
  });
  const { data: { data: Roles } } = useRequest(getRoles({
    length: 100,
  }), {
    initialData: [],
    // ready: !!searchParams,
  });
  const [form] = Form.useForm();
  const onFinish = (values) => {
    setSearhParams({
      ...searchParams,
      ...values,
    });
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

  // 管理员角色授权
  const updataAdminRoles = (id, roleIds) => {
    setAdminRoles(id, {
      roleIds,
    })().then((res) => {
      if (res.success) {
        message.success('修改角色权限成功');
        run();
      }
    });
  };

  return (
    <PageHeaderWrapper
      title="用户管理"
    >
      <Card title={null} bordered={false} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          <Col>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} size="large">
              <Form.Item
                name="search"
                // rules={[{ required: true, message: '请输入角色名！' }]}
              >
                <Input prefix={<SearchOutlined />} placeholder="用户名" style={{ width: 300 }} allowClear />
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
        </Row>
      </Card>
      <List
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
        updataAdminRoles={updataAdminRoles}
        roles={Roles}
        rowKey="adminId"
      />
    </PageHeaderWrapper>
  );
};

export default Users;
