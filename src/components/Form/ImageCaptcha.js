import React, { Component } from 'react';
import {
  Form, Input, Row, Col,
} from 'antd';
import omit from 'omit.js';

// import styles from './index.module.less';

const FormItem = Form.Item;

export default class ImageCaptcha extends Component {
  constructor(props) {
    super(props);
    const imagecaptchapath = props.imagecaptchapath || '/captcha/captcha.jpg';
    this.state = {
      ImageCaptchaPath: `${imagecaptchapath}?t=${new Date().getTime()}`,
    };
  }

  getFormItemOptions = ({
    onChange, defaultValue, customprops = {}, rules,
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

  onChangeImageCaptcha = () => {
    const { imagecaptchapath = '/captcha/captcha.jpg' } = this.props;
    this.setState({
      ImageCaptchaPath: `${imagecaptchapath}?t=${new Date().getTime()}`,
    });
  }

  render() {
    const { ImageCaptchaPath } = this.state;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      label,
      name,
      updateActive,
      type,
      form: { getFieldDecorator },
      className,
      leftCol,
      imgStyle,
      needChange,
      ...restProps
    } = this.props;

    const otherProps = restProps || {};
    const options = this.getFormItemOptions(this.props);
    const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
    const codeImg = `${ImageCaptchaPath}cTime=${needChange || 0}`;
    return (
      <FormItem label={label}>
        <Row gutter={8}>
          <Col span={leftCol || 8}>
            {getFieldDecorator(name, options)(
              <Input {...customprops} {...inputProps} className={className} />,
            )}
          </Col>
          <Col span={8}>
            {/* <Button
              disabled={count}
              className={styles.getCaptcha}
              size="large"
              onClick={this.onChangeImageCaptcha}
            > */}
            <img alt="图片验证码" onClick={this.onChangeImageCaptcha} src={codeImg} style={imgStyle} />
            {/* </Button> */}
          </Col>
        </Row>
      </FormItem>
    );
  }
}
