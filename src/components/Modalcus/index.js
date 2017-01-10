import React, { Component } from 'react';
import styles from './index.less';
import _ from 'lodash';
import AMAP from '../Map'
import { Modal, Form, Input, Spin, Alert, Button, Tabs } from 'antd';
import Forms from '../Forms';
const TabPane = Tabs.TabPane;

class Modalcus extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    }
    this.onOk = this.onOk.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.visible || this.props.visible
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false) {
      this.setState({ loading: false })
      nextProps.form.resetFields();
    }
    if (nextProps.alertState === true) {
      this.setState({ loading: false })
    }
  }

  render() {
    console.log('Modalcus')
    const {title, visible, onSave, onCancel, modalForms, form, record, modalLoading, alertState, modalType, tabs} = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal title={title}
        visible={visible}
        width={600}
        onOk={this.onOk}
        onCancel={this.onClose}
        footer={[
          <Button key="back" type="ghost" size="large" onClick={this.onClose}>取消</Button>,
          <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.onOk}>
            确定
          </Button>
        ]}
        >
        <Spin spinning={modalLoading}>
          <Form horizontal>
            <Tabs defaultActiveKey="base">
              <TabPane tab="基本信息" key="base">
                {modalForms.map((item, index) => {
                  return (
                    <Forms {...item} modalType={modalType} form={form} key={index} value={record && record[item.field]} />
                  )
                })}
              </TabPane>
              {tabs.map((item, index) => {
                switch (item.title) {
                  case '地图信息':
                    return <TabPane tab={item.title} key={index}><AMAP {...item} form={form} /></TabPane>
                  case '电池退役检查项目':
                    return <TabPane tab={item.title} key={index}>
                      {item.otherForms.map((checkItem, index) => {
                        let value = '';
                        if (item.nodeName && record && record[item.nodeName]) {
                          console.log(record[item.nodeName])
                          //  value = record[item.nodeName][index][item.field]
                        }
                        return <Forms {...checkItem} modalType={modalType} form={form} key={index} value={value} />
                      })}
                    </TabPane>
                }
              })}
            </Tabs>
          </Form>
          <div style={{ display: alertState ? 'block' : 'none' }}><Alert message="操作失败！" type="error" showIcon /></div>
        </Spin>
      </Modal>
    )
  }
  onOk() {
    const {modalForms, onSave, form, modalType, tabs} = this.props;
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) {
        return;
      }
      let values = Object.assign({}, fieldsValue);

      //moment格式转换
      const dateTypeField = _.filter(modalForms, { type: 'DatePicker' });
      _.map(dateTypeField, (item, index) => {
        const name = item['field'];
        values[name] = fieldsValue[name] ? fieldsValue[name].format(item.setting.format) : '';
      })





      //编辑是去除unique为true的字段
      if (modalType !== 'add') {
        const uniqueField = _.filter(modalForms, { unique: true });
        _.map(uniqueField, (item, index) => {
          const name = item['field'];
          delete values[name]
        })
      }

      //自定义格式
      const customerField = _.filter(tabs, { customer: true });
      if (customerField.length) {
        const otherForms = customerField[0].otherForms;
        const customerSetting = otherForms[0].customer;
        const keyName = customerSetting.keyName;
        const keyValue = customerSetting.keyValue;
        values[customerSetting.nodeName] = [];
        _.map(otherForms, (item, index) => {
          const name = item['field'];
          const value = values[name];
          let newValue = {};
          newValue[keyName] = name;
          newValue[keyValue] = value;
          delete values[name];
          values[customerSetting.nodeName].push(newValue)
        })
      }

      console.log(values);
      this.setState({ loading: true })
      onSave(values);

    });
  }
  onClose() {
    const {form, onCancel} = this.props;
    onCancel()

  }
}
Modalcus.defaultProps = {
  record: null,
  tabs: []
}
export default Form.create()(Modalcus);
