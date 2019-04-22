import React from 'react';
import {
  Form,
  Input,
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
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
    ...restProps
  } = props;

  const otherProps = restProps.props || {};
  const { getFieldDecorator } = form;

  // get getFieldDecorator props
  const fieldOptions = getFormItemOptions(props);

  return (
    <FormItem label={label}>
      {getFieldDecorator(name, fieldOptions)(
        <TextArea autosize={{ minRows: 6, maxRows: 8 }} {...customprops} {...otherProps} />,
      )}
    </FormItem>
  );
};

export default CInput;
