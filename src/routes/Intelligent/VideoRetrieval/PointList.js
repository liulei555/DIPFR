/**
 * 功能描述：点位列表
 * 2018.04.24
 * 作者：xiongmeng
 */
import React from 'react';
import { Table, Icon } from 'antd';

const PointList = ({ onDelete, ...listProps }) => {

  const columns = [{
    title: '点位名称',
    dataIndex: 'NAME',
    width: '45%',
  }, {
    title: '文件大小',
    dataIndex: 'size',
    width: '35%',
  }, {
    title: '操作',
    dataIndex: 'action',
    width: '20%',
    render: (text, record) => (
      <Icon
        type={'delete'}
        className={'icon-18-space'}
        onClick={() => {
          onDelete(record)
        }}
      />
    )
  }];

  return (
    <Table columns={columns}  {...listProps} />
  );
};

export default PointList;
