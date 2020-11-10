/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */

import React, { useState } from 'react';
import { Form, InputNumber } from 'antd';

export default function numberRange({ value = {}, onChange }) {
  console.log(value);
  const [minNumber, setMinNumber] = useState(0);
  const [maxNumber, setMaxNumber] = useState(0);

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        minNumber,
        maxNumber,
        ...value,
        ...changedValue,
      });
    }
  };

  const onNumberChange = (e, type) => {
    console.log(e, type);

    if (type === 'minNumber') {
      setMinNumber(e);
      triggerChange({
        minNumber: e,
      });
    } else {
      setMaxNumber(e);
      triggerChange({
        maxNumber: e,
      });
    }
  };

  return (
    <>
      <Form.Item
        name="minNumber"
        noStyle
        initialValue={value.minNumber}
      >
        <InputNumber
          type="text"
          onChange={(e) => onNumberChange(e, 'minNumber')}
          style={{
            width: 100,
          }}
        />
      </Form.Item>
      <Form.Item
        name="maxNumber"
        noStyle
        initialValue={value.maxNumber}
      >
        <InputNumber
          style={{
            width: 100,
          }}
          onChange={(e) => onNumberChange(e, 'maxNumber')}
        />
      </Form.Item>
    </>
  );
}
