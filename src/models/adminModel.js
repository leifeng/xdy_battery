
export default {

  namespace: 'admin',

  state: {
    visible: false,
    url: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'urlState',
        url: location.pathname
      })
    },
  },

  effects: {
    *logout({ call, put}) {

    }
  },

  reducers: {
    visibleChange(state, action) {
      return {...state, visible: action.payload }
    },
    urlState(state, action) {
      return {...state, url: action.url }
    }
  },

}
