import React, { Component } from 'react';
import {
  Form, Input, Button, Row, Col,
} from 'antd';
import omit from 'omit.js';

import styles from './index.module.less';

const FormItem = Form.Item;

export default class Captcha extends Component {
  static defaultProps = {
    getCaptchaButtonText: '获取验证码',
    getCaptchaSecondText: '秒',
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getFormItemOptions = ({
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

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    const { count } = this.state;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      label,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      InputStyle = {},
      form: { getFieldDecorator },
      ...restProps
    } = this.props;

    const otherProps = restProps || {};
    const options = this.getFormItemOptions(this.props);
    const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
    return (
      <FormItem label={label}>
        <Row>
          <Col span={16}>
            {getFieldDecorator(name, options)(<Input style={{ width: '201px', height: '45px', ...InputStyle }} {...customprops} {...inputProps} placeholder="请输入短信验证码" />)}
          </Col>
          <Col span={8}>
            <Button
              disabled={count}
              className={styles.getCaptcha}
              // type="primary"
              // size="large"
              style={{
                background: 'rgba(255,93,82,1)', color: '#fff', width: '99px', height: '45px', marginLeft: '45px',
              }}
              onClick={this.onGetCaptcha}
            >
              {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
            </Button>
          </Col>
        </Row>
      </FormItem>
    );
  }
}
