/**
 * 角色绑定设备
 */
import { message } from 'antd';
import { queryRoleList, addRole, deleteRole, updateRole,bindingRole } from '../services/roleBindDevice';
import { queryDevice } from '../services/areaDevice';
import {arrayToTree, groupBy} from '../utils/utils'

export default {
  namespace: 'roleBindDevice',

  state: {
    treeData: [],
    confirmLoading: false,
    modalVisible:false,
    clikType:'create',

    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
    },
    roleListPagination: {
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
        if (location.pathname === '/systemAdmin/roleBindDevice') {
          const payload = location.query || { pageNum: '1', pageSize: '10' };
          dispatch({ type: 'queryDevice', payload });
          dispatch({ type: 'queryRoleList', payload });
        }
      });
    },
  },

  effects: {
    *queryDevice({ payload = {} }, { call, put }) {
      const data = yield call(queryDevice, payload);
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
    /**
     * 查询角色列表
     * @param payload
     * @param call
     * @param put
     */
    *queryRoleList({ payload = {} }, { call, put }) {
      const data = yield call(queryRoleList, payload);
      console.log(data);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            roleList: data.data,
            roleListPagination:{
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.length,
            },
          },
        });
      }
    },


    /**
     * 新建角色
     * @param payload
     * @param call
     * @param put
     */
    *addRole({ payload = {} }, { call, put,select }) {
      console.log(payload);
      const data = yield call(addRole, payload);
      const {resetFields} = yield select(_ => _.roleBindDevice)
      console.log(data);
      console.log(resetFields)
      if (data.data === 1) {
        yield put({
          type:'queryRoleList',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
        message.success("新增成功!")
        yield put({
          type:'updateState',
          payload:{
            modalVisible:false,
          }
        })
        resetFields
      }else{
        message.error(data.message);
      }
    },
    /**
     * 删除角色
     * @param payload
     * @param call
     * @param put
     */
    *deleteRole({ payload = {} }, { call, put }) {
      const data = yield call(deleteRole, payload);
      console.log(data);
      if (data.data === 1) {
        yield put({
          type:'queryRoleList',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
        message.success('删除成功！')
      }else{
        message.error('删除失败！')
      }
    },

    /**
     * 更新角色信息
     * @param payload
     * @param call
     * @param put
     */
    *updateRole({ payload = {} }, { call, put,select }) {
      const data = yield call(updateRole, payload);
      const {resetFields} = yield select(_ => _.roleBindDevice)
      if (data.data === 1) {
        yield put({
          type:'queryRoleList',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
        message.success("修改成功!")
        yield put({
          type:'updateState',
          payload:{
            modalVisible:false,
          }
        })
        resetFields
      }else{
        message.error('修改失败！')
      }
    },

    /**
     * 绑定角色
     * @param payload
     * @param call
     * @param put
     */
    *bindingRole({ payload = {} }, { call, put }) {
      const data = yield call(bindingRole, payload);
      console.log(data);
      if (data.data === 1) {
        yield put({
          type:'queryDevice',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        });
        yield put({
          type:'queryRoleList',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
        message.success('绑定成功！')
      }else if(data.data=== 0){
        message.error("已绑定，请重新选择！")
      }else{
        message.error(data.message)
      }
      yield put({
        type:'updateState',
        payload:{
          selectedRowKeysRole:[],
          selectedRowKeysDevice:[],
          roleIds:'',
          deviceId:''
        }
      })
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
