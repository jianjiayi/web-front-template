import React, { Component, Fragment } from 'react';
// import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form, Input, Upload, Select, Button,
} from 'antd';
import { connect } from 'react-redux';
import styles from './BaseView.module.less';
// import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
    Avatar
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
        Change avatar
        </Button>
      </div>
    </Upload>
  </Fragment>
);


const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach((key) => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = (ref) => {
    this.view = ref;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: '请输入邮箱地址',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="昵称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入昵称！',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="个人简介">
              {getFieldDecorator('profile', {
                rules: [
                  {
                    required: true,
                    message: '请输入个人简介',
                  },
                ],
              })(
                <Input.TextArea
                  placeholder="个人简介"
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem label="国家/地区">
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: '请输入国家/地区',
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="China">中国</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem label="详细地址">
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: '请输入详细地址',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="联系电话">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系电话！',
                  },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem>
            <Button type="primary">
              更新基本信息
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default BaseView;
