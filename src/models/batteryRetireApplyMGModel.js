import { query, create, update, remove } from '../services/batteryRetireApplyMG'
import { parse } from 'qs'

export default {

  namespace: 'batteryRetireApplyMG',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      id: 653,
      listId: '8456',
      batsCode: '58464565',
      checkTime: '2016-11-14',
      checkMan: '李四',
      capacity: 100,
      voltage: 20,
      retireStatus: '容量20%以下',
      junkClass: '一级',
      checkFile: 'a',
      checkPic: 'b',
      codePic: 'c',
      dealWay: '再生处理',
      dealCompanyId: '54556',
      remark: '电池退役申请',
      useDays: 1000,
      companyId: 666,
      status: '已提交、通知',
      qcCheckTime: '2016-11-14',
      qcCheckMan: '李四',
      qcCheckRemark: '审核通过'
    }],
    record: null
  },
  subscriptions: {
    setup({dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/batteryRec/batteryRetireApplyMG') {
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
      const pageSize = yield select(state => state.batteryRetireApplyMG.pageSize)
      const current = yield select(state => state.batteryRetireApplyMG.current)
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
