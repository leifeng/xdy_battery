import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'dva/router';



import UsersMG from './routes/sys/UsersMG';
import RolesMG from './routes/sys/RolesMG';
import AuthMG from './routes/sys/AuthMG';
import SysParamsSet from './routes/sys/SysParamsSet';
import SysLogs from './routes/sys/SysLogs';
import ServiceRunMG from './routes/sys/ServiceRunMG';
import ProgramMG from './routes/sys/ProgramMG';


import Admin from './routes/admin';
import Layout from './routes/layout';
import Login from './routes/login';



export default function ({ history  }) {
  return (
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Login} />
        <Route path='login' component={Login} />
        <Route path="admin" component={Admin} breadcrumbName="管理中心">
          <IndexRedirect to="/admin/sys/usersMG" />
          <Route path="sys" breadcrumbName="系统管理">
            <Route path="usersMG" component={UsersMG} breadcrumbName="用户管理" />
            <Route path="rolesMG" component={RolesMG} breadcrumbName="角色管理" />
            <Route path="authMG" component={AuthMG} breadcrumbName="权限管理" />
            <Route path="programMG" component={ProgramMG} breadcrumbName="程序管理" />
            <Route path="sysParamsSet" component={SysParamsSet} breadcrumbName="参数管理" />
            <Route path="sysLogs" component={SysLogs} breadcrumbName="日志管理" />
            <Route path="serviceRunMG" component={ServiceRunMG} breadcrumbName="服务及接口运行管理" />
          </Route>

        </Route>
      </Route>
    </Router>
  );
};
