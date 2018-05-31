import {message} from 'antd'
import {queryAreaVid} from "../services/areaDevice";
import {query,startAnalysis,endAnalysis} from '../services/videoParseSch'

export default {
  namespace: 'videoAnalyticsSch',

  state: {
    selectCarData:[],
    pagination: {
      showQuickJumper: true,
      showSizeChanger:true,
      showTotal: total => `共 ${total} 条数据`,
      current: 1,
      pageSize: 100,
      total: 0,
      pageSizeOptions:['100','200','300','400']
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/videoAnalyticsSch') {
          dispatch({
            type: 'queryTree',
            payload: {
              areaId: 'root',
              userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
            },
          })
          dispatch({
            type: 'query',
            payload: {
              pageNum:'1',
              pageSize:'10',
              deviceType:'5',
            },
          })
        }
      });
    },
  },

  effects: {
    /**
     * 资源树的查询
     * @param payload
     * @param call
     * @param put
     */
      * queryTree({payload = {}}, {call, put}) {
      const {resolve} = payload;
      const data = yield call(queryAreaVid, payload);
      if (data.status === '1') {
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
        *query({payload = {}}, {call, put}){
          const payload1={
            deviceType:payload.deviceType?payload.deviceType:'',
            deviceName:payload.deviceName?payload.deviceName:'',
            deviceNumber:payload.deviceNumber?payload.deviceNumber:'',
            manufacturerName:payload.manufacturerName?payload.manufacturerName:'',
            ipAddress:payload.ipAddress?payload.ipAddress:'',
            taskIdentifier:payload.taskIdentifier?payload.taskIdentifier:'',
            analysisStatus:payload.analysisStatus?payload.analysisStatus:'',
            pageNum: payload.pageNum?payload.pageNum:'1',
            pageSize: payload.pageSize?payload.pageSize:'10',
          }
          const res=yield call(query,payload1)
          console.log(res)
          if(res){
            yield put({
              type: 'querySuccess',
              payload: {
                list: res.data,
                pagination: {
                current: Number(payload.pageNum)|| 1,
                pageSize:Number(payload.pageSize) || 100,
                total: res.total,
              },
            },
          });
        }
    },
        * startAnalysis({payload = {}}, {call, put}){
          const res=yield call(startAnalysis,payload);
          if(res){
            message.success(res.data.message)
            yield put({
              type: 'query',
              payload: {
                pageNum: '1',
                pageSize: '100',
              }
            })
          }
        },
      * endAnalysis({payload = {}}, {call, put}){
        const res=yield call(endAnalysis,payload);
        if(res){
          message.success(res.data.message)
          yield put({
            type: 'query',
            payload: {
              pageNum: '1',
              pageSize: '100',
              }
            })
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
    querySuccess (state, { payload }) {
      const { list, pagination} = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
};
