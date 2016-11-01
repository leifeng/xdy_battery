import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'dva/router';
import Login from './routes/login';



import UsersMG from './routes/sys/UsersMG';
import RolesMG from './routes/sys/RolesMG';
import AuthMG from './routes/sys/AuthMG';
import RolesAuthMG from './routes/sys/RolesAuthMG';
import UsersAuthMG from './routes/sys/UsersAuthMG';
import SysParamsSet from './routes/sys/SysParamsSet';
import SysLogs from './routes/sys/SysLogs';
import ServiceRunMG from './routes/sys/ServiceRunMG';

import BatteryParamsSet from './routes/batterySet/BatteryParamsSet';
import BatteryRetireSet from './routes/batterySet/BatteryRetireSet';
import Admin from './routes/admin';
import Layout from './routes/layout';
export default function ({ history  }) {
  return (
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Login} />
        <Route path='login' component={Login} />
        <Route path="admin" component={Admin} breadcrumbName="管理中心">
          <IndexRedirect to="/admin/sys/usersMG" />
          <Route path="sys" breadcrumbName="系统信息管理">
            <Route path="usersMG" component={UsersMG} breadcrumbName="用户管理" />
            <Route path="rolesMG" component={RolesMG} breadcrumbName="角色管理" />
            <Route path="authMG" component={AuthMG} breadcrumbName="权限管理" />
            <Route path="rolesAuthMG" component={RolesAuthMG} breadcrumbName="角色权限管理" />
            <Route path="usersAuthMG" component={UsersAuthMG} breadcrumbName="用户权限管理" />
            <Route path="sysParamsSet" component={SysParamsSet} breadcrumbName="系统参数设置" />
            <Route path="sysLogs" component={SysLogs} breadcrumbName="系统日志" />
            <Route path="serviceRunMG" component={ServiceRunMG} breadcrumbName="服务运行管理" />
          </Route>
          <Route path="batterySet" breadcrumbName="电池设定信息管理">
            <Route path="batteryParamsSet" component={BatteryParamsSet} breadcrumbName="电池参数设定" />
            <Route path="batteryRetireSet" component={BatteryRetireSet} breadcrumbName="电池退役设定" />
          </Route>
        </Route>
      </Route>
    </Router>
  );
};
