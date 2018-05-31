import React from 'react';
import { Col, Row, Progress, Modal } from 'antd';
import moment from 'moment';
import { taskTypeEnum } from '../EnumVideo';

const VideoForm = ({ videoDetail, ...modalProps }) => {

  const { videoName, taskType, taskCompletionRatio, videoStartTime, videoEndTime, deviceNumber, taskCreator, videoDescription } = videoDetail;

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';

  return (
    <Modal {...modalProps}>
      <table className={'task-info'}>
        <tbody>
        <tr>
          <td>任务名称:</td>
          <td colSpan="3">{videoName}</td>
        </tr>
        <tr>
          <td>任务类型:</td>
          <td>{taskTypeEnum[taskType]}</td>
          <td>完成比例:</td>
          <td><Progress percent={Number(taskCompletionRatio)} /></td>
        </tr>
        <tr>
          <td>开始时间:</td>
          <td>{videoStartTime ? moment(videoStartTime).format(dateFormat) : ''}</td>
          <td>结束时间:</td>
          <td>{videoEndTime ? moment(videoEndTime).format(dateFormat) : ''}</td>
        </tr>
        <tr>
          <td>设备编号:</td>
          <td>{deviceNumber}</td>
          <td>创建人员:</td>
          <td>{taskCreator}</td>
        </tr>
        <tr>
          <td>摘要描述:</td>
          <td colSpan="3">{videoDescription}</td>
        </tr>
        </tbody>
      </table>
    </Modal>
  )
};

export default VideoForm;
