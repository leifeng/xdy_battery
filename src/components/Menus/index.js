import React, { Component } from 'react';
import styles from './index.less';
import { Link } from 'dva/router';

import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

export default class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.url,
      openKeys: props.openKeys
    }
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.setState({
      current: e.key,
    }, () => {
      this.props.router.push(e.key)
    });
  }
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => !(this.state.openKeys.indexOf(key) > -1));
    this.setState({ openKeys: this.getKeyPath(latestOpenKey) });
  }
  getKeyPath(key) {
    const map = {
      sys: ['sys'],
      batteryBasic: ['batteryBasic'],
      batterySet: ['batterySet'],
      batteryRec: ['batteryRec'],
      report: ['report'],
      battery: ['battery'],
    };
    return map[key] || [];
  }
  render() {
    const MenuProps = {
      defaultOpenKeys: ['sub1'],
      theme: 'dark',
      mode: 'inline',
      selectedKeys: [this.state.current],
      openKeys: this.state.openKeys
    }
    return (
      <div className={styles.normal}>
        <div className={styles.logo}>电池溯源系统</div>
        <Menu
          {...MenuProps}
          onClick={this.handleClick}
          onOpenChange={this.onOpenChange}
          style={{ width: 220 }}
          >
          <SubMenu key="batteryRec" title={<span><Icon type="star-o" /><span>电池回收管理</span></span>}>
            <Menu.Item key="/admin/batteryRec/batteryRecNoticeMG">电池更换通知单管理(完成)</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryRetireApplyMG">电池退役申请单管理(完成)</Menu.Item>
            <Menu.Item key="/admin/batteryRec/stockStatisticsMG">电池库存信息管理(完成)</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryProcessNoticeMG">电池处理通知单管理(完成)</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryPaymentMG">电池处理支付单管理(完成)</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryDeliveryMG">电池移交通知单管理(完成)</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryRecAccountsMG">电池回收月结单管理</Menu.Item>
          </SubMenu>
          <SubMenu key="report" title={<span><Icon type="line-chart" /><span>电池报表管理</span></span>}>
            <Menu.Item key="/admin/report/batteryRecoveryRecord1">电池回收月统计报表管理</Menu.Item>
            <Menu.Item key="/admin/report/batteryRecoveryRecord2">电池再生处理月统计报表管理</Menu.Item>
            <Menu.Item key="/admin/report/batteryRecoveryRecord3">电池梯次利用月统计报表管理</Menu.Item>
            <Menu.Item key="/admin/report/batteryRecoveryRecord4">电池信息上报报表管理</Menu.Item>
            <Menu.Item key="/admin/report/batteryRecoveryRecord5">单据处理月统计报表管理</Menu.Item>
          </SubMenu>
          <SubMenu key="batterySet" title={<span><Icon type="credit-card" /><span>电池参数管理</span></span>}>
            <Menu.Item key="/admin/batterySet/batteryParamsSet">电池参数设定</Menu.Item>
            <Menu.Item key="/admin/batterySet/batteryRetireSet">电池退役标准管理(完成)</Menu.Item>
            <Menu.Item key="/admin/batterySet/batteryRecoverySet">电池费用设定管理(完成)</Menu.Item>
            <Menu.Item key="/admin/batterySet/batteryRecoveryProcessSet">电池回收流程设定管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sys" title={<span><Icon type="file-text" /><span>系统管理</span></span>}>
            <Menu.Item key="/admin/sys/usersMG">用户管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/rolesMG">角色管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/authMG">权限管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/programMG">程序管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/sysParamsSet">参数管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/sysLogs">日志管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/serviceRunMG">服务及接口运行管理(完成)</Menu.Item>
          </SubMenu>
          <SubMenu key="battery" title={<span><Icon type="appstore-o" /><span>电池管理</span></span>}>
            <Menu.Item key="/admin/battery/batterySingleMG">电池单体管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batModuleInfo">电池模组管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batPackInfo">电池包管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batSysInfo">电池系统管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batStockInfo">电池采购存储管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batteryCarInfo">电池车辆管理</Menu.Item>
            <Menu.Item key="/admin/battery/batUseInfo">电池保养、维修管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batterySingleMG7">电池更换管理</Menu.Item>
            <Menu.Item key="/admin/battery/batterySingleMG8">电池索赔管理</Menu.Item>
            <Menu.Item key="/admin/battery/batReproduceDeal">电池再生处理管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batEchelonUse">电池梯次利用管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batteryRecoveryPointMG">回收管理点管理</Menu.Item>
            <Menu.Item key="/admin/battery/enterpriseMG">再生处理企业管理(完成)</Menu.Item>
            <Menu.Item key="/admin/battery/batterySingleMG12">梯次利用企业管理</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

Menus.defaultProps = {
  url: '/admin/sys/usersMG'
}
