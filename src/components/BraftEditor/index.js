import 'braft-polyfill';
import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import Table from 'braft-extensions/dist/table';
import {
  Upload,
  Button,
  Icon,
} from 'antd';

import { uploadFilesPath } from '../../config';

const options = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: false, // 插入表格前是否弹出下拉菜单
  exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
  // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ['editor-id-2']  // 指定该模块对哪些BraftEditor无效
};

BraftEditor.use(Table(options));

const controls = [
  'undo', 'redo', 'separator',
  'font-size', 'line-height', 'letter-spacing', 'separator',
  'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
  'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
  'headings', 'list-ul', 'list-ol', 'blockquote',
  // 'code',
  'separator',
  'link', 'separator', 'hr', 'separator',
  'media', 'separator',
  'clear', 'table',
];

export default class Editor extends Component {
  state = {
    editorState: BraftEditor.createEditorState(null), // 设置编辑器初始内容
    // outputHTML: '<p></p>',
  }

  componentDidMount() {
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    // this.setEditorContentAsync();
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }

  static getDerivedStateFromProps(props) {
    const { value } = props;
    if ('value' in props && typeof value === 'string') {
      return {
        editorState: BraftEditor.createEditorState(value),
      };
    }
    return null;
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

  setEditorContentAsync = (text) => {
    if (this.isLivinig) {
      this.setState({
        editorState: BraftEditor.createEditorState(text),
      });
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

  editorRef = (ref) => {
    const { editorRef } = this.props;
    if (editorRef) {
      editorRef(ref);
    }
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
        ref={this.editorRef}
        value={editorState}
        placeholder={placeholder}
        controls={controls}
        extendControls={cusControls}
        onChange={this.handleChange}
      />
    );
  }
}

export const contentUtils = ContentUtils;
