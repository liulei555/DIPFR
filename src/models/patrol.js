/**
 * 巡逻配置
 */
import { message } from 'antd';
import * as videoSerice from '../services/video';

export default {
  namespace: 'patrol',
  state: {
    patrolArr:[],
    patrolTeam:[],
  },

  subscriptions: {
  },

  effects: {
    *queryPatrol({ payload }, { call, put,select }){
      const res=yield call(videoSerice.queryPatrolAndScene,payload);
      // debugger
      if(res.success){
        yield put({type:'updateState',payload:{
          patrolArr:res.data
        }})
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
    queryCamera(state,{payload}){
      return{
        ...state,
        ...payload,
      }
    }
  },
};
