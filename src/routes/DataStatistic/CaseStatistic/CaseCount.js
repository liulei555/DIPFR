/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Table } from 'antd';
import echarts from 'echarts'
import 'echarts/lib/chart/bar'
import styles from './index.less';

const TabPane = Tabs.TabPane;

const CaseArea = ({ location, app }) => {
  
  let bar_ref;
  let bar_ref2;
  let barWidth = 15;
  let caseColor = '#86aee3';
  let cluesColor = '#99ccff';
  let addColor = '#ffcc7f';
  let labelOption = {
    normal: {
      show: true,
      position: 'top',
      formatter: '+{c}',
      fontSize: 16,
      color: '#314659'
    }
  };
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      top: 15,
      left: 15,
      right: 15,
      bottom: 15,
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '去年',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [0, 32, 1, 4, 90, 30, 10]
      },
      {
        name: '今年',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: [20, 82, 91, 34, 90, 30, 10]
      },

    ]
  };

  

  const bar = [];
  setTimeout(function () {
    bar[0] = echarts.init(bar_ref);
    bar[0].setOption(option)
    bar[1] = echarts.init(bar_ref2);
    bar[1].setOption(option)
  },2500);
  return (
    <div className="card card1" style={{flex: 1,height:'100%',borderLeft:0}}>
      <div className="card-head">
        <div className="card-title">
          案件数
        </div>
      </div>
      <div className="card-body">
        <Tabs defaultActiveKey="1">
          <TabPane tab="总计" key="1">
            <div ref={e=>{ bar_ref = e }} style={{width:'100%',height: 140}}></div>
            <div ref={e=>{ bar_ref2 = e }} style={{width:'100%',height: 140}}></div>
          </TabPane>
          <TabPane tab="抢劫" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="偷到" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </div>
    </div>
  );
};

CaseArea.propTypes = {
  location: PropTypes.object,
};

export default CaseArea;
