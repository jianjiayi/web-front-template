import React from 'react';
import {
  Form,
  Radio,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

const CRadio = (props) => {
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
    radios,
    ...restProps
  } = props;
  const otherProps = restProps.props || {};
  const { getFieldDecorator } = form;
  // get getFieldDecorator props
  const fieldOptions = getFormItemOptions(props);
  return (
    <FormItem label={label}>
      {getFieldDecorator(name, fieldOptions)(
        <RadioGroup style={{ width: '100%' }} {...customprops} {...otherProps}>
          {radios.map(({ value, text }) => (
            <Radio key={value} value={value}>{text}</Radio>
          ))}
        </RadioGroup>,
      )}
    </FormItem>
  );
};

export default CRadio;
