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
import BatteryRecoverySet from './routes/batterySet/BatteryRecoverySet';
import BatteryRecoveryPointMG from './routes/batterySet/BatteryRecoveryPointMG';
import EnterpriseMG from './routes/batterySet/EnterpriseMG';
import BatteryRecoveryProcessSet from './routes/batterySet/BatteryRecoveryProcessSet';

import BatteryBasicInfo from './routes/batteryBasic/BatteryBasicInfo';
import BatteryCarInfo from './routes/batteryBasic/BatteryCarInfo';
import BatteryUseInfo from './routes/batteryBasic/BatteryUseInfo';
import BatteryProcessInfo from './routes/batteryBasic/BatteryProcessInfo';

import BatteryRecNoticeMG from './routes/batteryRec/BatteryRecNoticeMG';
import BatteryRetireApplyMG from './routes/batteryRec/BatteryRetireApplyMG';
import StockStatisticsMG from './routes/batteryRec/StockStatisticsMG';
import BatteryProcessNoticeMG from './routes/batteryRec/BatteryProcessNoticeMG';
import BatteryPaymentMG from './routes/batteryRec/BatteryPaymentMG';
import BatteryTakeMG from './routes/batteryRec/BatteryTakeMG';
import BatteryDeliveryMG from './routes/batteryRec/BatteryDeliveryMG';
import BatteryRecAccountsMG from './routes/batteryRec/BatteryRecAccountsMG';

import BatteryRecoveryRecord from './routes/report/BatteryRecoveryRecord';
import BatteryInventoryInfo from './routes/report/BatteryInventoryInfo';
import BatteryInfoTable from './routes/report/BatteryInfoTable';

import Password from './routes/other/Password';
import UserRegMG from './routes/other/UserRegMG';
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
          <Route path="password" component={Password} breadcrumbName="密码修改" />
          <Route path="userRegMG" component={UserRegMG} breadcrumbName="注册用户管理" />
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
            <Route path="batteryRecoverySet" component={BatteryRecoverySet} breadcrumbName="电池回收费用设定" />
            <Route path="batteryRecoveryPointMG" component={BatteryRecoveryPointMG} breadcrumbName="回收管理点管理" />
            <Route path="enterpriseMG" component={EnterpriseMG} breadcrumbName="处理企业管理" />
            <Route path="batteryRecoveryProcessSet" component={BatteryRecoveryProcessSet} breadcrumbName="电池回收流程设置" />
          </Route>
          <Route path="batteryBasic" breadcrumbName="电池基本信息管理">
            <Route path="batteryBasicInfo" component={BatteryBasicInfo} breadcrumbName="电池包基本信息" />
            <Route path="batteryCarInfo" component={BatteryCarInfo} breadcrumbName="电池包车辆信息" />
            <Route path="batteryUseInfo" component={BatteryUseInfo} breadcrumbName="电池包使用信息" />
            <Route path="batteryProcessInfo" component={BatteryProcessInfo} breadcrumbName="电池包处理信息" />
          </Route>
          <Route path="batteryRec" breadcrumbName="电池回收管理">
            <Route path="batteryRecNoticeMG" component={BatteryRecNoticeMG} breadcrumbName="更换电池通知单管理" />
            <Route path="batteryRetireApplyMG" component={BatteryRetireApplyMG} breadcrumbName="电池退役申请表管理" />
            <Route path="stockStatisticsMG" component={StockStatisticsMG} breadcrumbName="库存统计表管理" />
            <Route path="batteryProcessNoticeMG" component={BatteryProcessNoticeMG} breadcrumbName="退役电池处理通知单管理" />
            <Route path="batteryPaymentMG" component={BatteryPaymentMG} breadcrumbName="退役电池付款单管理" />
            <Route path="batteryTakeMG" component={BatteryTakeMG} breadcrumbName="退役电池提货单管理" />
            <Route path="batteryDeliveryMG" component={BatteryDeliveryMG} breadcrumbName="退役电池交货单管理" />
            <Route path="batteryRecAccountsMG" component={BatteryRecAccountsMG} breadcrumbName="回收电池月度结算单管理" />
          </Route>
          <Route path="report" breadcrumbName="报表">
            <Route path="batteryRecoveryRecord" component={BatteryRecoveryRecord} breadcrumbName="上报工信部电池回收记录表" />
            <Route path="batteryInventoryInfo" component={BatteryInventoryInfo} breadcrumbName="废旧电池库存信息表" />
            <Route path="batteryInfoTable" component={BatteryInfoTable} breadcrumbName="电池进销信息表" />
          </Route>
        </Route>
      </Route>
    </Router>
  );
};
