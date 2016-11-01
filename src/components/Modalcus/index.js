import React, { Component } from 'react';
import styles from './index.less';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
import Forms from '../Forms';

class Modalcus extends Component {
  constructor() {
    super();
    this.onOk = this.onOk.bind(this);
  }
  render() {
    console.log('Modalcus')
    const {title, visible, onOk, onCancel, modalForms, form, record} = this.props;
    const { getFieldDecorator, resetFields } = form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    // const _record = Object.assign({}, record)
    return (
      <Modal title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
        >
        <Form
          horizontal
          >
          {modalForms.map((item, i) => {
            return (
              <FormItem
                {...formItemLayout}
                label={item.label}
                key={i}
                >
                <Forms {...item} value={record && record[item.field]} form={form} />
              </FormItem>)
          })}
        </Form>
      </Modal>
    )
  }
  onSubmit(e) {
    e.preventDefault();
  }
  onOk() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.onOk(values);
      console.log(values);
    });
  }
}
Modalcus.defaultProps = {
  record: null
}
export default Form.create()(Modalcus);
