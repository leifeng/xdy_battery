import { query } from '../services/sysLogs'


export default {

  namespace: 'sysLogs',

  state: {
    loading: false,
    pageNo: 1,
    pageSize: 10,
    total: 0,
    data: [],
    searchQuery: null
  },
  subscriptions: {
    setup({dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/sys/sysLogs') {
          dispatch({
            type: 'query',
            args: {
              pageSize: 10,
              pageNo: 1,
              isPaging: true
            }
          })
        }
      })
    },
  },

  effects: {
    *query({args}, {select, call, put}) {
      yield put({ type: 'loadingState', data: true });
      const searchQuery = yield select(state => state.sysLogs.searchQuery)
      const {data} = yield call(query, Object.assign({}, args, searchQuery, { isPaging: true, pageSize: 10 }));
      if (data) {
        yield put({
          type: 'querySuccess',
          data
        })
      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      const {totalCount, pageNo, list} = action.data
      return {...state, data: list, total: totalCount, pageNo: pageNo, loading: false }
    },
    loadingState(state, action) {
      return {...state, loading: action.data }
    },
    searchQueryState(state, action) {
      return {...state, searchQuery: action.data }
    },
    searchQueryChangeState(state, action) {
      const {name, value} = action.data;
      const {searchQuery} = state;
      const newState = {};
      newState[name] = value;
      const newsearchQuery = Object.assign({}, searchQuery, newState)
      return {...state, searchQuery: newsearchQuery }
    }
  },

}
