import { PlusOutlined } from '@ant-design/icons';
import {
  Button, Divider, message, Input, Drawer,
} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
  // queryRule,
  updateRule, addRule, removeRule,
} from './service';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const datas = [{
  key: 99, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 99', owner: '曲丽丽', desc: '这是一段描述', callNo: 518, status: 0, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 44,
}, {
  key: 98, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 98', owner: '曲丽丽', desc: '这是一段描述', callNo: 983, status: 2, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 93,
}, {
  key: 97, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 97', owner: '曲丽丽', desc: '这是一段描述', callNo: 143, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 40,
}, {
  key: 96, disabled: true, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 96', owner: '曲丽丽', desc: '这是一段描述', callNo: 936, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 94,
}, {
  key: 95, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 95', owner: '曲丽丽', desc: '这是一段描述', callNo: 481, status: 0, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 20,
}, {
  key: 94, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 94', owner: '曲丽丽', desc: '这是一段描述', callNo: 686, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 41,
}, {
  key: 93, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 93', owner: '曲丽丽', desc: '这是一段描述', callNo: 40, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 15,
}, {
  key: 92, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 92', owner: '曲丽丽', desc: '这是一段描述', callNo: 520, status: 2, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 61,
}, {
  key: 91, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 91', owner: '曲丽丽', desc: '这是一段描述', callNo: 371, status: 0, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 69,
}, {
  key: 90, disabled: true, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 90', owner: '曲丽丽', desc: '这是一段描述', callNo: 69, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 40,
}, {
  key: 89, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 89', owner: '曲丽丽', desc: '这是一段描述', callNo: 195, status: 2, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 22,
}, {
  key: 88, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 88', owner: '曲丽丽', desc: '这是一段描述', callNo: 951, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 95,
}, {
  key: 87, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 87', owner: '曲丽丽', desc: '这是一段描述', callNo: 637, status: 0, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 16,
}, {
  key: 86, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 86', owner: '曲丽丽', desc: '这是一段描述', callNo: 307, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 42,
}, {
  key: 85, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 85', owner: '曲丽丽', desc: '这是一段描述', callNo: 225, status: 3, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 61,
}, {
  key: 84, disabled: true, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 84', owner: '曲丽丽', desc: '这是一段描述', callNo: 159, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 84,
}, {
  key: 83, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 83', owner: '曲丽丽', desc: '这是一段描述', callNo: 960, status: 3, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 49,
}, {
  key: 82, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 82', owner: '曲丽丽', desc: '这是一段描述', callNo: 913, status: 3, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 8,
}, {
  key: 81, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png', name: 'TradeCode 81', owner: '曲丽丽', desc: '这是一段描述', callNo: 707, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 87,
}, {
  key: 80, disabled: false, href: 'https://ant.design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', name: 'TradeCode 80', owner: '曲丽丽', desc: '这是一段描述', callNo: 215, status: 1, updatedAt: '2020-11-09T02:59:37.720Z', createdAt: '2020-11-09T02:59:37.720Z', progress: 84,
}];
const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="new" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        dataSource={datas}
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
