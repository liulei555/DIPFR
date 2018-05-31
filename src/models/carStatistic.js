import {queryBayonetVehicleCount, queryBayonetVehicleList, queryVehicleTotalStatistics} from '../services/dataStatistic';

export default {
  namespace: 'carStatistic',

  state: {
    loading: false,
    bayonetVehicleCount: null,
    bayonetVehicleList:{},
    vehicleTotalStatistics: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/dataStatistic/carStatistic') {
          const payload = location.query || { pageNum: '1', pageSize: '10' };
          dispatch({ type: 'queryBayonetVehicleCount'});
          dispatch({ type: 'queryBayonetVehicleList', payload});
          dispatch({ type: 'queryVehicleTotalStatistics'});
        }
      });
    },
  },

  effects: {
    *queryBayonetVehicleCount({ payload = {} }, { call, put }) {
      const res = yield call(queryBayonetVehicleCount, payload);
      if (res.data) {
        yield put({
          type: 'updateState',
          payload: {
            bayonetVehicleCount: res.data,
          },
        });
      }
    },
    *queryBayonetVehicleList ({ payload = {} }, { call, put }) {
      const res = yield call(queryBayonetVehicleList, payload);
      if (res.data) {
        yield put({
          type: 'updateState',
          payload: {
            bayonetVehicleList: res,
          },
        });
      }
    },
    *queryVehicleTotalStatistics ({ payload = {} }, { call, put }) {
      const res = yield call(queryVehicleTotalStatistics, payload);
      if (res.data) {
        yield put({
          type: 'updateState',
          payload: {
            vehicleTotalStatistics: res.data,
          },
        });
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
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
