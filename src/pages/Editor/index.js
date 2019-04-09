import React, { Component } from 'react';
import {
  Form,
  // Input,
  // DatePicker,
  // Select,
  Button,
  Card,
  // InputNumber,
  // Radio,
  // Icon,
  // Tooltip,
} from 'antd';

import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import BraftEditor from '../../components/BraftEditor';

// const FormItem = Form.Item;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

@Form.create()
class Editor extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      console.log(err, values.edit.toHTML(), 'err, values');
    });
  }

  onChange = (edit) => {
    console.log(edit.toHTML(), 'edit');
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <PageHeaderWrapper
        title="富文本编辑器"
        content="BraftEditor，https://github.com/margox/braft-editor"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {
              getFieldDecorator('edit', {
                rules: [
                  {
                    required: true,
                    message: '请输入正文！',
                  },
                ],
              })(<BraftEditor onChange={this.onChange} />)
            }
            <Button htmlType="submit">提交</Button>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Editor;
