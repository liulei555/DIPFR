export default {

  namespace: 'taskMonitor',
  state: {
    visible: false,
    treeSelectData: []
  },
  subscriptions:{

  },
  effects: {

  },
  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload };
    },
  }
}
