import { query, created, update, remove, removeIds, getBindRight, setBindRight } from '../services/rolesMG'
import { queryTree } from '../services/menus';

export default {

  namespace: 'rolesMG',

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
    alertState: false,
    searchQuery: null,
    modalLoading: false,
    authModalVisible: false,
    roleid: '',
    checkedKeys: [],
    checkedAllKeys: [],
    roleName: ''
  },
  subscriptions: {
    setup({dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/sys/rolesMG') {
          dispatch({
            type: 'searchQueryState',
            data: null
          })
          dispatch({
            type: 'menus/queryTree',
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
      const searchQuery = yield select(state => state.rolesMG.searchQuery)
      const {data} = yield call(query, Object.assign({}, args, searchQuery, { isPaging: true, pageSize: 6 }));
      if (data) {
        yield put({
          type: 'querySuccess',
          data
        })
         yield put({ type: 'selectedRowKeysState', data: [] })
      }
    },
    *create({args}, { call, put}) {
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
    *removeIds({}, {select, call, put}) {
      const ids = yield select(state => state.rolesMG.selectedRowKeys);
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
    *update({args}, {select, call, put}) {
      yield put({ type: 'modalLoadingState', data: true });
      const record = yield select(state => state.rolesMG.record)
      const data = yield call(update, Object.assign(args, { id: record.id }));
      if (data === 'success') {
        yield put({ type: 'createSuccess' })
        yield put({ type: 'query' })
      } else {
        yield put({ type: 'modalErrorState' });
      }
    },
    *queryAuthbyRoleId({args}, {call, put}) {
      const {data} = yield call(getBindRight, args.roleid);
      if (data) {
        yield put({
          type: 'checkedKeysState',
          data
        });
        yield put({
          type: 'authModalShowState',
          data: {
            roleid: args.roleid,
            roleName: args.roleName
          }
        })
      }
    },
    *setBindRight({}, {select, call, put}) {
      const checkedAllKeys = yield select(state => state.rolesMG.checkedAllKeys);
      const roleid = yield select(state => state.rolesMG.roleid);

      const data = yield call(setBindRight, { roleId: roleid, modelIds: checkedAllKeys });
      if (data === 'success') {
        yield put({
          type: 'authModalHideState'
        })
        yield put({
          type: 'query',
          args: {
            pageSize: 6,
            pageNo: 1,
            isPaging: true
          }
        })
      }

    }
  },

  reducers: {
    querySuccess(state, action) {
      const {totalCount, pageNo, list} = action.data
      return { ...state, data: list, total: totalCount, pageNo: pageNo, loading: false }
    },
    createSuccess(state, action) {
      return { ...state, visible: false, modalLoading: false, alertState: false }
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
    },
    authModalShowState(state, action) {
      const {roleName, roleid} = action.data;
      return { ...state, roleid, roleName, authModalVisible: true }
    },
    authModalHideState(state, action) {
      return { ...state, roleid: '', checkedKeys: [], checkedAllKeys: [], authModalVisible: false }
    },
    checkedKeysState(state, action) {
      return { ...state, checkedKeys: action.data }

    },
    checkedAllKeysState(state, action) {
      return { ...state, checkedAllKeys: action.data }
    },

  }

}
