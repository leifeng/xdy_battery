import { query, create, update, remove } from '../services/batteryRecoveryPointMG'
import { parse } from 'qs'

export default {

  namespace: 'batteryRecoveryPointMG',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      province: '北京',
      city: '北京市',
      company: '智信中心',
      nickName: '智信',
      Company_type: '知豆公司',
      address: '北京市五道口',
      longitude: 168.000,
      latitude: 36.000,
      linkMan: '李四',
      linkPhone: 13500000555,
      dealMan: '张三',
      dealPhone: 15023561478,
      maxValue: 100,
      status: 0
    }],
    record: null
  },
  subscriptions: {
    // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/batterySet/batteryRecoveryPointMG') {
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
      const pageSize = yield select(state => state.batteryRecoveryPointMG.pageSize)
      const current = yield select(state => state.batteryRecoveryPointMG.current)
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
