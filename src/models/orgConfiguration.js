/**
 * 角色管理
 */
import {message} from 'antd';
import {findMainOrg, queryUserList} from '../services/roleManage';
import {queryAreaByUser, bindingUser} from '../services/orgConfiguration';
import {queryDevice, queryAreaVid, queryTree} from '../services/areaDevice';
import {arrayToTree, groupBy} from '../utils/utils'

export default {
  namespace: 'orgConfiguration',

  state: {
    treeData: [],
    confirmLoading: false,
    modalVisible: false,
    clikType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/systemAdmin/orgConfiguration') {
          const payload = location.query || {pageNum: '1', pageSize: '10'};
          dispatch({type: 'query', payload});
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
    * query({payload = {}}, {call, put}) {
      const orgList = yield call(findMainOrg) || [1]
      console.log(payload);
      if (orgList.length) {
        let param = {
          orgId: 'ff80808162f5aad60162f65029560002',
          userName: payload.data?payload.data.userName:'',
          userId: payload.data?payload.data.userId:'',
          name: '',
          sysOrgCode: '',
          positionId: '',
          status: '',
          duty: '',
          rows: payload.pageSize?payload.pageSize:'10',
          page: payload.pageNum?payload.pageNum:'1',
        }
        const res = yield call(queryUserList, param);
        if (res) {
          yield put({
            type: 'updateState',
            payload: {
              dataSource: res.data.dataGrid.rows,
              pagination: {
                current: Number(payload.pageNum) || 1,
                pageSize: Number(payload.pageSize) || 10,
                total: res.data.dataGrid.total,
              },
            },
          });
        }
      }
    },

    /**
     * 区域用户树的查询
     * @param payload
     * @param call
     * @param put
     */
    * queryTree({payload = {}}, {call, put}) {
      const {resolve} = payload;
      const data = yield call(queryAreaByUser, payload);
      console.log('用户绑定设备')
      console.log(data.data);
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
              treeData: [...data.data.area, ...data.data.user],
              // treeData: groupBy(data,'pid'),
              onSelect: (selectedKeys, info) => {
                console.log('onSelect', info);
              },
            },
          });
        } else {
          let _data = [...data.data.area, ...data.data.user]
          _data.forEach(item => {
            // debugger;
            if (!item.countTotal) {
              item['isLeaf'] = true
            }
          })
          !!resolve && resolve(_data);
        }
      }
    },


    /**
     * 绑定用户
     * @param payload
     * @param call
     * @param put
     */
    * bindingUser({payload = {}}, {call, put}) {
      console.log(payload);
      const data = yield call(bindingUser, payload);
      console.log(data)
      if (data.data === 1) {
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10'
          }
        });
        yield put({
          type: 'queryTree',
          payload: {
            areaId: 'root',
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          }
        })
        message.success('绑定成功！')

      }else if(data.data === 0){
        message.error('绑定失败，数据已绑定！')
      }else{
        message.error(data.message)
      }
      yield put({
        type:'updateState',
        payload:{
          selectedRowKeysUser:[],
          nodeData:{},
          confirmLoading:false
        }
      })
    },

  },

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    querySuccess(state, {payload}) {
      const {list, pagination} = payload;
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
