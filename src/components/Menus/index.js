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
        <h2>电池溯源系统</h2>
        <Menu
          {...MenuProps}
          onClick={this.handleClick}
          onOpenChange={this.onOpenChange}
          style={{ width: 240 }}
          >
          <SubMenu key="sys" title={<span><Icon type="setting" /><span>系统信息管理</span></span>}>
            <Menu.Item key="/admin/sys/usersMG">用户管理</Menu.Item>
            <Menu.Item key="/admin/sys/rolesMG">角色管理</Menu.Item>
            <Menu.Item key="/admin/sys/authMG">权限管理</Menu.Item>
            <Menu.Item key="/admin/sys/usersAuthMG">用户角色管理</Menu.Item>
            <Menu.Item key="/admin/sys/rolesAuthMG">角色权限管理</Menu.Item>
            <Menu.Item key="/admin/sys/sysParamsSet">系统参数设定</Menu.Item>
            <Menu.Item key="/admin/sys/sysLogs">系统日志管理</Menu.Item>
            <Menu.Item key="/admin/sys/serviceRunMG">服务运行管理</Menu.Item>
          </SubMenu>
          <SubMenu key="batteryBasic" title={<span><Icon type="setting" /><span>电池基本信息管理</span></span>}>
            <Menu.Item key="/admin/batteryBasic/batteryBasicInfo">电池包基本信息</Menu.Item>
            <Menu.Item key="/admin/batteryBasic/batteryCarInfo">电池包车辆信息</Menu.Item>
            <Menu.Item key="/admin/batteryBasic/batteryUseInfo">电池包使用信息</Menu.Item>
            <Menu.Item key="/admin/batteryBasic/batteryProcessInfo">电池包处理信息</Menu.Item>
          </SubMenu>
          <SubMenu key="batterySet" title={<span><Icon type="setting" /><span>电池设定信息管理</span></span>}>
            <Menu.Item key="/admin/batterySet/batteryParamsSet">电池参数设定</Menu.Item>
            <Menu.Item key="/admin/batterySet/batteryRetireSet">电池退役设定</Menu.Item>
            <Menu.Item key="/admin/batterySet/batteryRecoverySet">电池回收费用设定</Menu.Item>
            <Menu.Item key="/admin/batterySet/batteryRecoveryPointMG">回收管理点管理</Menu.Item>
            <Menu.Item key="/admin/batterySet/enterpriseMG">处理企业管理</Menu.Item>
            <Menu.Item key="/admin/batterySet/batteryRecoveryProcessSet">电池回收流程设定</Menu.Item>
          </SubMenu>
          <SubMenu key="batteryRec" title={<span><Icon type="setting" /><span>电池回收管理</span></span>}>
            <Menu.Item key="/admin/batteryRec/batteryRecNoticeMG">更换电池通知单管理</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryRetireApplyMG">电池退役申请表管理</Menu.Item>
            <Menu.Item key="/admin/batteryRec/stockStatisticsMG">库存统计表管理</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryProcessNoticeMG">退役电池处理通知单管理</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryPaymentMG">退役电池付款单管理</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryTakeMG">退役电池提货单管理</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryDeliveryMG">退役电池交货单管理</Menu.Item>
            <Menu.Item key="/admin/batteryRec/batteryRecAccountsMG">回收电池月度结算单管理</Menu.Item>
          </SubMenu>
          <SubMenu key="report" title={<span><Icon type="line-chart" /><span>报表</span></span>}>
            <Menu.Item key="/admin/report/batteryRecoveryRecord">上报工信部电池回收记录表</Menu.Item>
            <Menu.Item key="/admin/report/batteryInventoryInfo">废旧电池库存信息表</Menu.Item>
            <Menu.Item key="/admin/report/batteryInfoTable">电池进销信息表</Menu.Item>
          </SubMenu>
          <Menu.Item key="/admin/userRegMG">
            <Icon type="user" />注册用户管理
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

Menus.defaultProps = {
  url: '/admin/sys/usersMG'
}
