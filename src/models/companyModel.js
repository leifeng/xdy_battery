import { query } from '../services/enterpriseMG'

export default {

  namespace: 'companylist',

  state: {
    companyAllData: []
  },

  subscriptions: {

  },

  effects: {
    *queryAll({}, {select, call, put}) {
      const {data} = yield call(query, { isPaging: false, status: 1 });
      if (data) {
        const result = []
        for (const {id, company, companyType} of data.list) {
          result.push({ name: company, value: id, filter: companyType })
        }
        yield put({
          type: 'querySuccess',
          data: result
        })
      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, companyAllData: action.data }
    },
  },

}
