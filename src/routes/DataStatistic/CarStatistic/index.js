import React, { Component, Fragment } from 'react';
import { Button, Icon, Tabs ,Row,Col} from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import Statistic from'./statistic'
import Bar from'./Bar'
import CaseArea from'./CaseArea'
import Map1 from'./Map'
import CaseCount from'./CaseCount'
import './index.less'

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;


const Index = ({ dispatch, carStatistic, loading }) => {
	const {bayonetVehicleCount, bayonetVehicleList,vehicleTotalStatistics} = carStatistic

  const pageHeaderProps  = {
    menuList: headhildMenu.dataStatistic,
  }

  return (
    <PageHeaderLayout {...pageHeaderProps} className="dataStatistic-carStatistic">
      <div className="card">
      	<div className="card-head">
					<div className="card-title">
						青浦区案卡口车流量统计
					</div>
      	</div>
      	
				  <Row>
						<Col span={19}>
							<Row>
							<div className="card-body" style={{display: 'flex', height: 425}}>
								<Statistic {...{vehicleTotalStatistics}}/>
								<CaseCount {...{vehicleTotalStatistics}}/>
								</div>
							</Row>
							<Row>
								<div className="card">
									<div className="card-head">
										<div className="card-title">
											青浦区咯街镇车流量数据统计
										</div>
									</div>
									<div className="card-body" style={{display: 'flex', height: 392}}>
										<Bar />
									</div>
								</div>
							</Row>
						</Col>
						<Col span={5}>
						  <CaseArea {...{bayonetVehicleCount, bayonetVehicleList}}/>
						</Col>
					</Row>
      	
      </div>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, carStatistic, loading }) => ({
  dispatch,
  carStatistic,
  loading,
}))(Index);

