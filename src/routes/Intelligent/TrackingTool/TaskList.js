/**
 * 功能描述：任务列表
 * 2018.04.24
 * 作者：xiongmeng
 */
import React from 'react';
import { Table, Icon } from 'antd';
import { taskStatusEnum, pauseType } from '../EnumVideo';

const TaskList = ({ action, ...taskProps }) => {

  const columns = [{
    title: '任务名称',
    dataIndex: 'rowName',
    width: '60%',
  }, {
    title: '任务状态',
    dataIndex: 'taskStatus',
    render: text => taskStatusEnum[Number(text)] || '',
    width: '17%',
  }, {
    title: '操作',
    dataIndex: 'action',
    width: '23%',
    render: (text, record) => {
      if (!record.taskList) {
        return <div>
          {Number(record.taskStatus) === pauseType ? <Icon
            title={'开始任务'}
            type={'caret-right'}
            className={'icon-18-space'}
            onClick={() => {
              action.onStart(record)
            }}
          /> : <Icon
            title={'暂停任务'}
            type={'pause'}
            className={'icon-18-space'}
            onClick={() => {
              action.onPause(record)
            }}
          />}
          <Icon
            title={'设备详情'}
            type={'info'}
            className={'icon-18-space'}
            onClick={() => {
              action.onDetail(record);
            }}
          />
          <Icon
            title={'删除任务'}
            type={'delete'}
            className={'icon-18-space'}
            onClick={() => {
              action.onDelete(record)
            }}
          />
        </div>;
      } else {
        return <div>
          <Icon
            title={'任务详情'}
            type={'info'}
            className={'icon-18-space'}
            onClick={() => {
              action.onTaskDetail(record)
            }}
          />
          <Icon
            title={'修改任务'}
            type={'edit'}
            className={'icon-18-space'}
            onClick={() => {
              action.onEditTask(record)
            }}
          />
          <Icon
            title={'删除任务'}
            type={'delete'}
            className={'icon-18-space'}
            onClick={() => {
              action.onDelTask(record)
            }}
          />
        </div>;
      }
    }
  }];

  return (
    <Table className={'task-table'} columns={columns}  {...taskProps} />
  );
};

export default TaskList;
