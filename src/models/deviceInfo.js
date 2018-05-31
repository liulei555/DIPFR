/**
 * 行政设备关系
 */
import { message } from 'antd';
import { query,create} from '../services/deviceInfo';
import {getCurPowers}from '../utils/index'

import {queryAreaVid} from '../services/areaDevice';
import {arrayToTree, groupBy} from '../utils/utils'
import config from '../utils/config'
export default {
  namespace: 'deviceInfo',

  state: {
    treeData: [],
    confirmLoading: false,
    installationTime:'',
    verificationTime:'',
    affiliationVisible:false,
    disabledState:true,
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
        if (location.pathname === '/systemOperation/deviceInfo') {
          const payload = location.query || { pageNum: '1', pageSize: '10' };
          dispatch({ type: 'query', payload });
          //查找当前菜单的权限有哪些
          let curPowers = getCurPowers(config.systemRouter+location.pathname)
          console.log(curPowers)
          if(curPowers){
            dispatch({ type: 'updateState', payload: { curPowers } })
          }
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data);
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


    * queryTree({payload = {}}, {call, put}) {
      const {resolve} = payload;
      const data = yield call(queryAreaVid, payload);
      console.log('queryTreeDevice')
      console.log(data);
      if (data.status === '1') {
        /*yield put({
          type:'updateState',
          payload:{
            treeData: [...data.area],
          }
        })*/
        if (payload.areaId === 'root') {
          yield put({
            type: 'updateState',
            payload: {
              treeData: [...data.data.area,...data.data.device],
              // treeData: groupBy(data,'pid'),
              onSelect:(selectedKeys, info) => {
                console.log('onSelect', info);
              },
            },
          });
        } else {
          let _data = [...data.data.area,...data.data.device]
          _data.forEach(item => {
            if(!item.countTotal){
              item['isLeaf'] = true
            }
          })
          !!resolve && resolve(_data);
        }
      }
    },

    * update ({ payload }, { call, put,select }) {
      console.log(payload);
      const data = yield call(create, payload)
      const {resetFields} = yield select(_ => _.deviceInfo)
      console.log(resetFields);
      console.log(data);
      if(data.data === 1){
        yield put({
          type:'updateState',
          payload:{
            disabledState:true,
          }
        })
        yield put({
          type:'query',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        });

        message.success("保存成功！")
        resetFields
      }else{
        message.error("保存失败！")
      }
      resetFields
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
