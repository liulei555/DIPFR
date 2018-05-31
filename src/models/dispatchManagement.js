import {query,createDispatch,deleteCarDispatch,deleteFaceDispatch,blacklist,createAddDispatch,cancelController,createFaceDispatch,queryCarBlack,queryFaceBlack} from '../services/dispatchManagement'
import {queryAreaVid} from '../services/areaDevice';
import {getCurPowers}from '../utils/index'
import config from '../utils/config'
import {message} from 'antd';

export default {
  namespace: 'dispatchManagement',
  state: {
    modalVisible:false,
    cancelDispatchVisible:false,
    createCarVisible:false,
    createFaceVisible:false,
    detailVisible:false,//详情弹框
    creatTimeStart:'',//开始时间的起始时间
    creatTimeEnd:'',//开始时间的终止时间
    dispositionStartTime:'',
    dispositionEndTime:'',//布控截至时间
    heimingdan:false,
    selectCarData:[],
    clickType:'createCar',
    selectValueRedio:'1',
    vehicleIds:[],
    personIds:[],

    //图片上传
    previewVisible: false,
    previewImage: '',
    fileList: [],
    cancelType:'0',

    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      pageNum: 1,
      total: 0,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(location.pathname === '/dispatched/disManagement'){
          let curPowers = getCurPowers(config.systemRouter+location.pathname)
          //保存到State中
          if(curPowers){
            dispatch({ type: 'updateState', payload: { curPowers } })
          }

          const payload = location.query || {data:{
            pageNum: '1', pageSize: '10',
          }};
          dispatch({ type: 'query', payload });
        }
      })

    },
  },
  effects: {

    *query({ payload = {} }, { call, put,select }) {//查询场景组配置
      const {creatTimeStart,creatTimeEnd,dispositionEndTime} = yield select(_ => _.dispatchManagement)
      console.log(payload.data);
      const payload1={
        dispositionCompany:payload.data?payload.data.dispositionCompany:'',
        dispositionPerson:payload.data?payload.data.dispositionPerson:'',
        dispositionTitle:payload.data?payload.data.dispositionTitle:'',
        controlType:payload.data?payload.data.dispositionMark:'',
        state:payload.data?payload.data.state:'',
        dispositionEndTime:dispositionEndTime,
        creatTimeStart:creatTimeStart,
        creatTimeEnd:creatTimeEnd,
        pageNum: payload.data?payload.data.pageNum:'1',
        pageSize: payload.data?payload.data.pageSize:'10',
      }
      const data = yield call(query, payload1);
      console.log(data);
      if (data.status === '1') {
        yield put({
          type: 'updateState',
          payload: {
            dataSource: data.data,
            pagination:{
              pageNum: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
      }
    },

    /**
     * 资源树的查询
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
     * 新增车辆布控
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * createDispatch ({ payload }, { call, put,select }) {
      let daft=[]
      let deviceIds=[]
      let tade
      let deviceId
      const {selectCarData,vehicleIds} = yield select(_ => _.dispatchManagement)
      if(selectCarData.length>0){
        selectCarData.map((item)=>{
          console.log(item);
          tade={
            deviceId:item.nodeId
          }
          deviceIds.push(tade)
        })
      }
      payload.data.deviceIds=deviceIds;
      payload.data.vehicleIds=vehicleIds;
      console.log(payload);
      const payload1 = {
        params:[payload.data]
      }
      const data = yield call(createDispatch, payload1);
      console.log(data);
      if(data.status === "1"){
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
            createCarVisible:false,
          }
        })
        message.success('新建车辆布控成功！')
      }else{
        message.error('新建车辆布控失败！')
      }
    },


    /**
     * 新增人脸布控
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * createFaceDispatch ({ payload }, { call, put,select }) {
      let daft=[]
      let deviceIds=[]
      let tade
      let deviceId
      const {selectCarData,personId} = yield select(_ => _.dispatchManagement)
      if(selectCarData.length>0){
        selectCarData.map((item)=>{
          console.log(item);
          tade={
            deviceId:item.nodeId
          }
          deviceIds.push(tade)
        })
      }
      payload.data.deviceIds=deviceIds;
      payload.data.personIds=personId;
      console.log(payload);
      const payload1 = {
        params:[payload.data]
      }
      console.log(payload1);
      const data = yield call(createFaceDispatch, payload1);
      if(data.status === "1"){
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
            createCarVisible:false,
          }
        })
        message.success('新建人脸布控成功！')
      }else{
        message.error('新建人脸失败！')
      }
    },

    /**
     * 删除车辆布控
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * deleteCarDispatch ({ payload }, { call, put,select }) {
      const data = yield call(deleteCarDispatch, payload)
      console.log(data);
      if(data.status === '1'){
        yield put({
          type:'query',
          payload:{
              pageNum: '1',
              pageSize: '10'
            }
        })
        message.success('删除车辆布控成功!')
      }else{
        message.error('删除车辆布控失败！')
      }

    },

    /**
     * 删除人脸布控
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * deleteFaceDispatch ({ payload }, { call, put,select }) {
      const data = yield call(deleteFaceDispatch, payload)
      console.log(data);
      if(data.status === '1'){
        yield put({
          type:'query',
          payload:{
              pageNum: '1',
              pageSize: '10'
            }
        })
        message.success('删除人脸布控成功！')
      }else{
        message.error('删除人脸布控失败！')
      }
    },

    /**
     * 查询黑名单库
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * blacklist ({ payload }, { call, put,select }) {
      const data = yield call(blacklist, payload)
      console.log(data);
      if(data.status === '1'){
        yield put({
          type:'updateState',
          payload:{
            blacklistData:data.data
            }
        })
      }
    },

    /**
     * 布控方法
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * createAddDispatch ({ payload }, { call, put,select }) {
      const data = yield call(createAddDispatch, payload)
      console.log(data);
      if(data.status === '1'){
        yield put({
          type:'query',
          payload:{
            pageNum: '1',
            pageSize: '10',
          }
        })
        message.success('布控成功！')
      }else{
        message.error('布控失败!')
      }
    },

    /**
     * 撤控方法
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * cancelController ({ payload }, { call, put,select }) {
      console.log(payload)
      const payload1 = {
        dispositionId:payload.data?payload.data.dispositionId:'',
        dispositionRemoveConNumber:payload.data?payload.data.dispositionRemoveConNumber:'',
        dispositionRemoveReason:payload.data?payload.data.dispositionRemoveReason:'',
        dispositionRemovePerson:payload.data?payload.data.dispositionRemovePerson:'',
        dispositionCompany:payload.data?payload.data.dispositionCompany:'',
      }
      console.log(payload1)
      const data = yield call(cancelController, payload1)
      console.log(data);
      if(data.status === '1'){
        yield put({
          type:'query',
          payload:{
            pageNum: '1',
            pageSize: '10',
          }
        })
        yield put({
          type:'updateState',
          payload:{
            cancelDispatchVisible:false
          }
        })
        message.success('撤控成功！')
      }else{
        message.error('撤控失败！')
      }
    },

    /**
     * 查询单个黑名单库
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * queryCarBlack ({ payload }, { call, put,select }) {
      const data = yield call(queryCarBlack, payload)
      if(data.message === '1'){
        yield put({
          type:'updateState',
          payload:{
            carBlackData:data.data[0],
          }
        })
      }else{
        message.error(data.message)
      }
    },

    /**
     * 查询人脸个人信息
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    * queryFaceBlack ({ payload }, { call, put,select }) {
      const data = yield call(queryFaceBlack, payload)
      if(data.message === '1'){
        yield put({
          type:'updateState',
          payload:{
            faceBlackData:data.data[0],
          }
        })
      }else{
        message.error(data.message)
      }
    },
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
