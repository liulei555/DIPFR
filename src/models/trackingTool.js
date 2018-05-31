/**
 * 智能追踪工具
 */
import {
  queryTrackingTask,
  deleteTrackingTask,
  queryPointInfo,
  updateVideoSearchTask,
  insertTrackingTask,
} from '../services/trackingTool';
import { basicPage10 } from '../routes/Intelligent/EnumVideo';
import { message } from 'antd';

const handleResult = (data = []) => {
  return data.map((item) => {
    let child = item.taskList.map((o) => {
      return { ...o, rowKey: o.taskNumber, rowName: o.videoName };
    });
    return { ...item, taskList: child, rowKey: item.trackNumber, rowName: item.trackName };
  });
};

export default {
  namespace: 'trackingTool',

  state: {
    searchForm: {
      trackName: null,
      startTime: null,
      endTime: null,
      taskStatus: null,
    },
    taskList: [],
    pagination: {
      showQuickJumper: true,
      showTotal: total => `总共 ${total} 条数据`,
      current: 1,
      pageSize: 10,
      total: 0,
    },
    pointVisible: false,
    pointDetail: {},
    taskVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/video/trackingTool') {
          dispatch({
            type: 'queryTask', payload: basicPage10,
          });
        }
      });
    },
  },

  effects: {

    * queryTask({ payload }, { call, put, select }) {
      const { pagination } = yield select(_ => _.trackingTool);
      const res = yield call(queryTrackingTask, payload);

      if (res && res.status === '1') {
        yield put({
          type: 'updateState',
          payload: {
            searchForm: {
              trackName: payload.trackName || null,
              startTime: payload.startTime || null,
              endTime: payload.endTime || null,
              taskStatus: payload.taskStatus || null,
            },
            taskList: handleResult(res.data),
            pagination: {
              ...pagination,
              current: Number(payload.pageNum) || 1,
              total: res.total,
            },
            taskVisible: false,
          },
        });
      }
    },

    * deleteTask({ payload }, { call, put, select }) {
      const { searchForm } = yield select(_ => _.trackingTool);
      const res = yield call(deleteTrackingTask, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryTask',
          payload: {
            ...searchForm,
            ...basicPage10,
          },
        });
      } else {
        message.error((res && res.message) || '删除失败');
      }
    },

    * updateVideo({ payload }, { call, put }) {
      const res = yield call(updateVideoSearchTask, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryTask',
          payload: basicPage10,
        });
      } else {
        message.error((res && res.message) || '更新失败');
      }
    },

    * insertTask({ payload }, { call, put, select }) {
      const { searchForm } = yield select(_ => _.trackingTool);
      const res = yield call(insertTrackingTask, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryTask',
          payload: {
            ...searchForm,
            ...basicPage10,
          },
        });
      } else {
        message.error((res && res.message) || '创建失败');
      }
    },

    * queryPointInfo({ payload }, { call, put }) {
      const res = yield call(queryPointInfo, {deviceNumber: "310118034004"});

      if (res && res.status === '1' && res.data !== 0) {
        yield put({
          type: 'updateState',
          payload: {
            pointDetail: res.data,
            pointVisible: true,
          },
        });
      } else {
        message.error((res && res.message) || '查询点位信息失败');
      }
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
