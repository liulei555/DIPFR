import React from 'react';
import { connect } from 'dva'
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import Filter from './Filter'
import List from './List'
import DetailModal from './Modal'
import {headhildMenu} from "../../common/menu";
import {Card} from 'antd'
const MobileMac=({dispatch,mobileMac})=>{
	const {list,pagination,value,modalVisible,currentItem,preButtonType,nextButtonType} = mobileMac;
  const pageHeaderProps  = {
    menuList: headhildMenu.dispatchedAlarm,
  };
  const filterProps = {
  	search(value){
  		dispatch({
			  type:'mobileMac/updateState',
			  payload:{
			  	value:value
			  }
		  });
		  dispatch({
			  type:'mobileMac/query',
			  payload:{
				  pageNum:'1',
				  pageSize:'10',
				  startTime:value.timePicker ? value.timePicker[0] : '',
				  endTime:value.timePicker ? value.timePicker[1] : '',
				  phoneImsi:value.phoneImsi ? value.phoneImsi : '',
				  phoneMac:value.phoneMac ? value.phoneMac : '',
				  siteNumber:value.siteNumber ? value.siteNumber : '',
				  suspectedVehicle:value.suspectedVehicle ? value.suspectedVehicle : '',
				  processingResult:value.processingResult ? value.processingResult : '',
				  drivingDirection:value.drivingDirection ? value.drivingDirection : '',
			  }
		  })
	  }
  };
  const listProps={
		dataSource:list,
	  pagination:pagination,
	  rowKey:record => record.id,
	  onChange(page){
			dispatch({
				type:'mobileMac/query',
				payload:{
					pageNum:page.current+'',
					pageSize:page.pageSize+'',
					startTime:'',
					endTime:'',
					dispositionTitle:'',
					phoneMac:'',
				}
			})
	  },
	  showModal(record){
		  dispatch({
			  type:'mobileMac/showModal',
			  payload:{
					currentItem:record
			  }
		  });
		  if(record.ROW_ID === list[list.length-1].ROW_ID){
			  dispatch({
				  type:'mobileMac/updateState',
				  payload:{
					  nextButtonType:true
				  }
			  });

		  }
		  if(record.ROW_ID === list[0].ROW_ID){
			  dispatch({
				  type:'mobileMac/updateState',
				  payload:{
					  preButtonType:true
				  }
			  });

		  }
	  },
	  exportPhoneMacList(){
		  dispatch({
			  type:'mobileMac/exportPhoneMacList',
			  payload:{
				  pageNum:'1',
				  pageSize:'10',
				  startTime:value && value.timePicker ? value.timePicker[0] : '',
				  endTime:value && value.timePicker ? value.timePicker[1] : '',
				  phoneImsi:value && value.phoneImsi ? value.phoneImsi : '',
				  phoneMac:value && value.phoneMac ? value.phoneMac : '',
				  siteNumber:value && value.siteNumber ? value.siteNumber : '',
				  suspectedVehicle:value && value.suspectedVehicle ? value.suspectedVehicle : '',
				  processingResult:value && value.processingResult ? value.processingResult : '',
				  drivingDirection:value && value.drivingDirection ? value.drivingDirection : '',
			  }
		  })
	  }
  };
  const modalProps = {
  	visible:modalVisible,
	  title:'手机告警信息',
	  currentItem,
	  preButtonType,
	  nextButtonType,
	  preOne(){
  		let preId = '';
		  dispatch({
			  type:'mobileMac/updateState',
			  payload:{
				  nextButtonType:false
			  }
		  });
		  if(currentItem.ROW_ID-1 !== list[0].ROW_ID){
			  for(let i=0;i<list.length;i++){
				  console.log(list[i].ROW_ID);
				  console.log(currentItem.ROW_ID - 1);
				  if(list[i].ROW_ID === (currentItem.ROW_ID - 1)){
					  preId = list[i].id;
				  }
			  }
			  dispatch({
				  type:'mobileMac/queryPhoneMacInfo',
				  payload:preId
			  })
		  }else{
			  dispatch({
				  type:'mobileMac/updateState',
				  payload:{
					  preButtonType:true
				  }
			  });
			  dispatch({
				  type:'mobileMac/queryPhoneMacInfo',
				  payload:preId
			  })
		  }
	  },
	  nextOne(){
	  	let nextId = '';
		  dispatch({
			  type:'mobileMac/updateState',
			  payload:{
				  preButtonType:false
			  }
		  });
  		if(currentItem.ROW_ID+1 !== list[list.length-1].ROW_ID){
			  for(let i=0;i<list.length;i++){
				  if(list[i].ROW_ID === currentItem.ROW_ID + 1){
					  nextId = list[i].id;
				  }
			  }
			  dispatch({
				  type:'mobileMac/queryPhoneMacInfo',
				  payload:nextId
			  })
		  }else{
  			dispatch({
				  type:'mobileMac/updateState',
				  payload:{
					  nextButtonType:true
				  }
			  });
			  dispatch({
				  type:'mobileMac/queryPhoneMacInfo',
				  payload:nextId
			  })
		  }
	  },
	  update(value){
		  dispatch({
			  type:'mobileMac/hideModal',
			  payload:{
				  nextButtonType:false,
				  preButtonType:false
			  }
		  });
		  dispatch({
			  type:'mobileMac/updatePhoneMacInfo',
			  payload:{
			  	id:currentItem.id,
				  processingOpinion:value.processingOpinion ? value.processingOpinion : '',
				  processingResult:value.processingResult ? value.processingResult : ''
			  }
		  })
	  },
	  onCancel(){
		  dispatch({
			  type:'mobileMac/hideModal',
			  payload:{
				  nextButtonType:false,
				  preButtonType:false
			  }
		  });
	  }
  };
  return (
    <PageHeaderLayout {...pageHeaderProps} class="dispatched-mobileMac">
      <Card>
        <Filter {...filterProps}/>
        <List {...listProps}/>
        <DetailModal {...modalProps}/>
      </Card>
    </PageHeaderLayout>
  )
};
export default connect(({dispatch, mobileMac,loading}) => ({
	dispatch,
	mobileMac,
	loading,
}))(MobileMac);
