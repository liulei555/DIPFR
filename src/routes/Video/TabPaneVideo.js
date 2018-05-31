import React from 'react';
import {connect} from 'dva';
import {Button, Card, Col, Row, Input, Tabs, Table} from 'antd';

const TabPaneVideo=({...tabPaneProps1})=> {
  const {dataSource,columns}=tabPaneProps1;
  return (
    <Table dataSource={dataSource} columns={columns}/>
  )

}

export default TabPaneVideo;
