/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';
const List = ({ location, app, ...deviceListProps }) => {
  // location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '设备ID',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '内部位置代码',
      dataIndex: 'innerLocationCode',
      key: 'innerLocationCode',
      width: 120
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType',
      width: 100,
      render:text => <span>{text === '4' ? '卡口':(text === '5' ? '摄像头' : (text === '14' ? '硬盘录像机' : (text === '15' ? '视频矩阵' : (text === '3' ? '3G电警' : ''))))}</span>
    },
    {
      title: '内部设备编号',
      dataIndex: 'deviceNumber',
      key: 'deviceNumber',
      width: 120
    },
  ];
  return (
    <div style={{}}>
      <Table
        {...deviceListProps}
        bordered
        size="middle"
        scroll={{ x: 700 }}
        columns={columns}
        rowKey={record => record.serialNumber}
      />
    </div>
  );
};

List.propTypes = {
  location: PropTypes.object,
};

export default List;
