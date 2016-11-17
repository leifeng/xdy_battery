import { query, create, update, remove } from '../services/rolesAuthMG'
import { parse } from 'qs'

export default {

  namespace: 'rolesAuthMG',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      roleId: '角色1',
      functionId: '功能1',
      rightIds: '权限1',
      status: '可用',
      createTime: '2016-11-4',
      creator: 'test',
      editTime: '2016-11-4',
      editor: 'test',
      remark: '角色权限'

    },
    {
      roleId: '角色2',
      functionId: '功能2',
      rightIds: '权限2',
      status: '可用',
      createTime: '2016-11-4',
      creator: 'test',
      editTime: '2016-11-4',
      editor: 'test',
      remark: '角色权限'

    }],
    record: null

  },
  subscriptions: {
   // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/sys/rolesAuthMG') {
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
      const pageSize = yield select(state => state.rolesAuthMG.pageSize)
      const current = yield select(state => state.rolesAuthMG.current)
      const params = { current, pageSize,...args }
      const {data} = yield call(query, parse(params));
      if (data.success) {
        yield put({
          type: 'querySuccess',
          data
        })
      }
    },
    *create() { },
    *remove({id}, {call, put}) {
      yield put({ type: 'loadingState', data: true });
      const {data} = yield call(remove, { id })
      if (data && data.success) {
        yield put({
          type: 'deleteSuccess',
          id
        })
      }
    },
    *update() { },
  },

  reducers: {
    querySuccess(state, action) {
      const {page, data} = action.data
      return {...state, data: data, total: page.total, current: page.current, loading: false }
    },
    deleteSuccess(state, action) {
      const id = action.id;
      const newList = state.data.filter(item => item.id !== id);
      return {...state, data: newList, loading: false }
    },
    pageSizeState(state, action) {
      return {...state, pageSize: action.data }
    },
    loadingState(state, action) {
      return {...state, loading: action.data }
    },
    selectedRowKeysState(state, action) {
      return {...state, selectedRowKeys: action.data }
    },
    visibleState(state, action) {
      const { visible, modalType } = action.data;
      return {...state, visible, modalType }
    },
    recordState(state, action) {
      const { record, modalType } = action.data;
      return {...state, record, modalType, visible: true }
    }
  },

}
