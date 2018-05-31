/**
 * 巡逻组配置
 */
import { message } from 'antd';
import {
  queryPatrol,
  create,
  update,
  removePatrol,
  queryPatrolByYABH,
  queryPlanGrepPlan,
  insertPlanRelation,
  deletePlanRelation,
  updatePlanRelationOrder,
} from '../services/patrolConf';


export default {
  namespace: 'patrolGroupConf',
  state: {
    list: [],
    modalType: 'create',
    modalVisible: false,
    patrolModalVisible: false,
    editable: false,
    pagination1: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
    },
    pagination2: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
    },
    pagination3: {
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
        if (location.pathname === '/systemAdmin/patrolGroupConf') {
          //const payload = location.query || { current: 1, pageSize: 10 };
          dispatch({
            type: 'query',
            payload: {
              pageNum: '1',
              pageSize: '10',
              yalx: '3',
            },
          });
        }
      });
    },
  },

  effects: {
    * query({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          selectedRowKeys: [],
          patrol: {},
        },
      });

      const data = yield call(queryPatrol, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            pagination1: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
              showSizeChanger: true,
              showQuickJumper: true,
            },
            list: data.data
          }
        });
      }
    },
    * queryPatrolByYABH({ payload }, { call, put, select }) {
      const data = yield call(queryPatrolByYABH, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            pagination2: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
              showSizeChanger: true,
              showQuickJumper: true,
            },
            patrolList: data.data,
          },
        });
      }
    },
    * queryPatrol({ payload }, { call, put, select }) {
      const data = yield call(queryPlanGrepPlan, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            pagination3: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
              showSizeChanger: true,
              showQuickJumper: true,
            },
            patrols: data.data,
          },
        });
      }
    },
    * create({ payload }, { call, put, select }) {
      const data = yield call(create, payload);
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '3',
          },
        });
        yield put({
          type: 'hideModal',
        });
      }
    },
    * update({ payload }, { call, put, select }) {
      const { selectedRowKeys } = yield select(_ => _.patrolGroupConf);
      payload.xh = selectedRowKeys[0];
      const data = yield call(update, payload);
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '3',
          },
        });
        yield put({
          type: 'hideModal',
        });
      }
    },
    * remove({ payload }, { call, put, select }) {
      const data = yield call(removePatrol, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: [],
          },
        });
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '3',
          },
        });
        message.success('删除成功');
      }
    },
    * insertPlanRelation({ payload }, { call, put, select }) {
      console.log(payload);
      const data = yield call(insertPlanRelation, payload);
      const { patrolGroup } = yield select(_ => _.patrolGroupConf);
      if (data.success) {
        yield put({
          type: 'queryPatrolByYABH',
          payload: {
            yabh: patrolGroup.yabh,
            pageNum: '1',
            pageSize: '10',
          },
        });
        yield put({
          type: 'hidePatrolModal',
        });
      }
    },
    * deletePlanRelation({ payload }, { call, put, select }) {
      const data = yield call(deletePlanRelation, payload);
      const { patrolGroup } = yield select(_ => _.patrolGroupConf);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys1: [],
          },
        });
        yield put({
          type: 'queryPatrolByYABH',
          payload: {
            yabh: patrolGroup.yabh,
            pageNum: '1',
            pageSize: '10',
          },
        });
        message.success('删除成功');
      }
    },
    * updatePlanRelationOrder({ payload }, { call, put }) {
      const data = yield call(updatePlanRelationOrder, payload.params1);
      if (data.success) {
        yield put({
          type: 'queryPatrolByYABH',
          payload: {
            yabh: payload.yabh,
            pageNum: '1',
            pageSize: '10',
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            editable: false,
          },
        });
        message.success('更新成功');
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
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    }
    ,
    hideModal(state) {
      return { ...state, modalVisible: false };
    }
    ,
    showPatrolModal(state, { payload }) {
      return { ...state, ...payload, patrolModalVisible: true };
    }
    ,
    hidePatrolModal(state, { payload }) {
      return { ...state, ...payload, patrolModalVisible: false };
    }
    ,
  },
};
