/* eslint-disable spaced-comment */
/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */

import React from 'react';
import {
  Form, Input, Radio, Checkbox, Select,
} from 'antd';
import { isArray, isFunction, isPlainObject } from 'lodash';
// eslint-disable-next-line import/no-cycle
import { FormItem } from './config';

/**
 * 对象转为entry数组
 *
 * @param object   原对象
 * @param callback 转换方式
 * @returns {any}
 */
function entries(object, callback = (item) => item) {
  return isPlainObject(object)
    ? Object.entries(object).map(([key, value]) => callback({ key, value }))
    : null;
}

/**
 * 补充表单字段配置
 *
 * @param items      字段定义：[{label: '名称', name: 'name', required: true}]
 * @param formValues 字段默认值: {name: 'default'}
 * @returns {*}
 */
export function fillFormItems(items, formValues = {}) {
  // console.log(items)
  return items.map((item) => {
    const {
      label, name, required, initialValue = formValues[name],
    } = item;
    return {
      options: {
        rules: required ? [{ required: true, message: `请输入${label}` }] : null,
        initialValue,
      },
      ...item,
    };
  });
}

/**
 * 绘制Form.Item
 *
 * @export
 * @param {*} item
 * @param {*} formLayout
 * @return {*}
 */
export function renderFormItem(item, formLayout) {
  const {
    label,
    name,
    type = '',
    map = [],
    options,
    initialValue,
    layout = formLayout,
    itemRender,
    placeholder,
    onChange,
    ...props
  } = item;

  if (!name) return;

  const itemProps = {
    key: name,
    name: name,
    label: label,
    ...layout,
    ...options,
  };

  //item form.item参数，map  数据，prop 事件
  if (type && !isFunction(itemRender)) return FormItem[type](itemProps, map, props);

  const child = itemRender || <Input placeholder={placeholder || '请输入'} {...props} />;
  // console.log(itemProps, child);
  return <Form.Item {...itemProps}>{child}</Form.Item>;
}

/**
 * 绘制组合表单项
 *
 * @param iterable 格式：[{ key: 'key', value: 'value' }] 或者 {key1: value1, key2: value2}
 * @param Parent   父组件类型
 * @param Item     子组件类型
 * @param props    传递给父组件的属性
 * @returns {*}
 */
export function renderGroupComponent(iterable, Parent, Item, props) {
  if (iterable) {
    const forEach = ({ key, value }) => (
      <Item key={key} value={key}>
        {value}
      </Item>
    );
    const child = isArray(iterable) ? iterable.map(forEach) : entries(iterable, forEach);
    return <Parent {...props}>{child}</Parent>;
  }
  return null;
}

/**
 * 绘制单选按钮
 *
 * @param iterable 格式：[{ key: 'key', value: 'value' }] 或者 {key1: value1, key2: value2}
 * @param Item     子组件类型
 * @param props    传递给父组件的属性
 * @returns {*}
 */
export function renderRadioGroup(iterable, Item = Radio, props) {
  return renderGroupComponent(iterable, Radio.Group, Item, props);
}

/**
 * 绘制复选按钮
 *
 * @param iterable 格式：[{ key: 'key', value: 'value' }] 或者 {key1: value1, key2: value2}
 * @param Item     子组件类型
 * @param props    传递给父组件的属性
 * @returns {*}
 */
export function renderCheckBoxGroup(iterable, Item = Checkbox, props) {
  return renderGroupComponent(iterable, Checkbox.Group, Item, props);
}

/**
 * 绘制下拉选择框
 *
 * @param iterable 格式：[{ key: 'key', value: 'value' }] 或者 {key1: value1, key2: value2}
 * @param props    传递给父组件的属性
 * @returns {*}
 */
export function renderSelect(iterable, props) {
  const newProps = {
    placeholder: '请选择',
    style: { width: '100%' },
    ...props,
  };
  return renderGroupComponent(iterable, Select, Select.Option, newProps);
}
