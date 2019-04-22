import React from 'react';
import {
  Form,
  Select,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const getFormItemOptions = ({
  onChange, defaultValue, customprops, rules,
}) => {
  const options = {
    rules: rules || customprops.rules,
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const CSelect = (props) => {
  const {
    onChange,
    customprops,
    defaultValue,
    rules,
    name,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    form,
    label,
    options,
    ...restProps
  } = props;
  const otherProps = restProps.props || {};
  const { getFieldDecorator } = form;
  // get getFieldDecorator props
  const fieldOptions = getFormItemOptions(props);
  console.log(fieldOptions, 'fieldOptions')
  return (
    <FormItem label={label}>
      {getFieldDecorator(name, fieldOptions)(
        <Select style={{ width: '100%' }} {...customprops} {...otherProps}>
          {options.map(({ value, text }) => (
            <Option key={value} value={value}>{text}</Option>
          ))}
        </Select>,
      )}
    </FormItem>
  );
};

export default CSelect;
