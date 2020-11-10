/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
import React, {
// useState
} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  MinusCircleOutlined,
  // PlusOutlined,
} from '@ant-design/icons';
import {
  Form, Input, Space, Button,
  // Radio, Checkbox,
  Select,
  // DatePicker,
} from 'antd';
import BaseForm from '@/components/BaseForm';
// import {
//   // contentType, queueType,
//   // keepDays, queueStatus,
// } from '@utils/constants';

const { Option } = Select;

export default () => {
  // const [pform, setFrom] = useState({
  //   getFieldsValue: () => {},
  // });
  // const [a, setAa] = useState(1);
  // const pRef = (form, ref) => {
  //   console.log('222222222222------', form.getFieldsValue());
  //   setFrom(form);
  // };
  // const handelChange = () => {
  //   setAa({
  //     a: a + 1,
  //   });
  // };
  const searchFormProps = {
    className: 'form-contaner',
    layout: 'horizontal',
    submitText: '保存',
    okPerms: 'setting:select',
    dataSource: [
      // {
      //   label: '业务线',
      //   type: 'SELECT',
      //   name:'bid',
      //   required: true,
      //   initialValue: '',
      //   map: {'': '全部', ...contentType}
      // },
      // {
      //   label: '内容类型',
      //   type: 'SELECT',
      //   name:'type',
      //   required: true,
      //   initialValue: '',
      //   map: {'': '全部', ...contentType}
      // },
      // {
      //   label: '队列机制',
      //   type: 'SELECT',
      //   required: true,
      //   name:'queueType33',
      //   initialValue: '',
      //   map: queueType
      // },
      // {
      //   label: '保存时长',
      //   type: 'SELECT',
      //   name: 'Days',
      //   required: true,
      //   initialValue: '2',
      //   map: keepDays,
      // },
      // {
      //   label: '状态',
      //   type: 'SELECT',
      //   name: 'status',
      //   required: true,
      //   initialValue: '2',
      //   map: queueStatus,
      // },
      {
        label: '更新时间',
        name: 'updateTime',
        type: 'DateTimeStartEnd',
      },
      {
        label: '更新人',
        name: 'updateBy',
        initialValue: '2',
      },
      {
        label: 'NumberRange',
        type: 'NumberRange',
        name: 'number',
      },
      { label: '队列名称', name: 'name' },
      {
        label: '队列机制',
        type: 'RADIO',
        name: 'queueType',
        required: true,
        // initialValue: '2',
        map: { 1: '先审后发', 2: '先发后审', 3: '免审' },
      },
      {
        label: '保存时长',
        type: 'CHECKBOX',
        name: 'keepDays',
        required: true,
        // initialValue: '1',
        map: {
          1: '1天', 3: '3天', 7: '7天', 15: '15天', 30: '30天', 60: '60天', 90: '90天',
        },
      },
      {
        label: '规则配置',
        name: 'params5',
        itemRender: <Input placeholder="Please input your nickname" />,
      },
      {
        label: 'Form.List',
        name: 'FormList',
        itemRender: (
          <>
            <Form.Item
              name="street1111"
            >
              <Input.Group compact>
                <Form.Item
                  noStyle
                  name="address"
                  rules={[{ required: true, message: 'Street is required' }]}
                >
                  <Input style={{ width: '50%' }} placeholder="Input street" />
                </Form.Item>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) => {
                    console.log('prevValues', prevValues);
                    return prevValues.address !== curValues.address;
                  }}
                >
                  {({ getFieldValue }) => {
                    console.log(getFieldValue('address'));
                    return getFieldValue('address') === '11' ? (
                      <Form.Item
                        noStyle
                        name="street"
                      >
                        <Select placeholder="Select province">
                          <Option value="Zhejiang">Zhejiang</Option>
                          <Option value="Jiangsu">Jiangsu</Option>
                        </Select>
                      </Form.Item>
                    ) : null;
                  }}
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.List name="FormList">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        label="33331111"
                        {...field}
                        name={[field.name, 'first']}
                        fieldKey={[field.fieldKey, 'first']}
                        rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'last']}
                        fieldKey={[field.fieldKey, 'last']}
                        rules={[{ required: true, message: 'Missing last name' }]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <>
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                </>
              )}
            </Form.List>
          </>
        ),
      },
    ],
    formValues: {
      queueType: '3',
      keepDays: '30',
      number: { minNumber: 33, maxNumber: 76 },
      FormList: [
        { first: '33', last: '333' },
        { first: '44222', last: '55' },
        { first: '44', last: '55' },
      ],
    },
    onReset: () => {},
    onSubmit: (formValues) => {
      console.log('formValues', formValues);
    },
  };
  return (
    <PageContainer>
      <Form.Provider>
        <BaseForm {...searchFormProps}></BaseForm>
      </Form.Provider>
    </PageContainer>
  );
};
