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
      openKeys: ['sub1']
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
      sub1: ['sub1'],
      sub2: ['sub2'],
      sub3: ['sub3'],
      sub4: ['sub4'],
      sub5: ['sub5'],
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
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>系统信息管理</span></span>}>
            <Menu.Item key="/admin/sys/usersMG">用户管理</Menu.Item>
            <Menu.Item key="/admin/sys/rolesMG">角色管理</Menu.Item>
            <Menu.Item key="/admin/sys/authMG">权限管理</Menu.Item>
            <Menu.Item key="/admin/sys/usersAuthMG">用户角色管理</Menu.Item>
            <Menu.Item key="/admin/sys/rolesAuthMG">角色权限管理</Menu.Item>
            <Menu.Item key="/admin/sys/sysParamsSet">系统参数设定</Menu.Item>
            <Menu.Item key="/admin/sys/sysLogs">系统日志管理</Menu.Item>
            <Menu.Item key="/admin/sys/serviceRunMG">服务运行管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>电池基本信息管理</span></span>}>
            <Menu.Item key="9">电池包基本信息</Menu.Item>
            <Menu.Item key="10">电池包车辆信息</Menu.Item>
            <Menu.Item key="11">电池包使用信息</Menu.Item>
            <Menu.Item key="12">电池包处理信息</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="setting" /><span>电池设定信息管理</span></span>}>
            <Menu.Item key="13">电池参数设定</Menu.Item>
            <Menu.Item key="14">电池退役设定</Menu.Item>
            <Menu.Item key="15">电池回收费用设定</Menu.Item>
            <Menu.Item key="16">回收管理点管理</Menu.Item>
            <Menu.Item key="17">处理企业管理</Menu.Item>
            <Menu.Item key="18">电池回收流程设定</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>电池回收管理</span></span>}>
            <Menu.Item key="19">更换电池通知单管理</Menu.Item>
            <Menu.Item key="20">电池退役申请表管理</Menu.Item>
            <Menu.Item key="21">库存统计表管理</Menu.Item>
            <Menu.Item key="22">退役电池处理通知单管理</Menu.Item>
            <Menu.Item key="23">退役电池付款单管理</Menu.Item>
            <Menu.Item key="24">退役电池提货单管理</Menu.Item>
            <Menu.Item key="25">退役电池交货单管理</Menu.Item>
            <Menu.Item key="26">回收电池月度结算单管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><Icon type="setting" /><span>报表</span></span>}>
            <Menu.Item key="27">上报工信部电池回收记录表</Menu.Item>
            <Menu.Item key="28">废旧电池库存信息表</Menu.Item>
            <Menu.Item key="29">电池进销信息表</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

Menus.defaultProps={
  url:'/admin/sys/usersMG'
}
