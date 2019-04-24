import React from 'react';
import {
  Form,
  DatePicker,
} from 'antd';
import moment from 'moment';

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
    ...restProps
  } = props;

  const otherProps = restProps.props || {};
  const { getFieldDecorator } = form;


  const normalize = value => (value ? moment(value, otherProps.dateFormat || 'YYYY-MM-DD') : null);
  // const getValueFromEvent = value => {
  //   return moment(value).format(otherProps.dateFormat)
  // };
  // get getFieldDecorator props
  const fieldOptions = getFormItemOptions(props);
  fieldOptions.normalize = normalize;
  // fieldOptions.getValueFromEvent = getValueFromEvent;
  return (
    <FormItem label={label}>
      {getFieldDecorator(name, fieldOptions)(
        <DatePicker {...customprops} {...otherProps} />,
      )}
    </FormItem>
  );
};

export default CInput;
