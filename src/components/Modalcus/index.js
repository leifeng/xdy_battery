import React, { Component } from 'react';
import styles from './index.less';
import _ from 'lodash';
import { Modal, Form, Input, Spin, Alert } from 'antd';
import Forms from '../Forms';

class Modalcus extends Component {
  constructor() {
    super();
    this.onOk = this.onOk.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false) {
      nextProps.form.resetFields();
    }
  }

  render() {
    console.log('Modalcus')
    const {title, visible, onSave, onCancel, modalForms, form, record, modalLoading, alertState, modalType} = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Modal title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onClose}
        >
        <Spin spinning={modalLoading}>
          <Form horizontal>
            {modalForms.map((item, i) => {
              return (
                <Forms {...item} modalType={modalType} form={form} formItemLayout={formItemLayout} key={i} value={record && record[item.field]} />
              )
            })}
          </Form>
          <div style={{ display: alertState ? 'block' : 'none' }}><Alert message="操作失败！" type="error" showIcon /></div>
        </Spin>
      </Modal>
    )
  }
  onOk() {
    const {modalForms, onSave, form, modalType} = this.props;
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
      onSave(values);
      // if (modalType !== 'add') {
      //   form.resetFields();
      // }

    });
  }
  onClose() {
    const {form, onCancel} = this.props;
    // form.resetFields();
    onCancel()
  }
}
Modalcus.defaultProps = {
  record: null,
}
export default Form.create()(Modalcus);
