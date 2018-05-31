/**
 * 行政设备关系
 */
import { message } from 'antd';
import { queryDevice, queryAreaAndDev, queryTree } from '../services/xingZhengSheBei';
import {arrayToTree, groupBy} from '../utils/utils'

export default {
  namespace: 'xingZhengSheBei',

  state: {
    treeData: [],
    confirmLoading: false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sheBei/xingZhengSheBei') {
          const payload = location.query || { pageNum: '1', pageSize: '10' };
          dispatch({ type: 'query', payload });
          dispatch({
            type: 'queryTree',
            payload: {
              areaId: 'root',
              userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
            },
          });
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryDevice, payload);
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
    *queryTree({ payload = {} }, { call, put }) {
      const {resolve} = payload;
      const data = yield call(queryAreaAndDev, payload);
      if (data) {
        if(payload.areaId === 'root'){
          yield put({
            type: 'updateState',
            payload: {
              treeData: [...data.area,...data.device],
              // treeData: groupBy(data,'pid'),
              onSelect:(selectedKeys, info) => {
                console.log('onSelect', info);
              },
            },
          });
        } else {
          let _data = [...data.area,...data.device]
          _data.forEach(item => {
            if(!item.countTotal){
              item['isLeaf'] = true
            }
          })
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
