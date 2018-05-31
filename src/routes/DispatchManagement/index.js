import React from 'react';
import { connect } from 'dva'
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import Filter from './Filter'
import List from './List'
import {headhildMenu} from "../../common/menu";
import {Card,message} from 'antd'
import CancelModal from './CancelModal';
import CreateCarModal from './CreateCarModal'
import CreateFaceModal from './CreateFaceModal'
import DetailModal from './DetailModal'
import MapModal from '../GisMap/MapModal'
const DispatchManagement=({dispatch,dispatchManagement,gisMap})=>{
  const pageHeaderProps  = {
    menuList: headhildMenu.dispatchedAlarm,
  }
  const {modalVisible,cancelDispatchVisible,createCarVisible,heimingdan,createFaceVisible,dataSource,creatTimeStart,creatTimeEnd,dispositionEndTime,pagination,detailVisible,currentItem,treeData,selectCarData,dispositionStartTime,clickType,dispositionMark,curPowers,selectValueRedio,blacklistData,personIds,vehicleIds,cancelDispatchId,previewVisible, previewImage, fileList,birthday,carBlackData,faceBlackData} = dispatchManagement;
  const {mapSelectCameraData,clickFinish,cancelType} = gisMap

  if(mapSelectCameraData.length>0){
    let mapSelectData={};
    mapSelectCameraData.map((item) => {
      mapSelectData.nodeName = item.NAME;
      mapSelectData.nodeId=item.SBBH
    })
    selectCarData.push(mapSelectData)
  }
  /*const onSelectDataShow = () => {
    if(mapSelectCameraData.length>0){
      // debugger;
      let mapSelectData={};
      mapSelectCameraData.map((item) => {
        // debugger;
        console.log(item);
        mapSelectData.nodeName = item.NAME;
        mapSelectData.nodeId=item.SBBH
      })
      selectCarData.push(mapSelectData)
    }
  }*/


  console.log(selectCarData);
  const listProps={
    dataSource:dataSource,
    pagination,
    createAddDispatch(e){
      dispatch({
        type:'dispatchManagement/createAddDispatch',
        payload:{
          dispositionId:e.dispositionId,
        }
      })
    },
    onChange (page) {
      console.log(page);
      dispatch({
        type:'dispatchManagement/query',
        payload:{
          data:{
            pageNum: String(page.current),
            pageSize: String(page.pageSize)
          }

        }
      })
    },
    onDelete(record){
      console.log(record)
      if(record.dispositionMark === '1'){
        dispatch({
          type:'dispatchManagement/deleteCarDispatch',
          payload:{
            dispositionId:record.dispositionId,
          }
        })
      }else if(record.dispositionMark === '2'){
        dispatch({
          type:'dispatchManagement/deleteFaceDispatch',
          payload:{
            dispositionId:record.dispositionId,
          }
        })
      }else{
        dispatch({
          type:'dispatchManagement/deleteCarDispatch',
          payload:{
            dispositionId:record.dispositionId,
          }
        })
      }
    },
    detail(record){
      if(record.dispositionMark === '1'){
        dispatch({
          type:'dispatchManagement/queryCarBlack',
          payload:{
            vehicleId:record.relationVehicleId,
          }
        })
      }
      if(record.dispositionMark === '2'){
        dispatch({
          type:'dispatchManagement/queryFaceBlack',
          payload:{
            personId:record.relationPersonId,
          }
        })
      }
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          currentItem:record,
          detailVisible:true,
          heimingdan:true,
        }
      })
    },

    cancelDispatch(e){//撤销布控得方法
      console.log(e)
      if(e.dispositionMark === '1'){
        dispatch({
          type:'dispatchManagement/queryCarBlack',
          payload:{
            vehicleId:e.relationVehicleId,
          }
        })
      }
      if(e.dispositionMark === '2'){
        dispatch({
          type:'dispatchManagement/queryFaceBlack',
          payload:{
            personId:e.relationPersonId,
          }
        })
      }
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          cancelDispatchVisible:true,
          currentItem:e,
          cancelDispatchId:e.dispositionId,
          cancelType:e.dispositionMark,
          heimingdan:true,
        }
      })
      dispatch({
        type:'dispatchManagement/queryTree',
        payload: {
          areaId: 'root',
          userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
        },
      })

    }
  }
  const modalProps={
    visible:modalVisible,
    onCancel(){
      dispatch({
        type:'dispatchManagement/hideModal'
      })
    }
  }
  const cancelModalProps={
    visible:cancelDispatchVisible,
    currentItem:currentItem,
    treeData:treeData,
    carBlackData:carBlackData,
    faceBlackData:faceBlackData,
    heimingdan,
    title:currentItem&&currentItem.dispositionMark === '1'?"撤销布控车辆":"撤销人脸布控",

    onChangeRedio(e){
      console.log(e.target.value)
      if(e.target.value==='1'){
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            heimingdan:true,
          }
        })
      }else if(e.target.value==='2'){
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            heimingdan:false,
          }
        })
        dispatch({
          type:'dispatchManagement/blacklist',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
      }
      /*dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          selectValueRedio:e.target.value,
        }
      })*/
    },
    onCancel(){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          cancelDispatchVisible:false,
        }
      })
    },

    onOk(data){//撤控的方法
      data.dispositionId=cancelDispatchId
      console.log(data);
      dispatch({
        type:'dispatchManagement/cancelController',
        payload:{
          data:data,
        }
      })
      /*if(clickType === 'createCar'){
        dispatch({
          type:'dispatchManagement/createDispatch',
          payload:{
            data:data,
          }
        })
      }else if(clickType === 'createFace'){
        dispatch({
          type:'dispatchManagement/createFaceDispatch',
          payload:{
            data:data,
          }
        })
      }*/
    },
  }

  const createCarModalProps={
    item:[],
    previewVisible:previewVisible,
    previewImage:previewImage,
    fileList:previewImage,
    blacklistData:blacklistData,
    visible:createCarVisible,
    treeData:treeData,
    clickType,
    selectValueRedio,
    selectCarData:selectCarData,
    heimingdan,
    dispatch,
    title:clickType==='createCar'?"新建车辆布控任务":'新建人脸布控任务',

    onSelectMap(){//地图选点
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          showMapModel: true,
          mapSelectCameraData:[]
        },
      });
     /* {clickFinish&&onSelectDataShow()}*/
    },
    onChangeSelect(checkedValues){
      let arrCar;
      if(clickType === 'createCar'){
        if(checkedValues){
          checkedValues.map((item)=>{
            arrCar={
              vehicleId:item,
            }
          })
          vehicleIds.push(arrCar);
        }
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            vehicleIds:vehicleIds,
          }
        })
      }else if(clickType === 'createFace'){
        if(checkedValues){
          checkedValues.map((item)=>{
            arrCar={
              personId:item,
            }
          })
          personIds.push(arrCar);
        }
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            personIds:personIds,
          }
        })
      }
    },
    onChangeRedio(e){
      console.log(e.target.value)
      if(e.target.value==='1'){
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            heimingdan:true,
          }
        })
      }else if(e.target.value==='2'){
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            heimingdan:false,
          }
        })
        dispatch({
          type:'dispatchManagement/blacklist',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
      }
      /*dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          selectValueRedio:e.target.value,
        }
      })*/
    },
    onOk(data){
      data.dispositionStartTime=dispositionStartTime
      data.dispositionEndTime=dispositionStartTime
      data.createTime=dispositionStartTime
      data.imageAddress = data.imageAddress?data.imageAddress[0].response.data:'',
      data.dispositionImageURL = data.imageAddress?data.imageAddress:'',
      data.state=''
      data.dispositionMark=dispositionMark,
      data.birthday = birthday ? birthday : ''
      console.log(data);
      if(clickType === 'createCar'){
        dispatch({
          type:'dispatchManagement/createDispatch',
          payload:{
            data:data,
          }
        })
      }else if(clickType === 'createFace'){
        dispatch({
          type:'dispatchManagement/createFaceDispatch',
          payload:{
            data:data,
          }
        })
      }

    },
    onCancel(){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          createCarVisible:false,
        }
      })
    },
    onLoadData(treeNode){
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'dispatchManagement/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',

          },
        });
      }).then((res) => {
        console.log(res)
        if(res){
          treeNode.props.dataRef.children = res
          console.log(treeData)
          dispatch({
            type:'dispatchManagement/updateState',
            payload:{
              treeData: [...treeData],
            },
          })
        }
      });
    },

    onSelect(node,e){
      selectCarData.push(e.props.dataRef)
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          selectCarData:selectCarData
        }
      })
    },
    onDelete(v){
        let panes = selectCarData.filter(pane => pane.nodeId !== v.nodeId);
        console.log(panes);
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            selectCarData:panes
          }
        })
      let newMapSelectCameraData=[]
      for(let i=0;i<mapSelectCameraData.length;i++){
         newMapSelectCameraData = mapSelectCameraData.filter(item => item.SBBH
          !== v.nodeId);
      }
      dispatch({
        type:'gisMap/updateState',
        payload:{
          mapSelectCameraData:newMapSelectCameraData
        }
      })
    },
    handlePreview (file){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        }
      })
    },


  handleCancel (){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          previewVisible: false
        }
      })
  },
    handleChangePhoto (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);

      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

  }

  const createFaceModalProps={
    visible:createFaceVisible,
    clickType,
    heimingdan,
    dispatch,
    title:"新建车辆布控任务",
    onCancel(){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          createFaceVisible:false,
        }
      })
    },
  }

  const filterProps = {
    creatTimeStart:creatTimeStart,
    creatTimeEnd:creatTimeEnd,
    dispositionEndTime:dispositionEndTime,
    curPowers:curPowers,
    dispatch,
    createCarDispatch(){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          createCarVisible:true,
          clickType:'createCar',
          dispositionMark:'1'
        }
      })
      dispatch({
        type:'dispatchManagement/queryTree',
        payload: {
          areaId: 'root',
          userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
        },
      })
      /*dispatch({
        type:'dispatchManagement/blacklist',
        payload:{
          pageNum: '1',
          pageSize: '10',
        }
      })*/
    },
    createFaceDispatch(){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          createCarVisible:true,
          clickType:'createFace',
          dispositionMark:'2'
        }
      })
      dispatch({
        type:'dispatchManagement/queryTree',
        payload: {
          areaId: 'root',
          userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
        },
      })
    },
    onSubmite(data){
      console.log(data);
      dispatch({
        type:'dispatchManagement/query',
        payload:{
          data:data,
        }
      })
    }
  };


  const detailModalProps={
    visible:detailVisible,
    currentItem:currentItem,
    carBlackData:carBlackData,
    faceBlackData:faceBlackData,
    heimingdan,
    dispatch,
    title:"布控详情",
    onChangeRedio(e){
      console.log(e.target.value)
      if(e.target.value==='1'){
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            heimingdan:true,
          }
        })
      }else if(e.target.value==='2'){
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            heimingdan:false,
          }
        })
        dispatch({
          type:'dispatchManagement/blacklist',
          payload:{
            pageNum: '1',
            pageSize: '10'
          }
        })
      }
      /*dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          selectValueRedio:e.target.value,
        }
      })*/
    },
    onCancel(){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          detailVisible:false,
        }
      })
    }
  }
  return (
      <PageHeaderLayout {...pageHeaderProps} className="dispatched-disManagement">
        <Card>
            <Filter  {...filterProps}/>
            <List {...listProps}/>
            {createCarVisible && treeData && clickType && <CreateCarModal {...createCarModalProps}/>}
            {/*{createFaceVisible && <CreateFaceModal {...createFaceModalProps}/>}*/}
            {cancelDispatchVisible && treeData && <CancelModal {...cancelModalProps}/>}
            {detailVisible && currentItem && <DetailModal {...detailModalProps}/>}
          <MapModal />
        </Card>
      </PageHeaderLayout>
  )
}
export default connect(({dispatch, dispatchManagement,loading,gisMap}) => ({
	dispatch,
  dispatchManagement,
	loading,
  gisMap,
}))(DispatchManagement);
