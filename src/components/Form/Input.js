import React from 'react';
import {
  Form,
  Input,
} from 'antd';

const FormItem = Form.Item;

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

const CInput = (props) => {
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
    component,
    tailFormItemLayout = {},
    ...restProps
  } = props;

  const otherProps = restProps.props || {};
  const { getFieldDecorator } = form;

  // get getFieldDecorator props
  const fieldOptions = getFormItemOptions(props);
  let InputComponent;
  if (component) {
    InputComponent = component;
  }
  return (
    <FormItem {...tailFormItemLayout} label={label}>
      {getFieldDecorator(name, fieldOptions)(
        component
          ? <InputComponent {...customprops} {...otherProps} />
          : <Input {...customprops} {...otherProps} />,
      )}
    </FormItem>
  );
};

export default CInput;
