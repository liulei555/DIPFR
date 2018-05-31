export default {
  namespace: 'actionMap',
  state: {
    mapInfo: {
      lng: 180.0,
      lat: 90.0,
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
