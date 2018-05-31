/**
 * 视频浓缩摘要
 */
import {
  queryVideoTask,
  updateVideoSearchTask,
  insertVideoSearchTask,
} from '../services/videoRetrieval';
import { basicPage10 } from '../routes/Intelligent/EnumVideo';
import { queryAreaVid } from '../services/areaDevice';
import { message } from 'antd';

const newGuid = () => {
  let guid = '';
  for (let i = 1; i <= 32; i++) {
    guid += Math.floor(Math.random() * 16.0).toString(16);
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20))
      guid += '-';
  }
  return guid;
};

const handleResult = (data) => {
  let res = [];
  for (let task of Object.keys(data)) {
    let points = [];
    for (let point of Object.keys(data[task])) {
      let child = data[task][point];
      child.forEach((o) => {
        o.rowKey = newGuid();
      });
      points.push({ rowKey: newGuid(), videoName: point, children: child });
    }
    res.push({ rowKey: newGuid(), videoName: task, children: points });
  }
  return res;
};

export default {
  namespace: 'videoRetrieval',

  state: {
    searchForm: {
      videoName: null,
      taskStatus: null,
      videoStartTime: null,
      videoEndTime: null,
    },
    selectedPoints: [],
    taskList: [],
    pagination: {
      showQuickJumper: true,
      showTotal: total => `总共 ${total} 条数据`,
      current: 1,
      pageSize: 10,
      total: 0,
    },
    taskVisible: false,
    videoVisible: false,
    videoDetail: {},
    treeData: [],
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/video/videoRetrieval') {
          dispatch({
            type: 'queryTask', payload: basicPage10,
          });
        }
      });
    },
  },

  effects: {

    * queryTask({ payload }, { call, put, select }) {
      const { pagination } = yield select(_ => _.videoRetrieval);
      const res = yield call(queryVideoTask, payload);

      if (res && res.status === '1') {
        yield put({
          type: 'updateState',
          payload: {
            searchForm: {
              videoName: payload.videoName || null,
              taskStatus: payload.taskStatus || null,
              videoStartTime: payload.videoStartTime || null,
              videoEndTime: payload.videoEndTime || null,
            },
            taskList: handleResult(res.data),
            pagination: {
              ...pagination,
              current: Number(payload.pageNum) || 1,
              total: res.total,
            },
            videoDetail: {},
            taskVisible: false,
          },
        });
      }
    },

    * updateVideo({ payload }, { call, put, select }) {
      const { searchForm } = yield select(_ => _.videoRetrieval);
      const res = yield call(updateVideoSearchTask, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryTask',
          payload: {
            ...searchForm,
            ...basicPage10,
          },
        });
      } else {
        message.error((res && res.message) || '更新失败');
      }
    },

    * insertVideo({ payload }, { call, put, select }) {
      const { searchForm } = yield select(_ => _.videoRetrieval);
      const res = yield call(insertVideoSearchTask, payload);

      if (res && res.data && res.data !== 0) {
        yield put({
          type: 'queryTask',
          payload: {
            ...searchForm,
            ...basicPage10,
          },
        });
      } else {
        message.error((res && res.message) || '添加失败');
      }
    },

    * queryTree({ payload = {} }, { call, put }) {
      const { resolve } = payload;
      const data = yield call(queryAreaVid, payload);

      if (data.status === '1') {
        if (payload.areaId === 'root') {
          let _data = [...data.data.area, ...data.data.device];
          _data.forEach(item => {
            if (!item.deviceNumber) {
              item['disabled'] = true;
            }
          });
          yield put({
            type: 'updateState',
            payload: {
              treeData: _data,
            },
          });
        } else {
          let _data = [...data.data.area, ...data.data.device];
          _data.forEach(item => {
            if (!item.countTotal) {
              item['isLeaf'] = true;
            }
            if (!item.deviceNumber) {
              item['disabled'] = true;
            }
          });
          !!resolve && resolve(_data);
        }
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
