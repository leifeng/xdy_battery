import React from 'react';
import styles from './index.less'
import { Modal, Form, Input, Button, Icon, Spin } from 'antd';
const FormItem = Form.Item;


function EditPwd({form, onSavePwd, onClosePwd, editPwdVisible, editPwdLoading}) {
  const {validateFields, getFieldDecorator, getFieldValue} = form;

  function onOk() {
    validateFields((err, values) => {
      if (err) {
        return
      }
      onSavePwd(getFieldValue('password'))
    });
  }

  function checkPassowrd(rule, value, callback) {
    if (value && value !== getFieldValue('password')) {
      callback('密码不一致');
    } else {
      callback();
    }
  }

  return (
    <Spin spinning={editPwdLoading}>
      <Modal title="密码修改"
        visible={editPwdVisible}
        onOk={onOk}
        onCancel={onClosePwd}>
        <Form>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入新密码' }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入新密码" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: '请输入确认密码' },
                { validator: checkPassowrd }
              ],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入确认密码" />
              )}
          </FormItem>
        </Form>
      </Modal>
    </Spin>
  )
}
export default Form.create()(EditPwd);
