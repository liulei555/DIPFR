import React from 'react';
import {Table,Button,Modal} from 'antd';

const PatrolModal = ({...patrolModalProps})=>{
	const columns = [
		{
			title: '预案编号',
			dataIndex: 'planNumber',
			key: 'planNumber',
		},
		{
			title: '预案名称',
			dataIndex: 'planName',
			key: 'planName',
		}
	];
	return (
		<Modal {...patrolModalProps}>
			<Table columns={columns} {...patrolModalProps} bordered rowKey={record => record.serialNumber}/>
		</Modal>
	)
};
export default PatrolModal;