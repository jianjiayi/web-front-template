/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-const-assign */
import React, { Component, Fragment } from 'react';
import {
  Upload,
  // Button,
  Form,
  Icon,
  Modal,
  message,
} from 'antd';
import { isArray } from 'lodash';

import { uploadFilesPath } from '@/config';

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange, defaultValue, customprops, rules,
}) => {
  const options = {
    rules: customprops ? customprops.rules : rules,
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

class CusUpload extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    // fileList: [
    //   {
    //     uid: '-1',
    //     name: 'xxx.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    // ],
  };

  static defaultProps = {
    rules: null,
    tailFormItemLayout: {},
  }
  // constructor(props) {
  //   super(props);
  //   // const { value } = props;
  //   // this.state = {
  //   //   fileList: value,
  //   // };
  // }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleBeforeUpload = (file) => {
    const { fileSize = 1, fileType } = this.props;
    // 限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (fileType === 'image' && !(isJPG || isJPEG || isGIF || isPNG)) {
      message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < fileSize;
    if (!isLt2M) {
      message.error('文件大小最大不能超过10MB!');
      return false;
    }
    // eslint-disable-next-line consistent-return
    return isLt2M;
  };

  handleOnChange = () => {
    // this.state = {
    //   fileList,
    // };
    // return fileList.map(file => ({
    //   status: file.status,
    //   uid: file.uid,
    //   url: file.response?file.response.data.url:file.url,
    // }));
  };

  // uploadHandler = ({ fileList, file }) => {
  //   if (file.status === 'error' || (file.response && file.response.code !== 0) || !fileList) {
  //     return false;
  //   }
  //   const images = [];
  //   fileList.map((ifile) => {
  //     if (ifile.response) {
  //       images.push({
  //         type: 'IMAGE',
  //         url: ifile.response.data[0].fileUrl,
  //       });
  //     }
  //     return false;
  //   });
  //   this.setState({ fileList });
  //   return false;
  // }

  // handleChange = (info) => {
  //   console.log(info, 'onChange={this.handleChange}')
  //   if (info.file.status === 'uploading') {
  //     // this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     // getBase64(info.file.originFileObj, imageUrl => this.setState({
  //     //     imageUrl,
  //     //     loading: false,
  //     //   }),);
  //   }
  // };

  render() {
    const {
      accept,
      children,
      uploadText,
      filelimit = 1,
      label,
      // value,
      // fileList,
      action,
      name,
      isFormItem,
      tailFormItemLayout,
      form: { getFieldDecorator, getFieldValue },
      ...restProps
    } = this.props;
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{uploadText || '上传照片'}</div>
      </div>
    );
    const otherProps = restProps.props || {};
    const UploadProps = {
      action: action || uploadFilesPath,
      accept: 'image/gif, image/jpeg, image/png, image/jpg',
      // multiple: true,
      ...restProps,
      ...otherProps,
    };
    // let filelength = 0;
    // if (fileList) {
    //   UploadProps.fileList = fileList;
    //   filelength = fileList.length;
    // }
    // let filelength = fileList.length;
    const value = getFieldValue(name);
    const fieldOptions = getFormItemOptions(this.props);
    const normalize = (fileInfo) => {
      if (!fileInfo) return null;
      fileInfo = typeof fileInfo === 'string' ? JSON.parse(fileInfo) : fileInfo;
      if (isArray(fileInfo)) {
        return fileInfo.filter(item => item.status);
      }
      if (fileInfo.fileList && fileInfo.fileList.length > 0) {
        fileInfo.fileList = fileInfo.fileList.filter(item => item.status);
        if (fileInfo.fileList.length <= 0 && fileInfo.file && !fileInfo.file.status) {
          return null;
        }
        return fileInfo;
      }
      // const { fileList } = fileInfo;
      return fileInfo;
    };
    // if (value) {
    //   filelength = value.fileList ? value.fileList.length : value.length;
    // }
    // const getValueFromEvent = (e) => {
    //   if (!e || !e.target) {
    //     return e;
    //   }
    //   const { target } = e;
    //   return target.type === 'checkbox' ? target.checked : target.value;
    // };
    fieldOptions.normalize = normalize;
    // fieldOptions.getValueFromEvent = getValueFromEvent;
    const fileList = value && value.fileList ? value.fileList : (isArray(value) ? value : null);
    const Domwap = isFormItem ? FormItem : Fragment;
    const domwapProps = isFormItem ? {
      ...tailFormItemLayout,
      label,
    } : {};
    return (
      <Domwap {...domwapProps}>
        {getFieldDecorator(name, fieldOptions)(
          <Upload
            beforeUpload={this.handleBeforeUpload}
            {...UploadProps}
            fileList={fileList}
            onPreview={this.handlePreview}
          >
            {fileList && fileList.length >= filelimit ? null : uploadButton}
          </Upload>,
        )}
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Domwap>
    );
  }
}

export default CusUpload;
