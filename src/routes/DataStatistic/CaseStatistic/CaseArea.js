/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Table } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';

const TabPane = Tabs.TabPane;

const CaseArea = ({ location, app }) => {
  
  const columns = [
    {
      title: '派出所',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: '案件数',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '同比',
      dataIndex: 'innerLocationCode',
      key: 'innerLocationCode',
    },
    {
      title: '操作',
      dataIndex: 'deviceType',
      key: 'deviceType',
    }
  ];

  const tableProps = {
    dataSource:[],
    columns,
    size: "small"
  }
  return (
    <div className="card card1" style={{width:390,height:'100%'}}>
      <div className="card-head">
        <div className="card-title center">
          案件区域分布统计
        </div>
      </div>
      <div className="card-body">
        <Tabs defaultActiveKey="1">
          <TabPane tab="总计" key="1">
            <Table {...tableProps} />
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
