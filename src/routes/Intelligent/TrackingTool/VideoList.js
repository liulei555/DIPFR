/**
 * 功能描述：视频列表
 * 2018.04.24
 * 作者：xiongmeng
 */
import React from 'react';
import { Icon, Table, Progress } from 'antd';
import { taskStatusEnum } from '../EnumVideo';

const VideoList = ({ action, ...videoProps }) => {

  const columns = [{
    title: '视频任务名称',
    dataIndex: 'videoName',
    width: '14%',
  }, {
    title: '状态',
    dataIndex: 'taskStatus',
    width: '20%',
    render: text => taskStatusEnum[Number(text)] || '',
  }, {
    title: '完成比例',
    dataIndex: 'taskCompletionRatio',
    width: '20%',
    render: (text) => (<Progress percent={Number(text)}/>),
  }, {
    title: '操作',
    dataIndex: 'action',
    width: '9%',
    render: (text, record) => (
      <div>
        <Icon
          type={'pause-circle-o'}
          className={'icon-18-space'}
          onClick={() => {
            action.onPause(record);
          }}
        />
        <Icon
          type={'close-circle-o'}
          className={'icon-18-space'}
          onClick={() => {
            action.onDelete(record);
          }}
        />
        <Icon
          type={'info-circle-o'}
          className={'icon-18-space'}
          onClick={() => {
            action.onDetail(record);
          }}
        />
      </div>
    ),
  }, {
    title: '目标',
    dataIndex: 'ext9',
  }];

  const title = () => (<p className={'header-title'}>检索视频</p>);

  return (
    <Table {...videoProps} title={title} className={'task-table'} columns={columns}/>
  );
};

const styles = {
  table: {
    marginTop: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  title: {
    margin: 0,
    textAlign: 'center',
    fontSize: '18px',
  },
  icon: {
    fontSize: '18px',
    cursor: 'pointer',
    margin: '0 4px',
  },
};

export default VideoList;
