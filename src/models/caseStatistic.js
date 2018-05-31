import { } from '../services/dataStatistic';

export default {
  namespace: 'caseStatistic',

  state: {
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      // const response = yield call(fakeChartData);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
      };
    },
  },
};
