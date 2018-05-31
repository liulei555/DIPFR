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

const Bar = ({ location, app }) => {
  let bar_ref;
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
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      top: 15,
      right: 35,
      data: ['案件数', '线索数', '增量']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
        name: '案件数',
        type: 'bar',
        barWidth: barWidth,
        itemStyle: {
          normal: {
            color: caseColor,
          }
        },
        stack: '案件',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '增量',
        type: 'bar',
        barWidth: barWidth,
        itemStyle: {
          normal: {
            color: addColor,
          }
        },
        label: labelOption,
        stack: '案件',
        data: [20, 82, 91, 34, 90, 30, 10]
      },
      {
        name: '线索数',
        type: 'bar',
        barWidth: barWidth,
        itemStyle: {
          normal: {
            color: cluesColor,
          }
        },
        stack: '线索',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '增量',
        type: 'bar',
        barWidth: barWidth,
        itemStyle: {
          normal: {
            color: addColor,
          }
        },
        label: labelOption,
        stack: '线索',
        data: [0, 82, 91, 34, 90, 30, 10]
      }
    ]
  };

  

  const bar = [];
  setTimeout(function () {
    bar[0] = echarts.init(bar_ref);
    bar[0].setOption(option)
  },2500);


  return (
    <div className="card card1" style={{flex: 1,height:'100%',borderRight:0,borderLeft:0}}>
      <div ref={e=>{ bar_ref = e }} style={{width:'100%',height:'100%'}}></div>
    </div>
  );
};

Bar.propTypes = {
  
};

export default Bar;
