/**
 * 角色管理
 */
import { message } from 'antd';
import { findMainOrg, queryUserList,addRole, deleteRole, updateRole,bindingRole} from '../services/roleManage';
import { queryRoleList} from '../services/roleBindDevice';

export default {
  namespace: 'roleManage',

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
  },

  subscriptions: {
  setup({ dispatch, history }) {
    history.listen(location => {
      if (location.pathname === '/systemAdmin/roleManage') {
        const payload = location.query || { pageNum: '1', pageSize: '10' };
          dispatch({ type: 'query', payload });
          dispatch({ type: 'queryRoleList', payload });
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const orgList = yield call(findMainOrg) || [1]
      console.log(payload);
      if(orgList.length){
        let param = {
          orgId: 'ff80808162f5aad60162f65029560002',
          userName: payload.data?payload.data.userName:'',
          name: payload.data?payload.data.name:'',
          sysOrgCode:'',
          positionId:'',
          status:'',
          duty:'',
          rows: payload.pageSize?payload.pageSize:'10',
          page: payload.pageNum?payload.pageNum:'1',
        }
        const res = yield call(queryUserList, param);
        if (res) {
          yield put({
            type: 'updateState',
            payload: {
              dataSource: res.data.dataGrid.rows,
              pagination:{
                current: Number(payload.pageNum) || 1,
                pageSize: Number(payload.pageSize) || 10,
                total: res.data.dataGrid.total,
              },
            },
          });
        }
      }
    },
    *queryRoleList({ payload = {} }, { call, put }) {
      yield put({
        type:'updateState',
        payload:{
          selectedRowKeys:[],
          roleId:'',
          selectedRow:[]
        }
      })
      const data = yield call(queryRoleList, payload);
      if (data) {
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
      const {resetFields} = yield select(_ => _.roleManage)
      console.log(data);
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
        message.warning(data.message);
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
        yield put({
          type:'updateState',
          payload:{
            selectedRowKeys:[]
          }
        })

        message.success("删除成功！")
      }else {
        message.error(data.message)
      }
    },

    /**
     * 更新角色信息
     * @param payload
     * @param call
     * @param put
     */
      *updateRole({ payload = {} }, { call, put,select }) {
      const {resetFields} = yield select(_ => _.roleManage)
      const data = yield call(updateRole, payload);
      console.log(data);
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
        message.warning(data.message);
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
      if (data.data === 1) {
        yield put({
          type:'query',
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
        message.success("绑定成功！")
      }else if(data.data === 0){
        message.error("已绑定，请重新选择！")
      }else{
        message.error(data.message)
      }
      yield put({
        type:'updateState',
        payload:{
          selectedRowKeys:[],
          selectedRow:[],
          selectedRowKeysUser:[],
          userIds:'',
          roleId:''
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
