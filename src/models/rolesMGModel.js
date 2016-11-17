import { query, create, update, remove, removes } from '../services/rolesMG'
import { parse } from 'qs'

export default {

  namespace: 'rolesMG',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      name: '角色1',
      status: '可用',
      remark: '角色管理'
    },
    {
      name: '角色2',
      status: '不可用',
      remark: '角色管理'
    }],
    record: null

  },
  subscriptions: {
    // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/sys/rolesMG') {
    //       console.log('subscriptions')
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
      const pageSize = yield select(state => state.rolesMG.pageSize)
      const current = yield select(state => state.rolesMG.current)
      const params = { current, pageSize,...args }
      const {data} = yield call(query, parse(params));
      if (data.success) {
        yield put({
          type: 'querySuccess',
          data
        })
      }
    },
    *create({args}, { call, put}) {
      const {data} = yield call(create, parse(args))
      if (data.success) {
        yield put({
          type: 'createSuccess',
          data
        })
      }
    },
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
    *removeForids({ids}, {call, put}) {
      console.log(ids)
      yield put({ type: 'loadingState', data: true });
      const {data} = yield call(removes, { ids })
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          data
        })
      }
    },
    *update({args}, {select, call, put}) {
      const record = yield select(state => state.rolesMG.record)
      const params = {...args, id: record.id }
      const {data} = yield call(update, { data: params })
      if (data.success) {
        yield put({
          type: 'updateSuccess',
          data
        })
      }
    },
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
    createSuccess(state, action) {
      const {page, data} = action.data
      return {...state, data: data, total: page.total, current: page.current, visible: false }
    },
    updateSuccess(state, action) {
      const { data} = action.data
      return {...state, data: data, visible: false }
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
