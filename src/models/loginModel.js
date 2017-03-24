import { query } from '../services/login'
import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie';

export default {
  namespace: 'login',
  state: {
    errMsg: '',
    isLogin: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/login') {
          Cookies.remove('dir');
          dispatch({
            type: 'menus/clearMenu'
          })
          dispatch({
            type: 'dictionary/queryAllSuccess',
            data: []
          })
        }
      })
    },
  },
  effects: {
    *query({ args }, { call, put }) {
      const { data } = yield call(query, args);
      if (data) {
        Cookies.set('userId', data)
        Cookies.set('userName', args.userName)
        Cookies.set('dir', 'admin')
        yield put({ type: 'loginState', data: '' })
        yield put(routerRedux.push({ pathname: '/admin/index' }))
      } else {
        yield put({
          type: 'loginState',
          data: '请输入正确的用户名和密码'
        })
      }
    }
  },
  reducers: {
    loginState(state, action) {
      const errMsg = action.data;
      return { ...state, errMsg }
    }
  },
}
