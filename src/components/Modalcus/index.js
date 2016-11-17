import React, { Component } from 'react';
import styles from './index.less';
import _ from 'lodash';
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
    const {modalForms} = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let values = Object.assign({}, fieldsValue)
      const dateTypeField = _.filter(modalForms, { type: 'DatePicker' })
      _.map(dateTypeField, (item, index) => {
        const name = item['field']
        values[name] = fieldsValue[name].format('YYYY-MM-DD')
      })
      this.props.onOk(values);
    });
  }
}
Modalcus.defaultProps = {
  record: null
}
export default Form.create()(Modalcus);
