import React from 'react';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
const PersonFrequency = () => {
	const pageHeaderProps  = {
		menuList: headhildMenu.spaceTime,
	};
	let url = 'http://172.20.22.16:9089/vias_app/views/vias/snapshot/person/personFrequency.html';
	return (
		<PageHeaderLayout {...pageHeaderProps} style={{width:'100%',height:'100%'}}>
			<div style={{height:'100%',width:'100%'}}>
				<iframe src={url} width={'100%'}  height={'100%'}/>
			</div>
		</PageHeaderLayout>
	);
};
export default PersonFrequency;

