import React from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Row,Col,Card} from 'antd';
import style from './index.less'
import LeftOn from './LeftOn'
import CenterUp from './CenterUp'
import Down from './Down'
const MyCharts = () =>{
	return (
		<PageHeaderLayout style={{height:'100%'}}>
			<div className={style.kakou} >
				<Row style={{height:'100%'}}>
					<Col span={6} style={{height:'100%'}}>
						<Card style={{height:'100%'}} bodyStyle={{padding:0}}>
							<LeftOn/>
						</Card>
					</Col>
					<Col span={12} style={{height:'100%'}}>
						<Card bordered={true} style={{height:'100%'}} bodyStyle={{padding:0}}>
							<CenterUp/>
						</Card>
					</Col>
					<Col span={6}>
						<Card  bordered={true} bodyStyle={{padding:0}}/>
					</Col>
				</Row>
				<Row style={{height:'100%'}}>

					<Col span={24} style={{height:'100%'}}>
						<Card bordered={true} style={{height:'100%'}} bodyStyle={{padding:0}}>
							<Down/>
						</Card>
					</Col>
				</Row>
			</div>
		</PageHeaderLayout>
	)
};
export default MyCharts;


