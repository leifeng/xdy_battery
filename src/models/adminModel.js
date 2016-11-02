
export default {

  namespace: 'admin',

  state: {
    visible: false,
    url: '',
    openKeys: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      const arr = ['sys', 'batteryBasic', 'batterySet', 'batteryRec', 'report'];
      const openKeys = arr.filter((item, i) => {
        return location.pathname.indexOf(item) > 0
      });
      dispatch({
        type: 'urlState',
        data: {
          url: location.pathname,
          openKeys: openKeys
        }
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
      const {url, openKeys} = action.data
      return {...state, url, openKeys }
    }
  },

}
