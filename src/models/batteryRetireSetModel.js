import { query, create, update, remove } from '../services/batteryRetireSet'
import { parse } from 'qs'

export default {

  namespace: 'batteryRetireSet',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
// batsId:123,
// batId:123,
// vin:'LU123465487',
// recycleCompany:'AF',
// setTime:'2016-11-7',
// retireTime:'2016-11-7',
// retireStatus:'11',
// dealWay:'abc',
// usedCompany:'abc',
// temp1:'abc',
// temp2:'abc',
// temp3:'abc',
// temp4:'abc',
// status:1,
// remark:'abc',
// createTime:'2016-11-7',
// creator:'abc',
// checkTime:'2016-11-7',
// checkMan:'abc',
// checkRemark:'abc',
// editTime:'2016-11-7',
// editor:'abc',
// editRemark:'abc'
id:252,
batKind:'三元锂',
defineClass:'一级',
days:2,
batStatus:'电池采购、入库',
voltage:'25',
capacity:'100',
cycleNum:10,
status:'可用',
createTime:'2016-11-14',
creator:'李四',
editTime:'2016-11-14',
deiTor:'张三',
remark:'电池设定处理'

    }],
    record: null
  },
  subscriptions: {
    // setup({dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/admin/batterySet/batteryRetireSet') {
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
      const pageSize = yield select(state => state.batteryRetireSet.pageSize)
      const current = yield select(state => state.batteryRetireSet.current)
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
