import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'dva/router';



const RolesMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/sys/RolesMG').default);
  })
};
const AuthMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/sys/AuthMG').default);
  })
};
const RolesAuthMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/sys/RolesAuthMG').default);
  })
};
const UsersAuthMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/sys/UsersAuthMG').default);
  })
};
const SysParamsSet = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/sys/SysParamsSet').default);
  })
};
const SysLogs = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/sys/SysLogs').default);
  })
};
const ServiceRunMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/sys/ServiceRunMG').default);
  })
};

const BatteryParamsSet = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batterySet/BatteryParamsSet').default);
  })
};
const BatteryRetireSet = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batterySet/BatteryRetireSet').default);
  })
};
const BatteryRecoverySet = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batterySet/BatteryRecoverySet').default);
  })
};
const BatteryRecoveryPointMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batterySet/BatteryRecoveryPointMG').default);
  })
};
const EnterpriseMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batterySet/EnterpriseMG').default);
  })
};
const BatteryRecoveryProcessSet = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batterySet/BatteryRecoveryProcessSet').default);
  })
};

const BatteryBasicInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryBasic/BatteryBasicInfo').default);
  })
};
const BatteryCarInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryBasic/BatteryCarInfo').default);
  })
};
const BatteryUseInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryBasic/BatteryUseInfo').default);
  })
};
const BatteryProcessInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryBasic/BatteryProcessInfo').default);
  })
};

const BatteryRecNoticeMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryRec/BatteryRecNoticeMG').default);
  })
};
const BatteryRetireApplyMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryRec/BatteryRetireApplyMG').default);
  })
};
const StockStatisticsMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryRec/StockStatisticsMG').default);
  })
};
const BatteryProcessNoticeMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryRec/BatteryProcessNoticeMG').default);
  })
};
const BatteryPaymentMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryRec/BatteryPaymentMG').default);
  })
};
const BatteryTakeMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryRec/BatteryTakeMG').default);
  })
};
const BatteryDeliveryMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryRec/BatteryDeliveryMG').default);
  })
};
const BatteryRecAccountsMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/batteryRec/BatteryRecAccountsMG').default);
  })
};
const BatteryRecoveryRecord = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/report/BatteryRecoveryRecord').default);
  })
};
const BatteryInventoryInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/report/BatteryInventoryInfo').default);
  })
};
const BatteryInfoTable = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/report/BatteryInfoTable').default);
  })
};
const Password = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/other/Password').default);
  })
};
const UserRegMG = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./routes/other/UserRegMG').default);
  })
};

import Admin from './routes/admin';
import Layout from './routes/layout';
import Login from './routes/login';

export default function ({ history, app  }) {
  const routes = [
    {
      path: '/',
      component: Layout,
      indexRoute: { component: Login },
      childRoutes: [
        { path: 'login', component: Login },
        {
          path: 'admin',
          component: Admin,
          breadcrumbName: "管理中心",
          onEnter(nextState, replace, callback) {
            console.log('1111111111111')
            replace('/admin/sys/usersMG')
          //  callback();
          },
          childRoutes: [
            {
              path: 'password',
              breadcrumbName: "密码修改",
              getComponent(location, cb) {
                require.ensure([], require => {
                  cb(null, require('./routes/other/Password'));
                })
              }
            },
            {
              path: 'userRegMG',
              breadcrumbName: "注册用户管理",
              getComponent(location, cb) {
                require.ensure([], require => {
                  cb(null, require('./routes/other/UserRegMG'));
                })
              }
            },
            {
              path: 'sys',
              breadcrumbName: "系统信息管理",
              childRoutes: [
                {
                  path: 'usersMG',
                  breadcrumbName: "用户管理",
                  getComponent(location, cb) {
                    require.ensure([], require => {
                      app.model(require('./models/adminModel'));
                      cb(null, require('./routes/sys/UsersMG'));
                    })
                  },
                },
                {
                  path: 'rolesMG',
                  breadcrumbName: "角色管理",
                  getComponent(location, cb) {
                    require.ensure([], require => {
                      app.model(require('./models/rolesMGModel'));
                      cb(null, require('./routes/sys/RolesMG'));
                    })
                  },
                },
                {
                  path: 'authMG',
                  breadcrumbName: "角色管理",
                  getComponent(location, cb) {
                    require.ensure([], require => {
                      app.model(require('./models/authMGModel'));
                      cb(null, require('./routes/sys/AuthMG'));
                    })
                  },
                },
              ]
            }
          ]
        },
      ]
    }
  ]


  return (
    <Router history={history} routes={routes} />
  );
};
{/*
        <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Login} />
        <Route path='login' component={Login} />
        <Route path="admin" component={Admin} breadcrumbName="管理中心">
          <IndexRedirect to="/admin/sys/usersMG" />
          <Route path="password" getComponent={Password} breadcrumbName="密码修改" />
          <Route path="userRegMG" getComponent={UserRegMG} breadcrumbName="注册用户管理" />
          <Route path="sys" breadcrumbName="系统信息管理">
            <Route path="usersMG" getComponent={UsersMG} breadcrumbName="用户管理" />
            <Route path="rolesMG" getComponent={RolesMG} breadcrumbName="角色管理" />
            <Route path="authMG" getComponent={AuthMG} breadcrumbName="权限管理" />
            <Route path="rolesAuthMG" getComponent={RolesAuthMG} breadcrumbName="角色权限管理" />
            <Route path="usersAuthMG" getComponent={UsersAuthMG} breadcrumbName="用户权限管理" />
            <Route path="sysParamsSet" getComponent={SysParamsSet} breadcrumbName="系统参数设置" />
            <Route path="sysLogs" getComponent={SysLogs} breadcrumbName="系统日志" />
            <Route path="serviceRunMG" getComponent={ServiceRunMG} breadcrumbName="服务运行管理" />
          </Route>
          <Route path="batterySet" breadcrumbName="电池设定信息管理">
            <Route path="batteryParamsSet" getComponent={BatteryParamsSet} breadcrumbName="电池参数设定" />
            <Route path="batteryRetireSet" getComponent={BatteryRetireSet} breadcrumbName="电池退役设定" />
            <Route path="batteryRecoverySet" getComponent={BatteryRecoverySet} breadcrumbName="电池回收费用设定" />
            <Route path="batteryRecoveryPointMG" getComponent={BatteryRecoveryPointMG} breadcrumbName="回收管理点管理" />
            <Route path="enterpriseMG" getComponent={EnterpriseMG} breadcrumbName="处理企业管理" />
            <Route path="batteryRecoveryProcessSet" getComponent={BatteryRecoveryProcessSet} breadcrumbName="电池回收流程设置" />
          </Route>
          <Route path="batteryBasic" breadcrumbName="电池基本信息管理">
            <Route path="batteryBasicInfo" getComponent={BatteryBasicInfo} breadcrumbName="电池包基本信息" />
            <Route path="batteryCarInfo" getComponent={BatteryCarInfo} breadcrumbName="电池包车辆信息" />
            <Route path="batteryUseInfo" getComponent={BatteryUseInfo} breadcrumbName="电池包使用信息" />
            <Route path="batteryProcessInfo" getComponent={BatteryProcessInfo} breadcrumbName="电池包处理信息" />
          </Route>
          <Route path="batteryRec" breadcrumbName="电池回收管理">
            <Route path="batteryRecNoticeMG" getComponent={BatteryRecNoticeMG} breadcrumbName="更换电池通知单管理" />
            <Route path="batteryRetireApplyMG" getComponent={BatteryRetireApplyMG} breadcrumbName="电池退役申请表管理" />
            <Route path="stockStatisticsMG" getComponent={StockStatisticsMG} breadcrumbName="库存统计表管理" />
            <Route path="batteryProcessNoticeMG" getComponent={BatteryProcessNoticeMG} breadcrumbName="退役电池处理通知单管理" />
            <Route path="batteryPaymentMG" getComponent={BatteryPaymentMG} breadcrumbName="退役电池付款单管理" />
            <Route path="batteryTakeMG" getComponent={BatteryTakeMG} breadcrumbName="退役电池提货单管理" />
            <Route path="batteryDeliveryMG" getComponent={BatteryDeliveryMG} breadcrumbName="退役电池交货单管理" />
            <Route path="batteryRecAccountsMG" getComponent={BatteryRecAccountsMG} breadcrumbName="回收电池月度结算单管理" />
          </Route>
          <Route path="report" breadcrumbName="报表">
            <Route path="batteryRecoveryRecord" getComponent={BatteryRecoveryRecord} breadcrumbName="上报工信部电池回收记录表" />
            <Route path="batteryInventoryInfo" getComponent={BatteryInventoryInfo} breadcrumbName="废旧电池库存信息表" />
            <Route path="batteryInfoTable" getComponent={BatteryInfoTable} breadcrumbName="电池进销信息表" />
          </Route>
        </Route>
      </Route>
    </Router>
         */}
