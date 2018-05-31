import React from 'react';
import {Table,Button, Input} from 'antd';

const PatrolList = ({showPatrolModal, deletePlanRelation, updatePlanRelationOrder, editable, ...patrolListProps})=>{

  let map = new Map();
  const onValueChange = (value, record) => {
    const obj = {"order":value.target.value, "serialNumber":record.xh};
    map.set(record.xh, obj);
  };

  const updatePlanRelationOrderFN = () => {
    const params = [...map.values()];
    if (params.length !==0 ) {
      updatePlanRelationOrder(params);
    }
  };

	const columns = [
		{
			title: '巡逻名称',
			dataIndex: 'yamc',
			key: 'yamc',
		},
		{
			title: '顺序',
			dataIndex: 'sx',
			key: 'sx',
      align : 'center',
      render: (text, record) => <div>{editable ? <Input style={{width : "100px"}} border="0" defaultValue={text} onChange={(value) => onValueChange(value, record)}/> : text}</div>
		},
	];
	return (
		<div>
			<h1 style={{textAlign:'center'}}>巡逻配置</h1>
			<div style={{marginTop:20,marginBottom:20}}>
				<Button type='primary' onClick={showPatrolModal}>添加巡逻</Button>
				<Button type='danger' style={{marginLeft:15}} onClick={deletePlanRelation}>删除巡逻</Button>
				<Button type='primary' style={{marginLeft:15}} onClick={updatePlanRelationOrderFN}>更改巡逻顺序</Button>
			</div>
			<Table size="middle" columns={columns} bordered {...patrolListProps} rowKey={record => record.xh}/>
		</div>
	)
};
export default PatrolList;
