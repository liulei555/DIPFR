import React from 'react';
import {Table,Button} from 'antd';

const List = ({add,remove,update,refresh,...listProps})=>{
	const columns = [
		{
			title: '巡逻名称',
			dataIndex: 'yamc',
			key: 'yamc',
		},
		{
			title: '发布类型',
			dataIndex: 'yafblx',
			key: 'yafblx',
			render:text =>
				<span>{text === '1' ? '个人预案' : (text === '2' ? '公共预案' : '')}</span>
		},
		{
			title: '默认布局',
			dataIndex: 'mrbj',
			key: 'mrbj',
			render:text =>
				<span>{text === 1 ? '1' : (text === 2 ? '4' : '')}</span>
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
	];
	return (
		<div>
			<h1 style={{textAlign:'center'}}>巡逻配置</h1>
			<div style={{marginTop:20,marginBottom:20}}>
				<Button type='primary' onClick={refresh}>刷新</Button>
				<Button type='primary' style={{marginLeft:15}} onClick={add}>新增</Button>
				<Button type='primary' style={{marginLeft:15}} onClick={update}>修改</Button>
				<Button type='danger' style={{marginLeft:15}} onClick={remove}>删除</Button>
			</div>
			<Table size="middle" columns={columns} {...listProps} bordered rowKey={record => record.xh}/>
		</div>
	)
};
export default List;
