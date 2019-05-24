import React, { Component } from 'react';
import {
  Upload,
  // Button,
  Icon,
  Modal,
  message,
} from 'antd';

import { uploadFilesPath } from '@/config';

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
    const { fileSize = 10 } = this.props;
    // 限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      Modal.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片~',
      });
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < fileSize;
    if (!isLt2M) {
      message.error('文件大小最大不能超过10MB!');
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
      value,
      fileList,
      ...restProps
    } = this.props;
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{uploadText || '上传照片'}</div>
      </div>
    );
    const UploadProps = {
      action: uploadFilesPath,
      accept: 'image/gif, image/jpeg, image/png, image/jpg',
      // multiple: true,
      ...restProps,
    };
    if (fileList) {
      UploadProps.fileList = fileList;
    }
    let filelength;
    if (value) {
      filelength = value.fileList ? value.fileList.length : value.length;
    }
    return (
      <>
        <Upload
          // action={uploadFilesPath}
          // accept="image/*"
          // multiple
          // {...restProps}
          // fileList={fileList}
          beforeUpload={this.handleBeforeUpload}
          {...UploadProps}
          onPreview={this.handlePreview}
        >
          {value && filelength >= filelimit ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default CusUpload;
