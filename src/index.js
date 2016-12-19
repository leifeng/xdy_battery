import moment from 'moment-timezone/moment-timezone';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Shanghai');
import './index.html';
import './index.less';
import './antd.less';
import dva from 'dva';
import { browserHistory } from 'dva/router';
// 1. Initialize
const app = dva({
  history: browserHistory
});

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/loginModel'));//登录

app.model(require('./models/adminModel'));//管理中心

app.model(require('./models/usersMGModel'));//用户管理
app.model(require('./models/rolesMGModel'));//角色管理
app.model(require('./models/authMGModel'));//权限管理
app.model(require('./models/sysParamsSetModel'));//系统参数管理
app.model(require('./models/sysLogsModel'));//日志管理
app.model(require('./models/serviceRunMGModel'));//服务运行管理
app.model(require('./models/programMGModel'));//程序管理



// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
