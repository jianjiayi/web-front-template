/* eslint-disable import/prefer-default-export */
import React, {
  // useContext, useState, useEffect, useRef,
  createContext,
} from 'react';
// import PropTypes from 'prop-types';
import {
  Table,
  // Tag,
  // Space,
  Popconfirm,
  Button,
  Form,
  // Input,
  Select,
} from 'antd';
import styles from './index.module.less';

const EditableContext = createContext();
const { Option } = Select;

// const EditableRow = ({ index, ...props }) =>
//   // const [form] = Form.useForm();
//   (
//     <>
//       {/* <Form form={form} component={false}> */}
//       {/* <EditableContext.Provider value={form}> */}
//       <tr {...props} />
//       {/* </EditableContext.Provider> */}
//       {/* </Form> */}
//     </>
//   );
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  rowIndex,
  roles = [],
  ...restProps
}) => {
  // const [editing, setEditing] = useState(true);
  // const inputRef = useRef();
  // const form = useContext(EditableContext);

  // useEffect(() => {
  //   if (editing) {
  //     inputRef.current.focus();
  //   }
  // }, [editing]);
  // console.log(form, rowIndex, restProps, 'rowIndex');
  // const toggleEdit = () => {
  //   setEditing(!editing);
  //   form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  // };
  let childNode = children;
  // const save = async (e) => {
  //   try {
  //     const values = await form.validateFields();

  //     toggleEdit();
  //     handleSave({ ...record, ...values });
  //   } catch (errInfo) {
  //     console.log('Save failed:', errInfo);
  //   }
  // };
  // if (editable) {
  childNode = editable ? (
    <Form.Item
      style={{ margin: 0 }}
      name={[[record.adminId]]}
      initialValue={record.roleIds ? record.roleIds.split(',') : []}
    >
      <Select style={{ width: 200 }} mode="multiple" placeholder="请选择角色">
        {roles && roles.length ? roles.map((role) => (
          <Option key={role.id}>{role.name}</Option>
        )) : null}
      </Select>
    </Form.Item>
  ) : (
    <>
      {children}
    </>
  );
  // }
  // childNode = (
  //   <Form.Item
  //     style={{ margin: 0 }}
  //     name={['formSetData', rowIndex, dataIndex]}
  //   >
  //     <Input />
  //   </Form.Item>
  // );

  return <td {...restProps}>{childNode}</td>;
};
const List = ({
  dataSource,
  onChange = () => {},
  updataAdminRoles = () => {},
  // updataStatus = () => () => {},
  rowKey,
  roles,
  ...props
}) => {
  const handleTableChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    onChange(pagination, filters, sorter, extra);
  };
  //   adminId: 1
  // adminNickname: "管理员"
  // adminUsername: "admin"
  // email: "admin@admin.com"
  // lastUpdateTime: "2020-08-10 10:06:05"
  // roleIds: "1,3,7,8"
  // roleName: "超级管理员,超级管理员2更新,新角色-1,新角色1"
  // telephone: "13800000000"
  // const form = useContext(EditableContext);
  const [form] = Form.useForm();
  const handleSave = (adminId) => {
    // async const values = await form.validateFields();
    const values = form.getFieldsValue();
    // console.log('handleSave', values, values[adminId]);
    updataAdminRoles(adminId, values[adminId]);
  };
  const columns = [
    {
      title: '用户名',
      dataIndex: 'adminUsername',
      key: 'adminUsername',
      width: 300,
      // align: 'center',
    },
    {
      title: '角色',
      dataIndex: 'roleIds',
      key: 'roleIds',
      onCell: (record, rowIndex) => ({
        record,
        editable: true,
        dataIndex: 'roleIds',
        // title: col.title,
        handleSave,
        rowIndex,
        roles,
      }),
      // align: 'center',
    },
    {
      title: '功能权限',
      dataIndex: 'roleName',
      key: 'roleName',
      // align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      align: 'center',
      render: (text, record) => (
        <Popconfirm title="确认修改角色权限？" onConfirm={() => handleSave(record.adminId)}>
          <Button type="link">确认修改角色</Button>
        </Popconfirm>
      ),
    },
  ];

  const components = {
    body: {
      // row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div className={styles.contentWrap}>
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <Table
            bordered
            components={components}
            columns={columns}
            dataSource={dataSource}
            rowKey={rowKey}
            onChange={handleTableChange}
            {...props}
          />
        </EditableContext.Provider>
      </Form>
    </div>
  );
};

export default List;
