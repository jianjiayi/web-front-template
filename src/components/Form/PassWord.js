/* eslint-disable no-param-reassign */
/* eslint-disable no-func-assign */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import omit from 'omit.js';


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value, enumerable: true, configurable: true, writable: true,
    });
  } else { obj[key] = value; } return obj;
}


const Inputi = Input;

const PassWord = new Proxy(Inputi, {
  construct: (Target, args) => {
    const target1 = new Target(...args);
    target1.renderInput = (prefixCls) => {
      function fixControlledValue() {
       
      }
      const _this$props5 = target1.props;


      const {
        className,
        addonBefore,
        addonAfter,
      } = _this$props5;


      const { value } = target1.state; // Fix https://fb.me/react-unknown-prop

      const otherProps = omit(target1.props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'allowClear', // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
        'defaultValue']);
      return target1.renderLabeledIcon(prefixCls, React.createElement('input', Object.assign({}, otherProps, {
        value: fixControlledValue(value),
        onChange: target1.handleChange,
        className: classNames(target1.getInputClassName(prefixCls), _defineProperty({}, className, className && !addonBefore && !addonAfter)),
        onKeyDown: target1.handleKeyDown,
        ref: target1.saveInput,
      })));
    };
    return target1;
  },
});
export default PassWord;
