import {message} from 'antd'
import config from '../config'
import {queryCarBlackLib,queryCarBlackList,saveBlackLib,deleteItem,saveBlackList,deleteItemList,updateBlackList,queryInfoById,batchImportData,exportList} from '../services/carBlackLib'
export default {
  namespace: 'carBlackLib',

  state: {
    blackLibTitle: '',
    blackLibList: [],
    selectedLib: [],
    blackLibVisible: false,
    blackVisible: false,
    blackImportVisible:false,
    heimingdan:false,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `总共 ${total} 条数据`,
      current: 1,
      pageSize: 10,
      total: 0,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/dispatched/carBlackLib') {
          dispatch({
            type: 'queryLibList',
            payload: {},
          })
          // dispatch({
          //   type: 'queryList',
          //   payload: {},
          // })
        }
      });
    },
  },

  effects: {
    /**
     * 查询黑名单库
     */
    *queryLibList({ payload }, { call, put, select }) {
      const data=yield call(queryCarBlackLib,payload)
      if(data && data.status==='1'){
        yield put({
          type: 'updateState',
          payload: {
            blackLibList: data.data,
            blackLibTitle:data.data[0].vehicleBlacklibName,
            selectedLib:[data.data[0].id]
          },
        });
        yield put({
          type: 'queryList',
          payload: {},
        });
      }

    },
    *queryList({ payload }, { call, put, select }){
      //获取车辆库的id
      const vehicleId = yield select(({ carBlackLib }) => carBlackLib.selectedLib[0])
     //构建参数
      let vehicleBrandNum=payload.vehicleBrandNum?payload.vehicleBrandNum:'';
      if(payload.vehicleBrandNum && payload.vehicleBrandNum==="全部"){
        vehicleBrandNum="";
      }
      let vehicleBrandNum1=payload.vehicleBrandNum1?payload.vehicleBrandNum1:'';
      const params={vehicleId:vehicleId,vehicleBrandNum:vehicleBrandNum+vehicleBrandNum1,vehiclePlateColor:payload.vehiclePlateColor}
      const paramsPage={...params,pageNum:payload.pageNum?payload.pageNum:'1',pageSize:payload.pageSize?payload.pageSize:'10'
      }
      const data=yield call(queryCarBlackList,paramsPage)
      if(data && data.status==='1'){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
      }
    },
    *queryDispatchById({ payload }, { call, put, select }){
      //const data=yield call(queryDispatchById,payload)
    },
    *deleteItem({payload},{call,put,select}){
      const data=yield call(deleteItem,payload)
      if(data){
        yield put({
          type: 'queryLibList',
          payload: { pageNum: '1', pageSize: '9999' },
        });
        message.success("删除成功!")
      }else{
        message.error("删除失败！")
      }
    },
    *deleteItemList({payload},{call,put,select}){
      const data=yield call(deleteItemList,payload)
      if(data){
        yield put({
          type: 'queryList',
          payload: { pageNum: '1', pageSize: '10' },
        });
        message.success("删除成功!")
      }else{
        message.error("删除失败！")
      }
    },
    *saveBlackLib({payload},{call,put,select}){
      const data=yield call(saveBlackLib,payload)
      if(data && data.message==='success'){
        yield put({
          type: 'queryLibList',
          payload: { pageNum: '1', pageSize: '9999' },
        });
        message.success("添加成功!")
        yield put({
          type: 'updateState',
          payload:{blackLibVisible:false} ,
        });
      }else{
        message.error(data.message)
      }
    },
    *addBlackInfo({payload},{call,put,select}){
      const vehicleId = yield select(({ carBlackLib }) => carBlackLib.selectedLib[0])
      const imageUrl=yield select(({ carBlackLib }) => carBlackLib.imageUrl)
      let params={
        vehicleOwner:payload.vehicleOwner,
        vehicleOwnerPhone:payload.vehicleOwnerPhone,
        vehicleOwnerCard:payload.vehicleOwnerCard,
        vehicleBodyColor:payload.vehicleBodyColor,
        vehicleBrand:payload.vehicleBrand,
        vehicleImageUrl:imageUrl,
        vehiclePlateColor:payload.vehiclePlateColor,
        vehicleBrandNum:payload.vehicleBrandNum+payload.vehicleBrandNum1,
        vehicleId:vehicleId
      }
      const data=yield call(saveBlackList,params)
      if(data && data.message==='success'){
        yield put({
          type: 'queryList',
          payload: { pageNum: '1', pageSize: '10' },
        });
        message.success("添加成功！")
        yield put({
          type: 'updateState',
          payload:{ blackVisible: false} ,
        });
      }else{
        message.error(data.message)
      }
    },
    *updateBlackInfo({payload},{call,put,select}){
      const vehicleId = yield select(({ carBlackLib }) => carBlackLib.selectedLib[0])
      const id=yield select(({ carBlackLib }) => carBlackLib.currentItem.id)
      const imageUrl=yield select(({ carBlackLib }) => carBlackLib.imageUrl)
      let params={
        id:id,
        vehicleOwner:payload.vehicleOwner,
        vehicleOwnerPhone:payload.vehicleOwnerPhone,
        vehicleOwnerCard:payload.vehicleOwnerCard,
        vehicleBodyColor:payload.vehicleBodyColor,
        vehicleBrand:payload.vehicleBrand,
        vehicleImageUrl:imageUrl?imageUrl:payload.vehicleImageUrl,
        vehiclePlateColor:payload.vehiclePlateColor,
        vehicleBrandNum:payload.vehicleBrandNum+payload.vehicleBrandNum1,
        vehicleId:vehicleId
      }
      const data=yield call(updateBlackList,params)
      if(data.message==='success'){
        yield put({
          type: 'queryList',
          payload: { pageNum: '1', pageSize: '10' },
        });
        message.success("修改成功!")
        yield put({
          type: 'updateState',
          payload:{ blackVisible: false} ,
        });
      }else{
        message.error(data.message)
      }
    },
    *queryInfoById({payload},{call,put,select}){
      const data=yield call(queryInfoById,payload.id)
      let params={...data.data,vehicleBrandNum:data.data.vehicleBrandNum.substring(0,1),vehicleBrandNum1:data.data.vehicleBrandNum.substring(1)}
      if(data && data.status==="1"){
        yield put({
          type: 'updateState',
          payload:{
            modalType:payload.modalType,
            blackVisible:true,
            currentItem:params
          }
        });
      }
    },
    *savefile({payload},{call,put,select}){
      const data=yield call(batchImportData,payload)
      if(data && data.status==="1"){
        message.success(data.message)
        yield put({
          type: 'queryList',
          payload: { pageNum: '1', pageSize: '10' },
        });
        yield put({
          type: 'updateState',
          payload:{
            blackImportVisible:false,
          }
        });
      }else{
         message.error("失败")
      }
    },
    *exportList({payload},{call,put,select}){
      const data=yield call(exportList,payload)
      if(data && data.status==="1"){
        window.open(config.imgIp+data.message.replace('/home',''))
        yield put({
          type: 'updateState',
          payload:{
            exportUrl:data.message,
          }
        });
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
