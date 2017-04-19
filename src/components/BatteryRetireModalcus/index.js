import React, { Component } from 'react';
import { Modal, Form, Input, Spin, Alert, Button, Tabs } from 'antd';
import Forms from '../Forms';
const TabPane = Tabs.TabPane;

class BatteryRetireModalcus extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    }

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.visible || this.props.visible
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.visible === false) {
  //     this.setState({ loading: false })
  //   }
  // }

  render() {
    const {title, visible, onOk, onCancel, onClose, info, retireChild, batPakList, form, record,hasFooter} = this.props;
    return (
      <Modal title={title}
        visible={visible}
        width={600}
        onOk={onOk}
        onCancel={onClose}
        footer={hasFooter?[
          <Button key="back" type="ghost" size="large" onClick={onCancel}>不通过</Button>,
          <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={onOk}>通过</Button>
        ]:null}
      >

        <Form layout="horizontal">
          <Tabs defaultActiveKey="base">
            <TabPane tab="退役信息" key="base">
              {info.map((item, index) => {
                return (
                  <Forms {...item} form={form} key={index} value={record && record['info'][item.field]} />
                )
              })}
            </TabPane>
            <TabPane tab="检查项信息" key="base2">
              {retireChild.map((item, index) => {
                return (
                  <Forms {...item} form={form} key={index} />
                )
              })}
            </TabPane>
            <TabPane tab="电池信息" key="base3">
              {batPakList.map((item, index) => {
                return (
                  <Forms {...item} form={form} key={index} value={record &&record['batPakList']&&record['batPakList'][item.field]} />
                )
              })}
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    )
  }
}
BatteryRetireModalcus.defaultProps = {
  record: null,
  hasFooter:true
}
export default Form.create()(BatteryRetireModalcus);
