import { query } from '../services/login'
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {
    errMsg: ''
  },
  subscriptions: {
  },
  effects: {
    *query({args}, {call, put}) {
      const data = yield call(query, args);
      if (data === 'success') {
        yield put({ type: 'loginState', data: '' })
        yield put(routerRedux.push({ pathname: '/admin' }))
      } else {
        yield put({
          type: 'loginState',
          data: '登录失败'
        })
      }
    }
  },
  reducers: {
    loginState(state, action) {
      const errMsg = action.data;
      return {...state, errMsg }
    }
  },
}
