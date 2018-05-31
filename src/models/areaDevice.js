/**
 * 行政设备关系
 */
import {message} from 'antd';
import {queryDevice, queryAreaVid, queryTree,create,deleteNode,bindingVideo,bindingBayonet,unbindingVidnet} from '../services/areaDevice';
import {arrayToTree, groupBy} from '../utils/utils'

export default {
  namespace: 'areaDevice',

  state: {
    treeData: [],
    confirmLoading: false,
    nodeData: [],//树的父节点信息
    selectedRowKeysbind: [],
    //树搜索得参数
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    deviceIds:[],

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
        if (location.pathname === '/systemOperation/areaDevice'|| '/systemOperation/areaBayonet') {
          const payload = location.query || {pageNum: '1', pageSize: '10'};
          dispatch({type: 'query', payload});
          dispatch({
            type: 'queryTree',
            payload: {
              areaId: 'root',
              userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
              pageNum:'1',
              pageSize:'10'
            },
          });
        }
      });
    },
  },

  effects: {
    * query({payload = {}}, {call, put}) {
      yield put({
        type:'updateState',
        payload:{
          selectedRowKeys:[],
          selectedRowKeysbind:''
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
            selectedRowKeys:[],
            selectedRowKeysbind:'',
          },
        });
      }
    },

    /**
     * 视频树的查询
     * @param payload
     * @param call
     * @param put
     */
    * queryTree({payload = {}}, {call, put}) {
      const {resolve} = payload;
      const data = yield call(queryAreaVid, payload);
      console.log('queryTree')
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

    /**
     * 创建父节点
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * create({payload}, {call, put, select}) {
      const data = yield call(create, payload)
      const {resetFields} = yield select(_ => _.areaDevice)
      console.log(data);
        if (data.data === 1){
          yield put({
            type:'queryTree',
            payload:{
              areaId: 'root',
              userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
            }
          })
          message.success(data.message);
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

    * deleteNode({payload}, {call, put, select}) {
      const data = yield call(deleteNode,payload)
      console.log(data);
      if(data){
        if (data.data === 2){
          yield put({
            type:'queryTree',
            payload:{
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
     */
    * bindingVideo({payload}, {call, put, select}) {
      /*const payload1 = {
        areaId:payload.areaId,
        deviceIds:payload.deviceIds
      }*/
      const data = yield call(bindingVideo, payload)
      if(data.data === 1){
        yield put({
          type:'queryTree',
          payload:{
            areaId: 'root',
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          }
        });
        yield put({
          type:'query',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
        yield put({
          type:'updateState',
          payload:{
            deviceIds:''
          }
        })
        message.success('绑定成功！')
      }else{
        message.error(data.message)
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
      console.log(payload);
      /*const payload1 = {
        areaId:payload.areaId,
        deviceIds:payload.deviceIds
      }*/
      const data = yield call(bindingBayonet, payload)
      console.log(data);
      if(data.result==1){
        yield put({
          type:'geographicInfo/queryTree',
          payload:{
            areaId: 'root',
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          }
        });
        yield put({
          type:'query',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
        yield put({
          type:'updateState',
          payload:{
            selectedRowKeys:[],
          }
        })
        message.success('绑定成功！')
      }else{
        message.error(data.message);
      }
    },


    /**
     * 解绑视频设备
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * unbindingVidnet({payload}, {call, put, select}) {
      const data = yield call(unbindingVidnet, payload)
      console.log(data);
      //const {expandedKeys} = yield select(_ => _.bayonetDevice)
      if (data.data === 1) {
        yield put({
          type: 'queryTree',
          payload: {
            areaId: 'root',
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          }
        });
        message.success('解绑成功！')
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
