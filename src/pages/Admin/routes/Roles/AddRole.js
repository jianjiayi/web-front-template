/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import React, {
  useState,
} from 'react';
// import PropTypes from 'prop-types';
import {
  Modal,
  // Space,
  Button,
  Form,
  Input,
  TreeSelect,
  message,
} from 'antd';
import useRequest from '../../utils/useRequest';
import {
  getMenus,
  addRole,
  getRoleDetail,
  updateRole,
} from '../../services/api';
// import styles from './index.module.less';

const { SHOW_PARENT } = TreeSelect;
const AddRoleModal = ({
  visible,
  onOk = () => {},
  onCancel = () => {},
  roleId,
  // loading,
  // ...props
}) => {
  const [form] = Form.useForm();
  const { data: { data, success } } = useRequest(getMenus());
  const [addParams, setAddParams] = useState(false);
  const handleOk = (type) => {
    form.resetFields();
    onOk(type);
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  // eslint-disable-next-line no-unused-vars
  const { data: { data: Detail } } = useRequest(getRoleDetail(roleId), {
    refreshDeps: [roleId],
    ready: !!roleId,
    onSuccess: (res) => {
      if (res.success) {
        const { name, menuIds } = res.data;
        form.setFieldsValue({
          name,
          menuIds,
        });
      }
    },
  });
  const { run } = useRequest(roleId ? updateRole(roleId, addParams) : addRole(addParams), {
    initialData: [],
    manual: true,
    onSuccess: (result) => {
      if (result.success) {
        message.success(roleId ? '修改成功' : '新建成功');
        form.resetFields();
        handleOk(!roleId);
        // setState('');
        // message.success(`The username was changed to "${params[0]}" !`);
      }
    },
  });

  // const getDescription = (curId, arr) => arr.find(({
  //   name, id, children,
  // }) => {
  //   return id === curId ? name : getDescription(curId, children)
  // });
  const getDescription = (curId, datas) => {
    const descs = [];
    const findNames = (arr) => {
      arr.some(({
        name, id, children,
      }) => {
        if (id === curId) {
          descs.push(name);
          return true;
        }
        findNames(children);
      });
    };
    findNames(datas);
    return descs;
  };
  const onFinish = ({ name, menuIds }) => {
    setAddParams({
      name,
      status: 1,
      menuIds,
      description: menuIds.map((menuId) => getDescription(menuId, data)).join(','),
    });
    run();
  };
  const handleSubmit = () => {
    form.submit();
  };
  const onReset = () => {
    form.resetFields();
  };

  let treeData = [];
  const mapTree = (tree) => tree.map(({
    name, id, children, ...item
  }) => ({
    ...item,
    title: name,
    value: id,
    children: mapTree(children),
  }));
  if (success) {
    treeData = mapTree(data);
  }

  const tProps = {
    treeData,
    treeCheckable: true,
    // labelInValue: !roleId,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择模块',
    treeDefaultExpandAll: true,
    multiple: true,
    style: {
      width: '100%',
    },
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <Modal
      visible={visible}
      title="角色设置功能（新建/编辑通用）"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          确定
        </Button>,
        <Button key="back" onClick={onReset}>
          清空
        </Button>,
      ]}
    >
      <Form form={form} name="add_role" onFinish={onFinish} size="large" {...layout}>
        <Form.Item name="name" label="角色名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="menuIds" label="模块名称" rules={[{ required: true }]}>
          <TreeSelect {...tProps} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoleModal;
