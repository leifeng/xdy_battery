import { query, create, update, remove } from '../services/batteryTakeMG'
import { parse } from 'qs'

export default {

  namespace: 'batteryTakeMG',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      // transferId: 123,
      // recycleId: 123,
      // createTime: '2016-11-7',
      // status: 1,
      // companyId: 123,
      // toAddress: 'ABC',
      // confirmTime: '2016-11-7',
      // confirmMan: 'ABC',
      // transferMan: 'ABC',
      // toTime: '2016-11-7',
      // reportCard: 'ABC',
      // reportDan: 'ABC'
      transferId: 'KS762486',
      recycleId: 'WQ21457',
      recycleCompanyId: '37854',
      createTime: '2016-11-7',
      status: '知豆确认，提醒',
      companyId: 65213,
      toAddress: '北京五道口',
      transferMan: '李四',
      transferPhone: 13519235816,
      toTime: '2016-11-7',
      tackMan: '张三',
      tackPhone: '18516234518',
      reportCard: 'ABC',
      reportDan: '王明',
      confirmTime: '2016-11-7',
      confirmMan: 'ABC',
      remak: '退役电池提货单管理'
    }],
    record: null
  },
  subscriptions: {
    // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/batteryRec/batteryTakeMG') {
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
      const pageSize = yield select(state => state.batteryTakeMG.pageSize)
      const current = yield select(state => state.batteryTakeMG.current)
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
