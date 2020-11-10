/* eslint-disable import/order */
/* eslint-disable no-console */

import React from 'react';
import { Form, Button } from 'antd';
import { renderFormItem, fillFormItems } from './extra';
import classNames from 'classnames';
import styles from './index.module.less';

const formItemLayout = {
  // labelAlign: 'left',
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

function BaseForm(props) {
  const [selfForm] = Form.useForm();

  const {
    children,
    className,
    // colon = true,
    okPerms,
    submitText = '查询',
    resetShow = false,
    cancelShow = false,
    layout = 'horizontal',
    formLayout = layout === 'inline' ? null : formItemLayout,
    dataSource = [],
    formValues = {},
    onSubmit = () => {},
    onReset = () => {},
    pRef = () => {},
    pFrom,
    renderItem = renderFormItem,
    ...otherFormProps
  } = props;

  const form = pFrom || selfForm;

  const reset = () => {
    form.resetFields();
    onReset();
  };

  const formProps = {
    ...otherFormProps,
    form,
    layout,
    scrollToFirstError: true,
    onFinish: (values) => onSubmit({ ...values }, form),
    className: classNames(className, styles.container),
  };
  const parentRef = (ref) => {
    pRef(form, ref);
  };

  return (
    <Form
      {...formProps}
      ref={parentRef}
    >
      {fillFormItems(dataSource, formValues).map((item) => renderItem(item, formLayout))}
      <Form.Item>
        <div className={styles['button-group']}>
          <Button type="primary" htmlType="submit">
            {submitText}
          </Button>
          {resetShow && <Button onClick={() => reset()}>重置</Button>}
          {cancelShow && <Button onClick={() => reset()}>取消</Button>}
          {children}
        </div>
      </Form.Item>
    </Form>
  );
}

export * from './extra';
export default BaseForm;
