


export default {
  namespace: 'bench',
  state: {
    displayWay:''
  },
  effects: {},
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
