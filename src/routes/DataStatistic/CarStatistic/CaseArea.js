/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Table,Row,Col,Button } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';

const TabPane = Tabs.TabPane;

const CaseArea = ({ location, app , bayonetVehicleCount, bayonetVehicleList}) => {

  const columns = [
    {
      title: '卡口名称',
      dataIndex: 'bayonetName',
      key: 'bayonetName',
    },
    {
      title: '卡口车流量',
      key: 'vehicleFlow',
      render:(record) => {
        return (
          <span style={{color:"#8bc7ff"}}>{record.vehicleFlow}</span>
        )
      }
    },
    {
      title: '归属区域',
      dataIndex: 'areaName',
      key: 'areaName',
    }
  ];


  const tableProps = {
    dataSource:bayonetVehicleList.data,
    columns,
    size: "small"
  }
  return (
    <div className="card card1" style={{width:390,height:'100%',marginLeft:"7px"}}>
      <div className="card-head" style={{paddingLeft:"0px",paddingRight:"0px",background:"#f5f6f7"}}>
        <div className="card-title" style={{paddingLeft:"18px"}}>
          今日卡口过车情况
        </div>
      </div>
      <Row>
      <Col span={16} offset={1}>
        <span style={{width:"100%",textAlign:"center",fontSize:"20px",fontWeight:"bold",height:"55px",lineHeight:"55px"}}><span style={{fontWeight:"500"}}>总量： </span>{bayonetVehicleCount ? bayonetVehicleCount.totalFlow : ""}</span>
      </Col>
      <Col span={4}>
        <Button type="primary" size="small" style={{marginTop:"15px"}}>导出列表</Button>
      </Col>
      </Row>
      <div className="card-body">
        <Table {...tableProps} rowKey={record => record.ROW_ID}/>
      </div>
    </div>
  );
};

CaseArea.propTypes = {
  location: PropTypes.object,
};

export default CaseArea;
