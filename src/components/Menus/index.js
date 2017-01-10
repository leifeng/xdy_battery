import React, { Component } from 'react';
import styles from './index.less';
import { Link } from 'dva/router';
import Cookies from 'js-cookie';

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

  componentWillMount() {
    this.setState({
      current: location.pathname,
      openKeys: [Cookies.get('dir')]
    })
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
    Cookies.set('dir', latestOpenKey)
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
      theme: 'dark',
      mode: 'inline',
      selectedKeys: [this.state.current],
      openKeys: this.state.openKeys
    }
    return (
      <div className={styles.normal}>
        <div className={styles.logo}></div>
        <Menu
          {...MenuProps}
          onClick={this.handleClick}
          onOpenChange={this.onOpenChange}
          style={{ width: 240 }}
          >  
          <SubMenu key="sys" title={<span><Icon type="file-text" /><span>系统管理</span></span>}>
            <Menu.Item key="/admin/sys/usersMG">用户管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/rolesMG">角色管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/authMG">权限管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/programMG">程序管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/sysParamsSet">参数管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/dictionary">字典管理(完成)</Menu.Item>
            <Menu.Item key="/admin/sys/sysLogs">日志管理(完成)</Menu.Item>
          </SubMenu>
   
        </Menu>
      </div>
    );
  }
}

Menus.defaultProps = {
  url: '/admin/sys/usersMG',
  openKeys: ['sys'],
}
