import React from 'react';
import { Button, notification } from 'antd';
import { taskRemind } from '../../services/task';
import Cookies from 'js-cookie';



class AlertMessage extends React.Component {
  constructor() {
    super();
    this.t = -1;
    this.getData = this.getData.bind(this);
    this.openNotification = this.openNotification.bind(this);
    this.onClick = this.onClick.bind(this);
    this.timeout = this.timeout.bind(this);
  }
  render() {
    return null
  }
  componentDidMount() {
    this.getData();
    this.timeout()
  }
  onClick(url) {
    const {onChange} = this.props;
    Cookies.set('dir','batteryRec')
    onChange(url, 'batteryRec')
  }

  openNotification(url, text, num) {
    const btn = (
      <Button type="primary" size="small" onClick={() => this.onClick(url)}>
        点击查看
    </Button >
    );
    notification.info({
      placement: 'bottomRight',
      message: '流程处理提醒',
      description: '您在' + text + '中有待办任务需要处理', btn,
      btn
    });
  }
  async getData() {
    const {data} = await taskRemind();
    if (data) {
      let url = '';
      let text = '';
      switch (data.url) {
        case 'zlbmtyjd':
          url = '/admin/batteryRec/batteryRetireApplyMG';
          text = '电池退役申请单管理'
          break;
        case 'notifyBatteryPlant':
          url = '/admin/batteryRec/batteryRetireApplyMG';
          text = '电池退役申请单管理'
          break;
        case 'batteryPlantPay':
          url = '/admin/batteryRec/batteryProcessNoticeMG';
          text = '电池处理通知单管理'
          break;
        case 'financeConfirm':
          url = '/admin/batteryRec/batteryPaymentMG';
          text = '电池处理支付单管理'
          break;
        case 'manufacturerFetchBatter':
          url = '/admin/batteryRec/batteryDeliveryMG';
          text = '电池移交通知单管理'
          break;
        case 'payToRecycleBin':
          url = '/admin/batteryRec/batteryRecAccountsMG';
          text = '电池回收月结单管理'
          break;
        case 'recycleBinConfirmCharge':
          url = '/admin/batteryRec/batteryRecAccountsMG';
          text = '电池回收月结单管理'
          break;

      }
      if (data.num) {
        this.openNotification(url, text, data.num)
      }
    }
    this.timeout()
  }
  timeout() {
    clearTimeout(this.t)
    this.t = setTimeout(async () => {
      this.getData()
    }, 2000 * 60)
  }
  componentWillUnmount() {
    clearTimeout(this.t)
  }

}

export default AlertMessage
