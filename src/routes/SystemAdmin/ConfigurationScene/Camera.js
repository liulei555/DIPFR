import React from 'react';
import {Table,Button, Input} from 'antd';

const Camera = ({onSelectMap,showCameraModal, deleteCamera, editable, changeCameraOrder, ...cameraProps})=>{
  let map = new Map();
  const onValueChange = (value, record) => {
    const obj = {"order":value.target.value, "serialNumber":record.serialNumber};
    map.set(record.serialNumber, obj);
  };

  const changeCameraOrderFN = () => {
    const params = [...map.values()];
    if (params.length !==0 ) {
      changeCameraOrder(params);
    }
  };
	const columns = [
		{
			title: '序号',
			dataIndex: 'serialNumber',
			key: 'serialNumber',
		},
		{
			title: '摄像头名称',
			dataIndex: 'cameraName',
			key: 'cameraName',
		},
		{
			title: '隶属单位',
			dataIndex: 'manufacturerName',
			key: 'manufacturerName',
		},
		{
			title: '预置位列表',
			dataIndex: 'presetList',
			key: 'presetList',
		},
		{
			title: '顺序',
			dataIndex: 'order',
			key: 'order',
      render: (text, record) => <div>{editable ? <Input style={{width:"40px", height:"21px"}} defaultValue={text} onChange={(value) => onValueChange(value, record)}/> : text}</div>
		},
	];
	return (
		<div>
			<h1 style={{textAlign:'center'}}>巡逻摄像头</h1>
			<div style={{marginTop:20,marginBottom:20}}>
				<Button type='primary' onClick={showCameraModal}>新增摄像头</Button>
				<Button type='danger' style={{marginLeft:15}} onClick={deleteCamera}>删除摄像头</Button>
				<Button type='primary' style={{marginLeft:15}} onClick ={changeCameraOrderFN}>更改摄像头顺序</Button>
				<Button type='primary' style={{marginLeft:15}} onClick={onSelectMap}>从GIS地图新增</Button>
			</div>
			<Table size="middle" columns={columns} bordered {...cameraProps} rowKey = {record => record.serialNumber}/>
		</div>
	)
};
export default Camera;
