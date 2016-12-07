import React, { Component } from 'react';
import styles from './index.less';
import _ from 'lodash';
import { Modal, Form, Input } from 'antd';
import Forms from '../Forms';

class Modalcus extends Component {
  constructor() {
    super();
    this.onOk = this.onOk.bind(this);
  }

  render() {
    console.log('Modalcus')
    const {title, visible, onOk, onCancel, modalForms, form, record} = this.props;
    const { getFieldDecorator } = form;

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
        <Form horizontal>
          {modalForms.map((item, i) => {
            return (
              <Forms {...item} form={form} formItemLayout={formItemLayout} key={i} value={record && record[item.field]} />
            )
          })}
        </Form>
      </Modal>
    )
  }
  onOk() {
    const {modalForms} = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let values = Object.assign({}, fieldsValue)
      //moment格式转换
      const dateTypeField = _.filter(modalForms, { type: 'DatePicker' });
      _.map(dateTypeField, (item, index) => {
        const name = item['field'];
        values[name] = fieldsValue[name] ? fieldsValue[name].format(item.setting.format) : '';
      })
      console.log(values)
      this.props.onOk(values);
    });
  }
}
Modalcus.defaultProps = {
  record: null
}
export default Form.create()(Modalcus);
