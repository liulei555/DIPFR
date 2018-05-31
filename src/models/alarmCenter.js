export default {
  namespace: 'alarmCenter',
  state: {
    alarmData: [],
    faceModalVisible: false,
    carModalVisible: false,
    mobileModalVisible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {

      });
    },
  },
  effects: {},

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
