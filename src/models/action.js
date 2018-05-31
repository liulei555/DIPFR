export default {
  namespace: 'action',
  state: {
    mapInfo: {
      lng: 116.397983,
      lat: 40.356845,
    },
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
