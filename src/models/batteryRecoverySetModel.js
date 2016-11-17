import { query, create, update, remove } from '../services/batteryRecoverySet'
import { parse } from 'qs'

export default {

  namespace: 'batteryRecoverySet',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      // statementsId: 123,
      // recyclesId: 123,
      // recycleFee: 100,
      // transportUnit: 100,
      // status: 1,
      // createTime: '2016-11-7',
      // confirmTime: '2016-11-7',
      // confirmMan: '刘明',
      // financialConfirmTime: '2016-11-7',
      // financialConfirmMan: '刘明',
      // payConfirmTime: '2016-11-7',
      // payConfirmMan: '刘明'
      companyType: '回收管理点',
      companyId: 5635,
      batKind: '三元锂',
      feeName: '电池单体报价',
      feeValue: 30,
      status: '可用'



    }],
    record: null
  },
  subscriptions: {
    // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/batterySet/batteryRecoverySet') {
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
      const pageSize = yield select(state => state.batteryRecoverySet.pageSize)
      const current = yield select(state => state.batteryRecoverySet.current)
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
