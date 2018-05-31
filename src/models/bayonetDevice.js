/**
 * 行政设备关系
 */
import {message} from 'antd';
import {
  queryDevice,
  queryTree,
  create,
  deleteNode,
  bindingVideo,
  bindingBayonet,
  queryAreaAndDev,
  unbindingBayonet,
} from '../services/areaDevice';
import {arrayToTree, groupBy} from '../utils/utils'


export default {
  namespace: 'bayonetDevice',

  state: {
    treeData: [],
    confirmLoading: false,
    selectedRowKeysbind: [],
    nodeData:[],
    deviceIds:[],
    upOk:0,
    expandedKeys:'',
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
        if (location.pathname === '/systemOperation/areaDevice' || '/systemOperation/areaBayonet') {
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
      yield put({
        type: 'updateState',
        payload: {
          selectedRowKeys: [],
          selectedRowKeysbind: ''
        }
      })
      const data = yield call(queryDevice, payload);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            dataSource: data.data,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
            selectedRowKeys: [],
            selectedRowKeysbind: '',
          },
        });
      }
    },

    /**
     * 卡口树的查询
     * @param payload
     * @param call
     * @param put
     */
    * queryTree({payload = {}}, {call, put}) {
      const {resolve} = payload;
      const data = yield call(queryAreaAndDev, payload);
      console.log('行政区域设备树卡口')
      console.log(data);
      if (data.status === '1') {
        if (payload.areaId === 'root') {
          yield put({
            type: 'updateState',
            payload: {
              treeData: [...data.data.area,...data.data.device],
              // treeData: groupBy(data,'pid'),
              onSelect: (selectedKeys, info) => {
                console.log('onSelect', info);
              },
            },
          });
        } else {
          let _data = [...data.data.area,...data.data.device]
          _data.forEach(item => {
            if (!item.countTotal) {
              item['isLeaf'] = true
            }
          })
          !!resolve && resolve(_data);
        }
      }
    },

    /**
     * 创建父节点
     * @param payload
     * @param call
     * @param put
     * @param select
     */* create({payload}, {call, put, select}) {
      const data = yield call(create, payload)
      const {resetFields} =  yield select(_ => _.bayonetDevice)
      if (data) {
        if (data.data === 1) {
          console.log(data)
          yield put({
            type:'queryTree',
            payload:{
              areaId: 'root',
              userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
            }
          })
          message.success(data.message);
          yield put({
            type: 'updateState',
            payload: {
              modalVisible: false,
            }
          })
          resetFields
        } else{
          message.warning(data.message);
        }
      }
    },

    * deleteNode({payload}, {call, put, select}) {
      const data = yield call(deleteNode, payload)
      console.log(data);
      if (data) {
        if (data.data === 2) {
          yield put({
            type: 'queryTree',
            payload: {
              areaId: 'root',
              userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
            }
          })
          message.success(data.message);
        } else{
          message.error(data.message);
        }
      }
    },

    /**
     * 绑定视频设备
     * @param payload
     * @param call
     * @param put
     * @param select
     */* bindingVideo({payload}, {call, put, select}) {
      console.log(payload);
      /*const payload1 = {
        areaId:payload.areaId,
        deviceIds:payload.deviceIds
      }*/
      const data = yield call(bindingVideo, payload)
      console.log(data);
      if (data.result === 1) {
        yield put({
          type:'queryTree',
          payload:{
            areaId: 'root',
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          }
        })
        yield put({
          type: 'query',
          payload: {
            pageNum: '1',
            pageSize: '10'
          }
        })
        message.success("绑定成功！")
      }else {
        message.error("绑定失败！")
      }
    },


    /**
     * 绑定卡口设备
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * bindingBayonet({payload}, {call, put, select}) {
      const data = yield call(bindingBayonet, payload)
      console.log(data.data);
      if (data.data === 1) {
        yield put({
          type: 'queryTree',
          payload: {
            areaId: 'root',
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          }
        });
        yield put({
          type:'updateState',
          payload:{
            upOk:1,
          }
        })
        message.success("绑定成功！")
      }else {
        message.error("绑定失败！")
      }

    },


    /**
     * 接绑卡口设备
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * unbindingBayonet({payload}, {call, put, select}) {
      console.log(payload)
      const data = yield call(unbindingBayonet, payload)
      console.log(data);
      //const {expandedKeys} = yield select(_ => _.bayonetDevice)
      console.log(data.data);
      if (data.data === 1) {
        yield put({
          type: 'queryTree',
          payload: {
            areaId: 'root',
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          }
        });
        message.success('解绑成功')
      }else{
        message.error(data.message)
      }
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
