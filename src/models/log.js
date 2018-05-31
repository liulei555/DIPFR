/**
 * 行政设备关系
 */
import { message } from 'antd';
import { query } from '../services/log';


export default {
  namespace: 'log',

  state: {
    treeData: [],
    confirmLoading: false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      pageNum: 1,
      total: 0,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/systemOperation/log') {
          const payload = location.query || { pageNum: '1', pageSize: '10' };
          dispatch({ type: 'query', payload });
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put,select }) {
      const {startTime,endTime} = yield select(_ => _.log)
      const payload1 = {
        userName:payload.userName?payload.userName:'',
        logType:payload.logType?payload.logType:'',
        ip:payload.ip?payload.ip:'',
        startTime:startTime?startTime:'',
        endTime:startTime?endTime:'',
        pageNum:payload.pageNum?payload.pageNum:'',
        pageSize:payload.pageSize?payload.pageSize:'',
      }
      console.log(payload1)
      const data = yield call(query, payload1);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            dataSource: data.data,
            pagination:{
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
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
    querySuccess(state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },
};
