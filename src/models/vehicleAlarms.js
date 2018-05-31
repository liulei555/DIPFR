import {query,queryDetail} from '../services/vehicleAlarms.js'
import {queryAreaVid} from "../services/areaDevice";
export default {
  namespace: 'vehicleAlarms',
  state: {
    modalVisible:false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条数据`,
      current: 1,
      total: 0,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(location.pathname === '/dispatched/vehicleAlarm'){
          dispatch({
            type:'query',
            payload:{}
          })
          dispatch({
            type:'queryTree',
            payload:{
              areaId: 'root',
              userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
            }
          })
        }
      })

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
      *query({payload},{call,put,select}){
        const res = yield call(query, payload);
        if(res && res.status === '1' && res.data){
          let list=[]
          for(let i=0;i<res.data.length;i++){
            let id=res.data[i].DispositionID;
            let object=JSON.parse(res.data[i].MotorVehicleObject)
            object={DispositionID:id,...object}
            list.push(object)
          }
          yield put({
            type: 'querySuccess',
            payload: {
              list: list,
              pagination: {
                current: Number(payload.page) || 1,
                pageSize: Number(payload.rows) || 10,
                total: res.total,
              },
            },
          })
        }else{
          yield put({
            type: 'querySuccess',
            payload: {
              list: [],
              pagination: {
                current: Number(payload.page) || 1,
                pageSize: Number(payload.rows) || 10,
                total: 0,
              },
            },
          })
        }
      },
    *detail({payload},{call,put,select}){
      const res = yield call(queryDetail, payload);
      if(res){
        yield put({
          type: 'updateState',
          payload: {
            currentItem: res.data,
            modalVisible:true,
          },
        })
      }
    }
  },

  reducers: {
    updateState(state,action){
      return {...state,...action.payload}
    },
    hideModal(state,action){
      return {...state,...action.payload,modalVisible:false}
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
