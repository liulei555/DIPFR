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

const CaseArea = ({ location, app, vehicleTotalStatistics }) => {
  
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
      data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21','22', '23', '24']
    }],
    yAxis: [{
      type: 'value'
    }],
    legend: {
      data:['昨日','今日'],
      top:0,
      right:0,
      icon:"rect"
    },
    series: [{
        name: '昨日',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: vehicleTotalStatistics ? vehicleTotalStatistics.YESTERDAY_INTERVAL_HOURS : [],
        itemStyle:{
          normal:{color:'#8bc7ff'}
        }
      },
      {
        name: '今日',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        data: vehicleTotalStatistics ? vehicleTotalStatistics.TODAY_INTERVAL_HOURS : [],
        itemStyle:{
          normal:{color:'#ffcc7f'}
        }
      },

    ]
  };

  

  const bar = [];
  setTimeout(function () {
    if(bar_ref) {
      bar[0] = echarts.init(bar_ref);
      bar[0].setOption(option)
    }
  },3000);
  return (
    <div className="card card1" style={{flex: 1,height:'100%',borderLeft:0}}>
      <div className="card-head">
        <div className="card-title">
          24小时时段过车分析
        </div>
      </div>
      <div className="card-body">
        <div ref={e=>{ bar_ref = e }} style={{width:'100%',height:"80%"}}></div>
      </div>
    </div>
  );
};

CaseArea.propTypes = {
  location: PropTypes.object,
};

export default CaseArea;
