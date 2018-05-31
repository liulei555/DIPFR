import {message} from 'antd'
import {query,queryPhoneMacInfo,updatePhoneMacInfo,exportPhoneMacList} from '../services/mobileMac'
import config from "../config";
export default {
  namespace: 'mobileMac',
  state: {
    list:[],
	  pagination: {
		  showSizeChanger: true,
		  showQuickJumper: true,
		  showTotal: total => `共 ${total} 条`,
		  current: 1,
		  total: 0,
	  },
	  modalVisible:false,
	  preButtonType:false,
	  nextButtonType:false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(location.pathname === '/dispatched/mobileMac'){
					dispatch({
						type:'query',
						payload:{
							phoneImsi:'',
							phoneMac:'',
							siteNumber:'',
							suspectedVehicle:'',
							processingResult:'',
							drivingDirection:'',
							startTime:'',
							endTime:'',
							pageNum:'1',
							pageSize:'10'
						}
					})
        }
      })

    },
  },
  effects: {
		*query({payload},{call,put}){
			const data = yield call(query,payload);
			if(data.success){
				yield put({
					type:'updateState',
					payload:{
						pagination: {
							current: Number(payload.pageNum) || 1,
							pageSize: Number(payload.pageSize) || 10,
							total: data.total,
							showSizeChanger: true,
							showQuickJumper: true,
						},
						list:data.data
					}
				})
			}
		},
		*queryPhoneMacInfo({payload},{call,put}){
			const data = yield call(queryPhoneMacInfo,payload);
			if(data.success){
				yield put({
					type:'updateState',
					payload:{
						currentItem:data.data
					}
				})
			}
		},
		*updatePhoneMacInfo({payload},{call,put}){
			const data = yield call(updatePhoneMacInfo,payload);
			if(data.data){
				yield put({
					type:'query',
					payload:{
						phoneImsi:'',
						phoneMac:'',
						siteNumber:'',
						suspectedVehicle:'',
						processingResult:'',
						drivingDirection:'',
						startTime:'',
						endTime:'',
						pageNum:'1',
						pageSize:'10'
					}
				});
				message.success('修改成功!');
				yield put({
					type:'hideModal',
					payload:{
						nextButtonType:false,
						preButtonType:false
					}
				})
			}else {
				message.error('修改失败!');
			}
		},
	  *exportPhoneMacList({payload},{call,put}){
		  const data = yield call(exportPhoneMacList,payload);
		  if(data.success){
			  window.open(config.imgIp+data.data.replace('/home',''));
			  message.success('导出成功!');
		  }
	  },
  },

  reducers: {
    updateState(state,action){
      return {...state,...action.payload}
    },
	  showModal(state,action){
		  return {...state,...action.payload,modalVisible:true}
	  },
    hideModal(state,action){
      return {...state,...action.payload,modalVisible:false}
    }
  },
};
