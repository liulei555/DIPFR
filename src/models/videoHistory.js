
export default {

  namespace: 'videoHistory',
  state: {
    visible: false,
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
