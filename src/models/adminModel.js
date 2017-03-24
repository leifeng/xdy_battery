import { resetPwd } from '../services/usersMG'
import Cookies from 'js-cookie';

export default {
  namespace: 'admin',

  state: {
    editPwdVisible: false,
    editPwdLoading: false,
    visible: false,
    url: '/admin/index',
    openKeys: [Cookies.get('dir') || 'admin']
  },

  subscriptions: {
    setup({ dispatch, history }) {
      const pathname = location.pathname;
      history.listen(location => {
        if (location.pathname.indexOf('/admin') !== -1) {
          dispatch({
            type: 'openKeysState',
            data: Cookies.get('dir') || 'admin'
          })
          dispatch({
            type: 'menus/queryMenuLeaf'
          });
          dispatch({
            type: 'menus/queryMenu'
          });
          dispatch({
            type: 'dictionary/queryAll'
          });
        }
      })
      // dispatch({
      //   type: 'urlState',
      //   data: {
      //     url: pathname,
      //     openKeys: [].concat(pathname.split('/')[2])
      //   }
      // });
    },
  },

  effects: {
    *updatePwd({args}, {call, put}) {
      yield put({ type: 'editPwdLoadingState', data: true })
      const userId = Cookies.get('userId')
      if (userId) {
        const data = yield call(resetPwd, { userId: userId, password: args });
        if (data === 'success') {
          yield put({ type: 'editPwdLoadingState', data: false })
          yield put({ type: 'editPwdVisibleState', data: false })
        }
      }
    },
  },

  reducers: {
    visibleChange(state, action) {
      return { ...state, visible: action.payload }
    },
    urlState(state, action) {
      const {url, openKeys} = action.data
      return { ...state, url, openKeys }
    },
    editPwdVisibleState(state, action) {
      return { ...state, editPwdVisible: action.data }
    },
    openKeysState(state, action) {
      return { ...state, openKeys: [action.data] }
    }
  },

}
