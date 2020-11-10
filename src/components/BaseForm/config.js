/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import {
  Form,
  // Input, Radio, Checkbox, Select,
  DatePicker,
} from 'antd';
// eslint-disable-next-line import/no-cycle
import { renderRadioGroup, renderCheckBoxGroup, renderSelect } from './extra';
import NumberRange from './numberRange';

const {
  // MonthPicker,
  RangePicker,
  // WeekPicker,
} = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export const FormItem = {
  RADIO: (options, map, props) => <Form.Item {...options}>{renderRadioGroup(map)}</Form.Item>,
  CHECKBOX: (options, map, props) => <Form.Item {...options}>{renderCheckBoxGroup(map)}</Form.Item>,
  SELECT: (options, map, props) => <Form.Item {...options}>{renderSelect(map, props)}</Form.Item>,
  DateTime: (options, map, props) => <Form.Item {...options}><DatePicker format={dateFormat} /></Form.Item>,
  DateTimeStartEnd: (options, map, props) => (
    <Form.Item {...options}><RangePicker showTime format={dateFormat} {...props} /></Form.Item>
  ),
  NumberRange: (options, map, props) => (
    <Form.Item {...options}><NumberRange /></Form.Item>
  ),
};
