import { query, created, update, remove, removeIds, queryTree, menuLeaf, queryMenu, queryAddTree } from '../services/menus'

export default {

  namespace: 'menus',

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
    addTree: [],
    menuTree: [],
    dataTree: [],
    menuLeaf: null,
    menuLevelDisabled: true
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/sys/menus') {
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
          dispatch({
            type: 'queryAddTree'
          })
          dispatch({
            type: 'queryMenu'
          })
        }
      })
    },
  },

  effects: {
    *query({ args }, { select, call, put }) {
      yield put({ type: 'loadingState', data: true });
      const searchQuery = yield select(state => state.menus.searchQuery)
      const { data } = yield call(query, Object.assign({}, args, searchQuery, { isPaging: true, pageSize: 6 }));
      if (data) {
        yield put({
          type: 'querySuccess',
          data
        })
        yield put({ type: 'selectedRowKeysState', data: [] })
      }
    },
    *queryAddTree({ }, { call, put }) {
      const { data } = yield call(queryAddTree);
      if (data) {
        yield put({
          type: 'queryAddTreeSuccess',
          data
        })
      }
    },
    *queryMenu({ }, { call, put, select }) {
      const menuTreeData = yield select(state => state.menus.menuTree)
      if (menuTreeData.length === 0) {
        const { data } = yield call(queryMenu);
        if (data) {
          yield put({
            type: 'queryMenuSuccess',
            data
          })
        }
      }
    },
    *queryTree({ }, { call, put }) {
      const { data } = yield call(queryTree);
      if (data) {
        yield put({
          type: 'queryTreeSuccess',
          data
        })
      }
    },
    *queryMenuLeaf({ }, { call, put, select }) {
      const menuLeafData = yield select(state => state.menus.menuLeaf)
      if (!menuLeafData) {
        const { data } = yield call(menuLeaf);
        if (data) {
          yield put({
            type: 'queryMenuLeafSuccess',
            data
          })
        }
      }

    },
    *create({ args }, { call, put }) {
      yield put({ type: 'modalLoadingState', data: true });
      const data = yield call(created, args);
      if (data === 'success') {
        yield put({ type: 'createSuccess' })
        yield put({ type: 'query' })
      } else {
        yield put({ type: 'modalErrorState' });

      }
    },
    *remove({ id }, { call, put }) {
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
    *removeIds({ }, { select, call, put }) {
      const ids = yield select(state => state.menus.selectedRowKeys);
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
    *update({ args }, { select, call, put }) {
      yield put({ type: 'modalLoadingState', data: true });
      const record = yield select(state => state.menus.record)
      const data = yield call(update, Object.assign(args, { id: record.id }));
      if (data === 'success') {
        yield put({ type: 'createSuccess' })
        yield put({ type: 'query' })
      } else {
        yield put({ type: 'modalErrorState' });
      }
    },
    *clearMenu({ }, { put }) {
      yield put({ type: 'queryMenuSuccess', data: [] })
      yield put({ type: 'queryTreeSuccess', data: [] })
      yield put({ type: 'queryMenuLeafSuccess', data: null })
    }
  },

  reducers: {
    queryAddTreeSuccess(state, action) {
      return { ...state, addTree: action.data }
    },
    queryMenuSuccess(state, action) {
      return { ...state, menuTree: action.data }
    },
    queryMenuLeafSuccess(state, action) {
      return { ...state, menuLeaf: action.data }
    },
    queryTreeSuccess(state, action) {
      return { ...state, dataTree: action.data }
    },
    querySuccess(state, action) {
      const { totalCount, pageNo, list } = action.data
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
      const { name, value } = action.data;
      const { searchQuery } = state;
      const newState = {};
      newState[name] = value;
      const newsearchQuery = Object.assign({}, searchQuery, newState)
      return { ...state, searchQuery: newsearchQuery }
    },
    menuLevelDisabledState(state, action) {
      return { ...state, menuLevelDisabled: action.data }
    }
  }


}
