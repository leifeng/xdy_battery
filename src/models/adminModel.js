
export default {

  namespace: 'admin',

  state: {
    visible: false,
    url: '/admin/sys/usersMG',
    openKeys: ['sys']
  },

  subscriptions: {
    setup({ dispatch, history }) {
      const pathname = location.pathname;
      dispatch({
        type: 'dictionary/queryAll'
      })
      dispatch({
        type: 'urlState',
        data: {
          url: pathname,
          openKeys: [].concat(pathname.split('/')[2])
        }
      })
    },
  },

  effects: {

  },

  reducers: {
    visibleChange(state, action) {
      return { ...state, visible: action.payload }
    },
    urlState(state, action) {
      const {url, openKeys} = action.data
      return { ...state, url, openKeys }
    }
  },

}
