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

const Index = ({ location, app }) => {
  let bar_ref;
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    
    series: [{
        name: '访问来源',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '10%'],

        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        }
      },
      {
        name: '访问来源',
        type: 'pie',
        radius: ['60%', '80%'],
        data: [
          { value: 335, name: '直达' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1048, name: '百度' },
          { value: 251, name: '谷歌' },
          { value: 147, name: '必应' },
          { value: 102, name: '其他' }
        ]
      }
    ]
  };

  

  const bar = [];
  setTimeout(function () {
    if(bar_ref){
      bar[0] = echarts.init(bar_ref);
      bar[0].setOption(option)
    }
  },3000);


  return (
    <div className="card card1" style={{width: 600,height:'100%'}}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="青浦区" key="1">
          <div ref={e=>{ bar_ref = e }} style={{width:'100%',height:200}}></div>
        </TabPane>
        <TabPane tab="青浦区" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="青浦区" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    </div>
  );
};

Index.propTypes = {
  
};

export default Index;
