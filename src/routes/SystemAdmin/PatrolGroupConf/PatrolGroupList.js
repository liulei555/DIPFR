import React from 'react';
import {Table,Button} from 'antd';

const PatrolGroupList = ({
	                         refresh,
							 add,
	                         update,
							 remove,
	                         ...listProps
})=>{
	const columns = [
		{
			title: '巡逻组名称',
			dataIndex: 'yamc',
			key: 'yamc',
		},
		{
			title: '自动启动时间',
			dataIndex: 'zdqdsj',
			key: 'zdqdsj',
		},
		{
			title: '间隔时间(秒)',
			dataIndex: 'jgsj',
			key: 'jgsj',
		},
		{
			title: '默认布局',
			dataIndex: 'mrbj',
			key: 'mrbj',
			render:text =>
				<span>{text === 1 ? '1' : (text === 2 ? '4' : '')}</span>
		}
	];
	return (
		<div>
			<h1 style={{textAlign:'center'}}>巡逻组配置</h1>
			<div style={{marginTop:20,marginBottom:20}}>
				<Button type='primary' onClick={refresh}>刷新</Button>
				<Button type='primary' style={{marginLeft:15}} onClick={add}>新增</Button>
				<Button type='primary' style={{marginLeft:15}} onClick={update}>修改</Button>
				<Button type='danger' style={{marginLeft:15}} onClick={remove}>删除</Button>
			</div>
			<Table size="middle" columns={columns} bordered {...listProps} rowKey={record => record.xh}/>
		</div>
	)
};
export default PatrolGroupList;
