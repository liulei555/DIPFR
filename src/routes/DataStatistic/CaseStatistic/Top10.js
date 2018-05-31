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

const Top10 = ({ location, app }) => {
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: '警号',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '归属单位',
      dataIndex: 'innerLocationCode',
      key: 'innerLocationCode',
    },
    {
      title: '上传线索数',
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
    <div className="card card1" style={{width:410,height:'100%'}}>
      <div className="card-head">
        <div className="card-title center">
          警员贡献 TOP10
        </div>
      </div>
      <div className="card-body">
        <Tabs defaultActiveKey="1">
          <TabPane tab="青浦区" key="1">
            <Table {...tableProps} />
          </TabPane>
          <TabPane tab="青浦区" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="青浦区" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </div>
    </div>
  );
};

Top10.propTypes = {
  location: PropTypes.object,
};

export default Top10;
