import { query, create, update, remove } from '../services/batteryRecNoticeMG'
import { parse } from 'qs'

export default {

  namespace: 'batteryRecNoticeMG',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      // batsId: 'ABC',
      // batId: 'ABC',
      // execStatus: 123,
      // replaceBatsId: 123,
      // replaceBatId: 123,
      // execContent: 'ABC',
      // execCompany: 'ABC',
      // execTime: '2016-11-7',
      // execAddress: 'ABC',
      // execMan: 'ABC',
      // remark: 'ABC'
      id: 632,
      replaceId: 234,
      noticeTime: '2016-11-14',
      companyId: '回收管理点',
      company: '知豆公司',
      companyPhone: '13578951245',
      status: '通知',
      sureTime: '2016-11-14',
      sureMan: '李四',
      invalidTime: '2016-11-14',
      createTime: '2016-11-14',
	  remark:'更换电池通知单管理'
    }],
    record: null
  },
  subscriptions: {
    // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/batteryRec/batteryRecNoticeMG') {
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
      const pageSize = yield select(state => state.batteryRecNoticeMG.pageSize)
      const current = yield select(state => state.batteryRecNoticeMG.current)
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
