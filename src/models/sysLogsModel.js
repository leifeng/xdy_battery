import { query, create, update, remove } from '../services/sysLogs'
import { parse } from 'qs'

export default {

  namespace: 'sysLogs',

  state: {
    loading: false,
    current: 1,
    pageSize: 10,
    total: 0,
    data: [{
      application: '用户添加',
      logType: '异常',
      log: 'DEF',
      logDesc: 'DEF',
      ip: 'DEF',
      createTime: '2016 - 11 - 4',
      account: 'DEF',
      creator: 'DEF'

    }]
  },
  subscriptions: {
    // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/sys/sysLogs') {
    //       dispatch({
    //         type: 'query',
    //         args: {
    //           current: 1
    //         }
    //       })
    //     }
    //   })
    // },
  },

  effects: {
    *query({args}, {select, call, put}) {
      yield put({ type: 'loadingState', data: true });
      const pageSize = yield select(state => state.sysLogs.pageSize)
      const current = yield select(state => state.sysLogs.current)
      const params = { current, pageSize,...args }
      const {data} = yield call(query, parse(params));
      if (data.success) {
        yield put({
          type: 'querySuccess',
          data
        })
      }
    }
  },

  reducers: {
    querySuccess(state, action) {
      const {page, data} = action.data
      return {...state, data: data, total: page.total, current: page.current, loading: false }
    },
    pageSizeState(state, action) {
      return {...state, pageSize: action.data }
    },
    loadingState(state, action) {
      return {...state, loading: action.data }
    }
  },

}
