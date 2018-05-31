import React, { Component, Fragment } from 'react';
import { Button, Icon, Tabs  } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import Top10 from'./Top10'
import Bar from'./Bar'
import CaseArea from'./CaseArea'
import Map1 from'./Map'
import CaseCount from'./CaseCount'
import './index.less'

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;


const Index = ({ dispatch, caseStatistic, loading }) => {
  const pageHeaderProps  = {
    menuList: headhildMenu.dataStatistic,
  }

  return (
    <PageHeaderLayout  {...pageHeaderProps}  className="dataStatistic-caseStatistic">
      <div className="card">
      	<div className="card-head">
					<div className="card-title">
						青浦区案事件线索数量统计
					</div>
					<div className="card-head-right">
						<ButtonGroup>
				      <Button>月度</Button>
				      <Button>季度</Button>
				      <Button>年度</Button>
				    </ButtonGroup>
					</div>
      	</div>
      	<div className="card-body" style={{display: 'flex', height: 425}}>
      		<Top10 />
      		<Bar />
      		<CaseArea/>
      	</div>
      </div>
      <div className="card">
      	<div className="card-head">
					<div className="card-title">
						青浦区案事件趋势统计
					</div>
      	</div>
      	<div className="card-body" style={{display: 'flex', height: 392}}>
      		<Map1 />
      		<CaseCount />
      	</div>
      </div>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, caseStatistic, loading }) => ({
  dispatch,
  caseStatistic,
  loading,
}))(Index);
