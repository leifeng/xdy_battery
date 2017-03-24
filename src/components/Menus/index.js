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
  componentWillReceiveProps(nextProps) {
    this.setState({
      current: location.pathname
    })
  }

  componentWillMount() {
    this.setState({
      current: location.pathname,
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

    console.log(openKeys)
    const latestOpenKey = openKeys.length === 2 ? openKeys[1] : openKeys[0]
    const {onOpenkeyChange} = this.props;
    Cookies.set('dir', latestOpenKey)
    onOpenkeyChange(latestOpenKey)
  }
  getKeyPath(key) {
    const map = {
      sys: ['sys'],
      batteryBasic: ['batteryBasic'],
      batterySet: ['batterySet'],
      batteryRec: ['batteryRec'],
      report: ['report'],
      battery: ['battery'],
      admin: ['admin']
    };
    return map[key] || [];
  }
  render() {
    const MenuProps = {
      theme: 'dark',
      mode: 'inline',
      selectedKeys: [this.state.current],
      openKeys: this.props.openKeys
    }
    return (
      <div className={styles.normal}>
        <div className={styles.logo}>动力电池溯源系统</div>
        <Menu
          {...MenuProps}
          onClick={this.handleClick}
          onOpenChange={this.onOpenChange}
          style={{ width: 240 }}
        >
          <SubMenu key='admin' title={<span><Icon type='home' /><span>首页</span></span>}>
            <Menu.Item key='/admin/index'>首页</Menu.Item>
          </SubMenu>

          {this.props.data.map((item, index) => {
            return <SubMenu key={item.menuUrl} title={<span><Icon type={item.menuCol1} /><span>{item.label}</span></span>}>
              {item.children && item.children.map((m, i) => {
                return <Menu.Item key={m.menuUrl}>{m.label}</Menu.Item>
              })}
            </SubMenu>
          })}
        </Menu>
      </div>
    );
  }
}

Menus.defaultProps = {
  url: '/admin/index',
  openKeys: ['admin'],
  data: []
}
