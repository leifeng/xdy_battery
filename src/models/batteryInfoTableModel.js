import { query, create, update, remove } from '../services/batteryInfoTable'
import { parse } from 'qs'

export default {

  namespace: 'batteryInfoTable',

  state: {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    current: 1,
    pageSize: 10,
    total: 0,
    modalType: '',
    data: [{
      // id: 'w3swefsdf',
      // execStatus: 'dddd',
      // status: 1,
      // companyId: 111,
      // dueDate: 2016 - 11 - 4,
      // lastLoginTime: 2016 - 11 - 4,
      // lastLoginIp: '192.168.11.1',
      // createTime: 2016 - 11 - 4,
      // creator: 'test',
      // editTime: 2016 - 11 - 4,
      // editor: 'test',
      // remark: 'dssdfdsf'
      id: 7562,
      batType: '包',
      batCode: '5123456',
      batKind: '三元锂',
      vin: 'LU5678913489546',
      productTime: '2016-01-10',
      productAddress: '兰州',
      productCompany: '知豆公司',
      productPhone: 13568492246,
      bmsCode: '012456789249879464985201605',
      supplierId: '23546',
      supplier: 'ABC',
      supplierPhone: 15930264581,
      carKind: '租赁',
      carType: '2016D2S',
      quality: '优质',
      color: '红色',
      sellerId: '563268',
      seller: '张三',
      sellerAddress: '北京丰台',
      sellerPhone: 13425681452,
      sellTime: '2016-01-20',
      sellProvince: '北京市',
      sellCity: '北京',
      master: '李四',
      masterPhone: '15923259925',
      masterAddress: '北京昌平',
      carPlate: '京RQ8888',
      licensingTime: '2016-02-20',
      cardType: '二代身份证',
      cardId: '13068218802215',
      businessLicence: 'QE5678',
      createTime: '2016-01-01',
      remak: '电池进销'
      // },
      // {
      //   id: '11',
      //   execStatus: 'dddd',
      //   status: 1,
      //   companyId: 111,
      //   dueDate: 2016 - 11 - 4,
      //   lastLoginTime: 2016 - 11 - 4,
      //   lastLoginIp: '192.168.11.1',
      //   createTime: 2016 - 11 - 4,
      //   creator: 'test',
      //   editTime: 2016 - 11 - 4,
      //   editor: 'test',
      //   remark: 'dssdfdsf'
    }],
    record: null
  },
  subscriptions: {
    setup({dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/batteryRec/batteryInfoTable') {
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
      const pageSize = yield select(state => state.batteryInfoTable.pageSize)
      const current = yield select(state => state.batteryInfoTable.current)
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
