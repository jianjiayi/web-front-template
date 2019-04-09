import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
import {
  Upload,
  Button,
  Icon,
} from 'antd';

import { uploadFilesPath } from '../../config';

export default class Editor extends Component {
  state = {
    editorState: BraftEditor.createEditorState(null), // 设置编辑器初始内容
    // outputHTML: '<p></p>',
  }

  componentDidMount() {
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    this.setEditorContentAsync();
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }

  handleChange = (editorState) => {
    const { onChange } = this.props;
    this.setState({
      editorState,
    });
    if (onChange && typeof onChange === 'function') {
      onChange(editorState);
    }
  }

  setEditorContentAsync = () => {
    if (this.isLivinig) {
      // this.setState({
      //   editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>'),
      // });
    }
  }

  uploadHandler = (param) => {
    const { editorState } = this.state;
    const { fileList, file } = param;
    if (file.status === 'error' || (file.response && file.response.code !== 0) || !fileList) {
      return false;
    }
    const images = [];

    fileList.map((ifile) => {
      if (ifile.response) {
        images.push({
          type: 'IMAGE',
          url: ifile.response.data[0].fileUrl,
        });
      }
      return false;
    });
    this.setState({
      editorState: ContentUtils.insertMedias(editorState, images),
    });
    return false;
  }

  render() {
    const { placeholder = '请输入正文内容。' } = this.props;
    const cusControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            action={uploadFilesPath}
            accept="image/*"
            multiple
            onChange={this.uploadHandler}
            showUploadList={false}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <Button type="button" className="control-item button upload-button" data-title="插入图片">
              <Icon type="picture" theme="filled" />
            </Button>
          </Upload>
        ),
      },
    ];
    const { editorState } = this.state;
    return (
      <BraftEditor
        value={editorState}
        placeholder={placeholder}
        extendControls={cusControls}
        onChange={this.handleChange}
      />
    );
  }
}
