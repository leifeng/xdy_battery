import { query, create, update, remove } from '../services/batteryBasicInfo'
import { parse } from 'qs'

export default {

  namespace: 'batteryBasicInfo',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      id:123,
      batsCode: 'ABC',
      sysCode: 'ABC',
      batsSpecCode: 'ABC',
      batType: '单体',
      batNum: 123,
      batKind: '三元锂',
      batsModel: 'ABC',
      materielId: 'ABC',
      supplierId: 'ABC',
      supplier: 'ABC',
      supplierPhone: 'ABC',
      totalModel: 'ABC',
      quality: 'ABC',
      capacity: 'ABC',
      voltage: 'ABC',
      carType: 'ABC',
      cycleNum: 3,
      produceTime: '2016-11-7',
      produceAddress: 'ABC',
      createTime: '2016-11-7',
      remark: 'ABC'
    }],
    record: null
  },
  subscriptions: {
    // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/batteryBasic/batteryBasicInfo') {
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
      const pageSize = yield select(state => state.batteryBasicInfo.pageSize)
      const current = yield select(state => state.batteryBasicInfo.current)
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
