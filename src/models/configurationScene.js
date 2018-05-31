/**
 * 巡逻配置
 */
import { message } from 'antd';
import {
  queryPatrol,
  create,
  update,
  removePatrol,
  queryCamera,
  queryAreaVidByParentId,
  insertCamera,
  queryMyDevice,
  deleteCamera,
  updateCameraOrder
} from '../services/patrolConf';
// import {} from '../utils'

export default {
  namespace: 'configurationScene',
  state: {
    list: [],
    modalType: 'create',
    modalVisible: false,
    cameraModalVisible: false,
    devices: [],
    editable : false,//修改摄像头顺序时，order列是否可编辑
    changeItem : [],//修改摄像头顺序的Map类型初始值
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
        if (location.pathname === '/systemAdmin/configurationScene') {
          dispatch({
            type: 'query',
            payload: {
              pageNum: '1',
              pageSize: '10',
              yalx: '4',
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

      const payload1 = {
        pageNum: payload.pageNum ? payload.pageNum : '1',
        pageSize: payload.pageSize ? payload.pageSize : '10',
        yalx: '4',
        yh: payload.yh ? payload.yh : sessionStorage.getItem('userName'),
        yhz: payload.yhz ? payload.yhz : '',
      };

      const data = yield call(queryPatrol, payload1);
      console.log(data);
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
            list: data.data,
          },
        });
      }
    },
    * create({ payload }, { call, put, select }) {
      payload.yh = sessionStorage.getItem('userName');
      const data = yield call(create, payload);
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '4',
          },
        });
        yield put({
          type: 'hideModal',
        });
      }
    },
    * update({ payload }, { call, put, select }) {
      const { selectedRowKeys } = yield select(_ => _.configurationScene);
      payload.xh = selectedRowKeys[0];
      debugger
      const data = yield call(update, payload);
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10',
            yalx: '4',
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
            yalx: '4',
          },
        });
        message.success("删除成功")
      }
    },
    * queryCamera({ payload }, { call, put }) {
      const data = yield call(queryCamera, payload);
      console.log(data);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            pagination2: {
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: total => `共 ${total} 条`,
              current: 1,
              total: 0,
            },
            cameras: data.data,
          },
        });
      }
    },
    * queryTree({ payload }, { call, put }) {
      debugger
      const {resolve} = payload;
      const data = yield call(queryAreaVidByParentId, payload);
      if (data.success) {
        if (payload.areaId === 'root') {
          yield put({
            type: 'updateState',
            payload: {
              treeData: [...data.data.area, ...data.data.device],
              onSelect: (selectedKeys, info) => {
              },
            },
          });
        } else {
          let _data = [...data.data.area, ...data.data.device];
          _data.forEach(item => {
            if (!item.countTotal) {
              item['isLeaf'] = true;
            }
          });
          !!resolve && resolve(_data);
        }
      }
    },
    * queryMyDevice({ payload }, { call, put }) {
      const data = yield call(queryMyDevice, payload);
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
            deviceList: data.data,
          },
        });
      }
    },
    * insertCamera({ payload }, { put, call, select }) {
      const { selectedRowKeys } = yield select(_ => _.configurationScene);
      debugger
      const data = yield call(insertCamera, payload);
      if (data.data === 1) {
        yield put({
          type: 'queryCamera',
          payload: {
            planNumber: (payload.params)[0].planNumber,
            pageNum: '1',
            pageSize: '10',
          },
        });
        yield put({ type: 'hideCameraModal' });
        yield put({
          type : 'updateState',
          payload : {
            devices : [],
            treeData : []
          }
        })
        message.success('新增成功！');
      }
    },

    * deleteCamera({ payload }, { put, call }) {
      const data = yield call(deleteCamera, payload);
      console.log(data)
      if (data.success) {
        yield put({
          type: 'queryCamera',
          payload: {
            planNumber: payload.planNumber,
            pageNum: '1',
            pageSize: '10',
          },
        });
        message.success('删除成功');
      }
    },

    * updateCameraOrder({payload}, {put, call}) {
      console.log(payload.params1)
      const data = yield call(updateCameraOrder, payload.params1);
      console.log(data)
      if (data.success) {
        yield put({
          type: 'queryCamera',
          payload: {
            planNumber: payload.planNumber,
            pageNum: '1',
            pageSize: '10',
          },
        });
        yield put({
          type : 'updateState',
          payload : {
            editable : false
          }
        })
        message.success('更新完成');
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
    /**
     * 显示增加弹出框
     * @param state
     * @param payload
     * @returns {{modalVisible: boolean}}
     */
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },
    /**
     * 隐藏增加弹出框
     * @param state 状态机
     * @param payload 参数
     * @returns {{modalVisible: boolean}} 是否显示Model框
     */
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    /**
     * 显示增加弹出框
     * @param state
     * @param payload
     * @returns {{modalVisible: boolean}}
     */
    showCameraModal(state, { payload }) {
      return { ...state, ...payload, cameraModalVisible: true };
    },
    /**
     * 隐藏增加弹出框
     * @param state 状态机
     * @param payload 参数
     * @returns {{modalVisible: boolean}} 是否显示Model框
     */
    hideCameraModal(state) {
      return { ...state, cameraModalVisible: false };
    },

  },
};
