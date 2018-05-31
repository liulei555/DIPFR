/**
 * 行政设备关系
 */
import { message } from 'antd';
import {
  queryScene,
  addModalScene,
  create,
  update,
  deleteScene,
  createGroup,
  updateGroup,
  deleteModalScene,
  updatePlanRelationOrder,
} from '../services/configurationScene';
import { queryPatrolByYABH, queryPlanGrepPlan } from '../services/patrolConf';

export default {
  namespace: 'configurationGroupScene',

  state: {
    modalVisible: false,
    modalType: 'create',
    modalSceneVisible: false,
    editable: false,
    currentItem: {},
    treeData: [],
    array: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      pageNum: 1,
      total: 0,
    },
    pagination1: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      pageNum: 1,
      total: 0,
    },
    pagination2: {
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
        if (location.pathname === '/systemAdmin/configurationGroupScene') {
          const payload = location.query || { pageNum: '1', pageSize: '10', yalx: '5' };
          dispatch({ type: 'query', payload });
        }
      });
    },
  },

  effects: {
    * query({ payload = {} }, { call, put }) {//查询场景组配置
      yield put({
        type: 'updateState',
        payload: {
          selectedRowKeys: '',
        },
      });
      const data = yield call(queryScene, payload);
      console.log(data);
      if (data.status === '1') {
        yield put({
          type: 'updateState',
          payload: {
            dataSource: data.data,
            pagination: {
              pageNum: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
      }
    },

    * queryGroupScene({ payload = {} }, { call, put, select }) {//查询场景配置
      const { dataSource } = yield select(_ => _.configurationGroupScene);
      if (!payload.yabh) {
        payload = {
          pageNum: '1',
          pageSize: '10',
          yabh: dataSource[0].yabh,
        };
      }
      const data = yield call(queryPatrolByYABH, payload);
      if (data.status === '1') {
        yield put({
          type: 'updateState',
          payload: {
            dataSourceScene: data.data,
            pagination1: {
              pageNum: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
      }
    },

    /**
     * 查询场景组子预案
     * @param payload
     * @param call
     * @param put
     * @param select
     */* queryScene({ payload }, { call, put, select }) {
      const data = yield call(queryPlanGrepPlan, payload);
      console.log(data);
      if (data.status === '1') {
        yield put({
          type: 'updateState',
          payload: {
            dataSourceModal: data.data,
            pagination2: {
              pageNum: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
      }
    },


    * create({ payload }, { call, put }) {
      debugger;
      const data = yield call(createGroup, payload);
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '5',
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false,
          },
        });
        message.success('新增成功！');
      }
    },

    * remove({ payload }, { call, put }) {
      const data = yield call(deleteScene, payload.selectedRowKeys);
      console.log(data);
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '5',
          },
        });
        message.success('删除成功！');
      }
    },

    * update({ payload }, { call, put, select }) {
      const data = yield call(updateGroup, payload);
      if (data.status == 1) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '5',
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false,
          },
        });
        message.success('修改成功！');
      }
    },

    /**
     * 删除场景配置
     * @param payload
     * @param call
     * @param put
     * @param select
     */* deleteScene({ payload }, { call, put, select }) {
      const data = yield call(deleteScene, payload);
      console.log(data);
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '4',
          },
        });
        message.success('删除场景配置成功！');
      }
    },


    /**
     * 场景组配置中增加场景得子配置项
     * @param payload
     * @param call
     * @param put
     * @param select
     */* addScene({ payload }, { call, put, select }) {
      console.log(payload);
      const data = yield call(addModalScene, payload);
      const { key } = yield select(_ => _.configurationGroupScene);
      console.log(data);
      if (data.success) {
        yield put({
          type: 'queryGroupScene',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yabh: key,
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            modalSceneVisible: false,
          },
        });
        message.success('新增成功！');
      }
    },

    * deleteGroupScene({ payload }, { call, put, select }) {
      const data = yield call(deleteModalScene, payload);
      if (data.success) {
        yield put({
          type: 'queryGroupScene',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yabh: payload.yabh,
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys1: [],
          },
        });
        message.success('删除成功！');
      }
    },

    * updatePlanRelationOrder({ payload }, { call, put }) {
       debugger
      const data = yield call(updatePlanRelationOrder, payload.params1);
      if (data.success) {
        yield put({
          type: 'queryGroupScene',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yabh: payload.yabh,
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
