import { query, created, update, remove, removeIds } from '../services/serviceRunMG'

export default {

  namespace: 'serviceRunMG',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    pageNo: 1,
    pageSize: 6,
    total: 0,
    modalType: '',
    data: [],
    record: null,
    modalLoading: false,
    alertState: false,
    searchQuery: null

  },
  subscriptions: {
    setup({dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/sys/serviceRunMG') {
          dispatch({
            type: 'searchQueryState',
            data: null
          })
          dispatch({
            type: 'query',
            args: {
              pageSize: 6,
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
      const searchQuery = yield select(state => state.serviceRunMG.searchQuery)
      const {data} = yield call(query, Object.assign({}, args, searchQuery, { isPaging: true, pageSize: 6 }));
      if (data) {
        yield put({
          type: 'querySuccess',
          data
        })
         yield put({ type: 'selectedRowKeysState', data: [] })
      }
    },
    *create({args}, {call, put}) {
      yield put({ type: 'modalLoadingState', data: true });
      const data = yield call(created, args);
      if (data === 'success') {
        yield put({ type: 'createSuccess' })
        yield put({ type: 'query' })
      } else {
        yield put({ type: 'modalErrorState' });

      }
    },
    *remove({id}, {call, put}) {
      yield put({ type: 'loadingState', data: true });
      const data = yield call(remove, id)
      if (data === 'success') {
        yield put({
          type: 'query',
          args: {
            pageSize: 6,
            pageNo: 1,
            isPaging: true
          }
        })
      }
    },
    *update({args}, {select, call, put}) {
      yield put({ type: 'modalLoadingState', data: true });
      const record = yield select(state => state.serviceRunMG.record)
      const data = yield call(update, Object.assign(args, { id: record.id }));
      if (data === 'success') {
        yield put({ type: 'createSuccess' })
        yield put({ type: 'query' })
      } else {
        yield put({ type: 'modalErrorState' });
      }
    },
    *removeIds({}, {select, call, put}) {
      const ids = yield select(state => state.serviceRunMG.selectedRowKeys);
      const data = yield call(removeIds, ids);
      if (data === 'success') {
        yield put({
          type: 'query',
          args: {
            pageSize: 6,
            pageNo: 1,
            isPaging: true
          }
        })
        yield put({ type: 'selectedRowKeysState', data: [] })

      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      const {totalCount, pageNo, list} = action.data
      return { ...state, data: list, total: totalCount, pageNo: pageNo, loading: false }
    },
    createSuccess(state, action) {
      return { ...state, visible: false, modalLoading: false }
    },
    loadingState(state, action) {
      return { ...state, loading: action.data }
    },
    selectedRowKeysState(state, action) {
      return { ...state, selectedRowKeys: action.data }
    },
    openModalState(state, action) {
      return { ...state, visible: true, modalType: action.data }
    },
    closeModalState(state, action) {
      return { ...state, alertState: false, visible: false }
    },
    recordState(state, action) {
      const { record, modalType } = action.data;
      return { ...state, record, modalType, visible: true }
    },
    modalLoadingState(state, action) {
      return { ...state, modalLoading: action.data }
    },
    modalErrorState(state, action) {
      return { ...state, alertState: true, modalLoading: false }
    },
    searchQueryState(state, action) {
      return { ...state, searchQuery: action.data }
    },
    searchQueryChangeState(state, action) {
      const {name, value} = action.data;
      const {searchQuery} = state;
      const newState = {};
      newState[name] = value;
      const newsearchQuery = Object.assign({}, searchQuery, newState)
      return { ...state, searchQuery: newsearchQuery }
    }
  }


}
