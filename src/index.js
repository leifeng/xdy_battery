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


app.model(require('./models/batteryParamsSetModel'));//电池参数设定
app.model(require('./models/batteryRetireSetModel'));//电池退役设定


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
