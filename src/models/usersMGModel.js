import { query, created, update, remove, removeIds, resetPwd } from '../services/usersMG'
import { queryByUserId, query as roleQuery, setBindRole } from '../services/rolesMG'

export default {

  namespace: 'usersMG',

  state: {
    editPwdLoading: false,
    editPwdVisible: false,
    modalRolesVisible: false,
    selectedRowKeys: [],
    loading: false,
    visible: false,
    modalLoading: false,
    pageNo: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [],
    record: null,
    alertState: false,
    searchQuery: null,
    rolesbyUser: [],
    roles: [],
    userId: '',
    linkField: null
  },
  subscriptions: {
    setup({dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/sys/usersMG') {
          dispatch({
            type: 'query',
            args: {
              pageSize: 10,
              pageNo: 1,
              isPaging: true
            }
          });
          dispatch({
            type: 'queryAllRoles'
          });
          dispatch({
            type: 'companylist/queryAll'
          })
        }
      })
    },
  },

  effects: {
    *query({args}, {select, call, put}) {
      yield put({ type: 'loadingState', data: true });
      const searchQuery = yield select(state => state.usersMG.searchQuery)
      const {data} = yield call(query, Object.assign({}, args, searchQuery, { isPaging: true, pageSize: 10 }));
      if (data) {
        yield put({
          type: 'querySuccess',
          data
        })
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
            pageSize: 10,
            pageNo: 1,
            isPaging: true
          }
        })

      }
    },
    *update({args}, {select, call, put}) {
      yield put({ type: 'modalLoadingState', data: true });
      const record = yield select(state => state.usersMG.record)
      const data = yield call(update, Object.assign(args, { id: record.id }));
      if (data === 'success') {
        yield put({ type: 'createSuccess' })
        yield put({ type: 'query' })
      } else {
        yield put({ type: 'modalErrorState' });
      }
    },
    *updatePwd({args}, {select, call, put}) {
      yield put({ type: 'editPwdLoadingState', data: true })
      const userId = yield select(state => state.usersMG.userId)
      const data = yield call(resetPwd, { userId: userId, password: args });
      if (data === 'success') {
        yield put({ type: 'editPwdLoadingState', data: false })
        yield put({ type: 'editPwdVisibleState', data: false })
      }
    },
    *removeIds({}, {select, call, put}) {
      const ids = yield select(state => state.usersMG.selectedRowKeys);
      const data = yield call(removeIds, ids);
      if (data === 'success') {
        yield put({
          type: 'query',
          args: {
            pageSize: 10,
            pageNo: 1,
            isPaging: true
          }
        })
      }
    },
    *queryAllRoles({}, {call, put}) {
      const {data} = yield call(roleQuery, { isPaging: false, status: 1 })
      if (data && data.list) {
        yield put({ type: 'rolesState', data: data.list })
      }
    },
    *queryRoleByUserid({id}, {call, put}) {
      yield put({ type: 'userIdState', data: id })
      const {data} = yield call(queryByUserId, id);
      if (data) {
        yield put({ type: 'rolesbyUserState', data })
        yield put({ type: 'modalRolesState', data: true });
      }
    },
    *updateRoleByUser({}, {call, select, put}) {
      const userId = yield select(state => state.usersMG.userId);
      const roleIds = yield select(state => state.usersMG.rolesbyUser)
      const data = yield call(setBindRole, { userId, roleIds });
      if (data === 'success') {
        yield put({ type: 'modalRolesState', data: false });
      }
    }
  },

  reducers: {
    querySuccess(state, action) {
      const {totalCount, pageNo, list} = action.data
      return { ...state, data: list, total: totalCount, pageNo: pageNo, loading: false }
    },
    createSuccess(state, action) {
      return { ...state, visible: false, modalLoading: false, editPwdVisible: false }
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
    modalRolesState(state, action) {
      if (action.data === false) {
        return { ...state, rolesbyUser: [], modalRolesVisible: action.data }
      }
      return { ...state, modalRolesVisible: action.data }
    },
    rolesState(state, action) {
      return { ...state, roles: action.data }
    },
    rolesbyUserState(state, action) {
      return { ...state, rolesbyUser: action.data }
    },
    userIdState(state, action) {
      return { ...state, userId: action.data }
    },
    editPwdVisibleState(state, action) {
      return { ...state, editPwdVisible: action.data }
    },
    editPwdLoadingState(state, action) {
      return { ...state, editPwdLoading: action.data }
    },
    linkFieldState(state, action) {
      return { ...state, linkField: action.data }
    }
  }

}
