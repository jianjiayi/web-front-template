/* eslint-disable react/no-multi-comp */

import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  // Card,
  // Form,
  // Input,
  // Select,
  // Button,
  // DatePicker,
  // Divider,
} from 'antd';
import { isArray } from 'lodash';

import Input from './Input';
import Select from './Select';
import Radio from './Radio';
import TextArea from './TextArea';
import DatePicker from './DatePicker';

const inputType = {
  select: Select,
  input: Input,
  // inputNumber: InputNumber,
  radio: Radio,
  textArea: TextArea,
  datePicker: DatePicker,
};

/**
 *
 *
 * @class FormItems
 * @extends {PureComponent}
 * eq:
 * const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 9,
        },
      },
    };
    const forms = [
      {
        name: 'bum',
        label: '所属部门',
        type: 'input',
        props: {
          size: 'large',
          placeholder: '请填写所属部门',
        },
        rules: [
          {
            required: true,
            message: '请填写所属部门？',
          },
        ],
      },
      {
        name: 'name',
        label: '姓名',
        type: 'input',
        props: {
          size: 'large',
          placeholder: '请填写姓名',
        },
        rules: [
          {
            required: true,
            message: '请填写姓名？',
          },
        ],
      },
      {
        name: 'username',
        label: '登录名',
        type: 'input',
        props: {
          size: 'large',
          placeholder: '请填写登录名',
        },
        rules: [
          {
            required: true,
            message: '请填写登录名？',
          },
        ],
      },
      {
        name: 'password',
        label: '密码',
        type: 'input',
        props: {
          size: 'large',
          type: 'password',
          placeholder: '8位以上，大小写数字字母组合',
        },
        rules: [
          {
            required: true,
            message: '请填写密码！',
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/,
            message: '必须8位以上，大小写数字字母组合',
          },
        ],
      },
      {
        name: 'role',
        label: '角色',
        type: 'radio',
        defaultValue: 1,
        radios: [
          {
            value: 1,
            text: '管理员',
          },
        ],
        props: {
          size: 'large',
        },
        rules: [
          {
            required: true,
            message: '请选择角色！',
          },
        ],
      },
      {
        name: 'remarks',
        label: '备注',
        type: 'textArea',
        props: {
          placeholder: '备注',
          size: 'large',
        },
      },
    ];
    <Form onSubmit={this.handleSubmit} {...formItemLayout} style={{ marginTop: 8 }}>
      <FormItems
        form={form}
        items={forms}
        rowProps={{
          gutter: { md: 8, lg: 16, xl: 24 },
        }}
        colProps={{
          md: 16,
          sm: 24,
        }}
      />
      <Row gutter={{ md: 8, lg: 16, xl: 24 }}>
        <Col md={16} sm={24}>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                提交
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
 */
class FormItems extends PureComponent {
  componentDidMount() {
    // localStorage
  }

  renderRow = (item, i) => {
    const {
      rowProps,
    } = this.props;
    if (isArray(item)) {
      return (
        <Row {...rowProps} key={i}>
          {item.map(input => (this.renderInput(input)))}
        </Row>
      );
    }
    return (
      <Row {...rowProps} key={item.name}>
        {this.renderInput(item)}
      </Row>
    );
  }

  renderInput = (inputProps) => {
    const {
      form,
      colProps,
      customprops,
    } = this.props;
    const {
      name, label, type, ...restProps
    } = inputProps;
    const TnputItem = inputType[type];
    return (
      <Col {...colProps} key={name}>
        <TnputItem
          label={label}
          name={name}
          form={form}
          customprops={customprops || {}}
          {...restProps}
        />
      </Col>
    );
  }

  render() {
    const {
      items,
    } = this.props;

    return (
      <>
        {items.map((item, i) => this.renderRow(item, i))}
      </>
    );
  }
}
export default FormItems;
