import moment from 'moment-timezone/moment-timezone';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Shanghai');
import './index.html';
import './index.less';
import dva from 'dva';
import { browserHistory } from 'dva/router';
// 1. Initialize
const app = dva({
  history: browserHistory
});

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/adminModel'));//管理中心

app.model(require('./models/usersMGModel'));//用户管理
app.model(require('./models/rolesMGModel'));//角色管理
app.model(require('./models/authMGModel'));//权限管理
app.model(require('./models/rolesAuthMGModel'));//角色权限管理
app.model(require('./models/usersAuthMGModel'));//角色权限管理
app.model(require('./models/sysParamsSetModel'));//角色权限管理
app.model(require('./models/sysLogsModel'));//日志管理
app.model(require('./models/serviceRunMGModel'));//服务运行管理

app.model(require('./models/batteryBasicInfoModel'));//电池包基础信息
app.model(require('./models/batteryCarInfoModel'));//电池包车辆信息
app.model(require('./models/batteryUseInfoModel'));//电池包使用信息
app.model(require('./models/batteryProcessInfoModel'));//电池包处理

app.model(require('./models/batteryParamsSetModel'));//电池参数设定
app.model(require('./models/batteryRetireSetModel'));//电池退役设定
app.model(require('./models/batteryRecoverySetModel'));//电池回收费用设定
app.model(require('./models/batteryRecoveryPointMGModel'));//电池回收点管理
app.model(require('./models/enterpriseMGModel'));//处理企业管理
app.model(require('./models/batteryRecoveryProcessSetModel'));//电池回收流程设定

app.model(require('./models/batteryRecNoticeMGModel'));//更换电池通知单管理
app.model(require('./models/batteryRetireApplyMGModel'));//电池退役申请表管理
app.model(require('./models/stockStatisticsMGModel'));//库存统计表管理
app.model(require('./models/batteryProcessNoticeMGModel'));//退役电池处理通知单管理
app.model(require('./models/batteryPaymentMGModel'));//退役电池付款单管理
app.model(require('./models/batteryTakeMGModel'));//退役电池提货单管理
app.model(require('./models/batteryDeliveryMGModel'));//退役电池交货单管理
app.model(require('./models/batteryRecAccountsMGModel'));//回收电池月度结算单管理

app.model(require('./models/batteryRecoveryRecordModel'));//上报工信部电池回收记录表
app.model(require('./models/batteryInventoryInfoModel'));//废旧电池库存信息表
app.model(require('./models/batteryInfoTableModel'));//电池进销信息表

app.model(require('./models/userRegMGModel'));//注册用户管理

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
