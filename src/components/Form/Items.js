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

const inputType = {
  select: Select,
  input: Input,
  // inputNumber: InputNumber,
  radio: Radio,
  textArea: TextArea,
};

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
