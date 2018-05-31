/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs,Row,Col } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';
import echarts from 'echarts'

const TabPane = Tabs.TabPane;

const Index = ({ location, app }) => {

  let pie_ref1;
  let pie_ref2;
  // let barWidth = 15;
  // let caseColor = '#86aee3';
  // let cluesColor = '#99ccff';
  // let addColor = '#ffcc7f';
  const option1 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    labelLine: {
      normal: {
          show: false
      }
    },
    label: {
      normal: {
        position: 'inner'
      }
    },
    legend: {
        orient: 'horizontal',
        x: 'right',
        y: 'top',
        data:['沪牌','外牌']
    },
    title: {
      text:'昨日流入\n29777',
      left:'center',
      top:'45%',
      textStyle:{
        color:'#031f2d',
        align:'center',
      }
    },
    series: [{
      name:'车流统计',
      type:'pie',
      radius: ['60%', '80%'],
      avoidLabelOverlap: false,
      label: {
          normal: {
              show: false,
              position: 'center'
          },
          emphasis: {
              show: true,
              textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
              }
          }
      },
      labelLine: {
          normal: {
              show: false
          }
      },
      label: {
        normal: {
          position: 'inner'
        }
      },
      data:[
        {value:335, name:'沪牌',
        itemStyle:{
          normal:{color:'#2295ff'}
        }},
        {value:310, name:'外牌',
        itemStyle:{
          normal:{color:'#c1dfff'}
        }}
      ]
    },
  ]
};


const option2 = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
},
labelLine: {
  normal: {
      show: false
  }
},
label: {
  normal: {
    position: 'inner'
  }
    },
    legend: {
        orient: 'horizontal',
        x: 'right',
        y: 'top',
        data:['沪牌','外牌']
    },
    title: {
      text:'昨日流入\n29777',
      left:'center',
      top:'45%',
      textStyle:{
        color:'#031f2d',
        align:'center',
      }
    },
    series: [{
      name:'车流统计',
      type:'pie',
      radius: ['60%', '80%'],
      avoidLabelOverlap: false,
      label: {
          normal: {
              show: false,
              position: 'center'
          },
          emphasis: {
              show: true,
              textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
              }
          }
      },
      labelLine: {
          normal: {
              show: false
          }
      },
      label: {
        normal: {
          position: 'inner'
        }
      },
      data:[
        {value:335, name:'沪牌',
        itemStyle:{
          normal:{color:'#2295ff'}
        }},
        {value:310, name:'外牌',
        itemStyle:{
          normal:{color:'#c1dfff'}
        }}
      ]
    }]
};



const pie = [];
setTimeout(function () {
  if(pie_ref1 && pie_ref2){
    pie[0] = echarts.init(pie_ref1);
    pie[0].setOption(option1)
    pie[1] = echarts.init(pie_ref2);
    pie[1].setOption(option2)
  }
},3000);


  return (
    <div className="card card1" style={{width:410,height:'100%'}}>
      <div className="card-head">
        <div className="card-title center">
          车辆预警统计
        </div>
      </div>
      <div className="card-body">
        <Tabs defaultActiveKey="1" style={{height:"100%"}}>
          <TabPane tab="车流统计" key="1" style={{height:"100%"}}>
            <Row style={{height:"100%"}}>
              <Col span={12} style={{height:"100%"}}>
                <div ref={e=>{ pie_ref1 = e }} style={{width:'100%',height:'100%'}}></div>
              </Col>
              <Col span={12} style={{height:"100%"}}>
                <div ref={e=>{ pie_ref2 = e }} style={{width:'100%',height:'100%'}}></div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="车辆预警" key="2">Content of Tab Pane 2</TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
