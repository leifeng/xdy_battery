import { query } from '../services/batPackInfo'
import { queryNew } from '../services/index';
import {queryReportRecovery} from '../services/report'
export default {

  namespace: 'index',

  state: {
    bats: [],
    newData: [],
    chartData:[],
    newLoading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/admin/index') {
          dispatch({
            type: 'queryNews'
          })
          dispatch({
            type:'queryChart'
          })
        }
      })
    },
  },

  effects: {
    *queryBats({args}, {call, put}) {
      const {data} = yield call(query, { batsCode: args, isPaging: true, pageSize: 6 });
      if (data) {
        yield put({
          type: 'queryBatsSuccess',
          data: data.list
        })
      }
    },
    *queryNews({}, {call, put}) {
      yield put({ type: 'newLoadingState', data: true })
      const {data} = yield call(queryNew);
      if (data) {
        yield put({ type: 'queryNewsSuccess', data: data })
        yield put({ type: 'newLoadingState', data: false })
      }
    },
    *queryChart({},{call,put}){
      const d=new Date();
      const y=d.getFullYear()+'';
      const temp=d.getMonth()+1+'';
      const m=temp.length===2?temp:'0'+temp;
      const {data}=yield call(queryReportRecovery,{startTime:y+m,endTime:y+m});
      yield put({ type: 'queryChartSuccess', data })
    }

  },

  reducers: {
    queryBatsSuccess(state, action) {
      return { ...state, bats: action.data }
    },
    newLoadingState(state, action) {
      return { ...state, newLoading: action.data }
    },
    queryNewsSuccess(state, action) {
      return { ...state, newData: action.data }
    },
    queryChartSuccess(state,action){
      return { ...state, chartData: action.data }
    }
  },

}
