import { query, create, update, remove } from '../services/batteryRecAccountsMG'
import { parse } from 'qs'

export default {

  namespace: 'batteryRecAccountsMG',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      id: 632,
      statementsId: 562,
      companyId: 3452,
      recycleFee: 100,
      commission: 20,
      createTime: '2016-11-11',
      status: '回收管理点确认，结束',
      confirmTime: '2016-11-14',
      confirmMan: '李四',
      payTime: '2016-11-13',
      payMan: '张三',
      confirmPayTime: '2016-11-14',
      confirmPayMan: '张明',
      remak: '月度结算'
    }],
    record: null
  },
  subscriptions: {
    setup({dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/batteryRec/batteryRecAccountsMG') {
          dispatch({
            type: 'query',
            args: {
              current: 1
            }
          })
        }
      })
    },
  },

  effects: {
    *query({args}, {select, call, put}) {
      yield put({ type: 'loadingState', data: true });
      const pageSize = yield select(state => state.batteryRecAccountsMG.pageSize)
      const current = yield select(state => state.batteryRecAccountsMG.current)
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
