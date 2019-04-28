import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';

/**
 * 配合 Prompt 使用
 * 改变confirm样式
 * 缺点：并不能阻止直接关闭浏览器标签
 * @param {*} message
 * @param {*} callback
 * 使用方法：
 * 在需要的页面 render 中加入 Prompt组件
 * <Prompt when={editing} message="您有修改的内容没保存，确认离开？" />
 */
const getUserConfirmation = (message, callback) => {
  const modal = document.createElement('div');
  document.body.appendChild(modal);

  const withCleanup = (answer) => {
    ReactDOM.unmountComponentAtNode(modal);
    document.body.removeChild(modal);
    callback(answer);
  };
  ReactDOM.render(
    <Modal
      title="警告！"
      visible
      okType="danger"
      onOk={() => withCleanup(true)}
      onCancel={() => withCleanup(false)}
    >
      <p>{message}</p>
    </Modal>,
    modal,
  );
};

export default getUserConfirmation;
