/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';
const List = ({ location, app, ...tableProps }) => {
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
      width: 100
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
        {...tableProps}
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
