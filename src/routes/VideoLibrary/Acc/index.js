import React from 'react';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
const VideoAcc = () => {
	const pageHeaderProps  = {
		menuList: headhildMenu.videoLibrary,
	};
	let url = 'https://172.20.25.49:4433/acc/';
	return (
		<PageHeaderLayout {...pageHeaderProps} style={{width:'100%',height:'500px'}}>
			<div >
				<iframe src={url} width={'100%'}  height={'800px'}/>
			</div>
		</PageHeaderLayout>
	);
};
export default VideoAcc;

