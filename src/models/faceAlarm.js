import {query} from '../services/mobileMac'
export default {
  namespace: 'faceAlarm',
  state: {
    list:[],
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
        if(location.pathname === '/dispatched/mobileMac'){
					dispatch({
						type:'query',
						payload:{
							pageNum:'1',
							pageSize:'10',
							startTime:'',
							endTime:'',
							DISPOSITIONTITLE:'',
							phoneMac:'',
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
		}
  },

  reducers: {
    updateState(state,action){
      return {...state,...action.payload}
    },
    hideModal(state,action){
      return {...state,...action.payload,modalVisible:false}
    }
  },
};
