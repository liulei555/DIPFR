/**
 * 地图
 */
import { message } from 'antd';
import { queryDevice, queryAreaVid, queryTree } from '../services/areaDevice';
import { queryMapDevice } from '../services/gis';
import {arrayToTree, groupBy} from '../utils/utils'
import session from "../utils/saveStorage/sessionStorage";

export default {
  namespace: 'gisMap',

  state: {
    showMapModel: false,
    mapSelectCameraData: [],
    selectCameraData: [],
    clickFinish:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/video/geographicInfo') {

        }
      });
    },
  },

  effects: {
    *queryTree({ payload = {} }, { call, put }) {

    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
