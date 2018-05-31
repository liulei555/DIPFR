/**
 * 功能描述：智能追踪工具
 * 2018.04.24
 * 作者：xiongmeng
 */
import React from 'react';
import { connect } from 'dva';
import { Col, Row, Modal, Button } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import TaskList from './TaskList';
import Filter from './Filter';
import PointForm from './PointForm';
import style from './index.less';
import { basicPage10, deleteType, pauseType, createType } from '../EnumVideo';
import Video from '../Video';
import Task from './Task';
import MapModal from '../../GisMap/MapModal';

const Index = ({ dispatch, trackingTool, gisMap, loading }) => {

  const { taskList, pagination, searchForm, pointVisible, pointDetail, taskVisible } = trackingTool;

  const { mapSelectCameraData } = gisMap;

  const pageHeaderProps = {
    menuList: headhildMenu.video,
  };

  const pointModalProps = {
    pointDetail,
    visible: pointVisible,
    wrapClassName: style['point-modal'],
    footer: null,
    width: 330,
    onCancel: () => {
      dispatch({
        type: 'trackingTool/updateState',
        payload: {
          pointVisible: false,
        },
      });
    },
  };

  const taskModalProps = {
    loading: loading.effects['trackingTool/insertTask'],
    visible: taskVisible,
    mapSelectCameraData,
    onSelectMap: () => {
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          showMapModel: true,
          mapSelectCameraData: [],
        },
      });
    },
    onCreate: (v) => {
      dispatch({
        type: 'trackingTool/insertTask',
        payload: {
          ...v,
        },
      });
    },
    onCancel: () => {
      dispatch({
        type: 'trackingTool/updateState',
        payload: {
          taskVisible: false,
        },
      });
    },
    onDelete: (record) => {
      let data = mapSelectCameraData.filter((item) => item.SBBH !== record.SBBH);
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          mapSelectCameraData: data,
        },
      });
    },
  };

  const taskProps = {
    loading: loading.effects['trackingTool/queryTask'],
    dataSource: taskList,
    pagination: pagination,
    size: 'small',
    title: () => (<p className={'header-title '}>任务列表</p>),
    childrenColumnName: 'taskList',
    rowKey: 'rowKey',
    bordered: true,
    onChange(page) {
      dispatch({
        type: 'trackingTool/queryTask',
        payload: {
          ...searchForm,
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
        },
      });
    },
    action: {
      onStart: (value) => {
        Modal.confirm({
          title: '提示',
          content: '确定开始该视频任务？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            dispatch({
              type: 'trackingTool/updateVideo',
              payload: {
                taskNumber: value.taskNumber,
                taskStatus: createType,
              },
            });
          },
          onCancel() {
          },
        });
      },
      onPause: (value) => {
        Modal.confirm({
          title: '提示',
          content: '确定终止该视频任务？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            dispatch({
              type: 'trackingTool/updateVideo',
              payload: {
                taskNumber: value.taskNumber,
                taskStatus: pauseType,
              },
            });
          },
          onCancel() {
          },
        });
      },
      onDelete: (value) => {
        Modal.confirm({
          title: '提示',
          content: '确定删除该视频任务？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({
              type: 'trackingTool/updateVideo',
              payload: {
                taskNumber: value.taskNumber,
                taskStatus: deleteType,
              },
            });
          },
          onCancel() {
          },
        });
      },
      onDetail: (value) => {
        dispatch({
          type: 'trackingTool/queryPointInfo',
          payload: {
            deviceNumber: value.deviceNumber,
          },
        });
      },
      onTaskDetail: (value) => {

      },
      onEditTask: (value) => {

      },
      onDelTask: (value) => {
        Modal.confirm({
          title: '提示',
          content: '您确定要删除勾选的任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({
              type: 'trackingTool/deleteTask',
              payload: {
                trackNumber: value.trackNumber,
              },
            });
          },
          onCancel() {
          },
        });
      },
    },
  };

  const filterProps = {
    searchTask: (v) => {
      dispatch({
        type: 'trackingTool/queryTask',
        payload: {
          ...v,
          ...basicPage10,
        },
      });
    },
    addTask: () => {
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          mapSelectCameraData: [],
        },
      });
      dispatch({
        type: 'trackingTool/updateState',
        payload: {
          taskVisible: true,
        },
      });
    },
  };

  return (
    <PageHeaderLayout {...pageHeaderProps} className={'video-trackingTool'}>
      <Task {...taskModalProps} />
      <PointForm {...pointModalProps} />
      <MapModal/>
      <Row className={`${style.tracking} ${style.pubHeight}`} gutter={15}>
        <Col span={7}>
          <Row>
            <Filter {...filterProps} />
            <TaskList {...taskProps} />
            <Row type={'flex'} justify={'center'} className={'box'}>
              <Button type="primary" className={'button-space-all'}>继续追踪</Button>
              <Button type="primary" className={'button-space-all'}>视频取证</Button>
              <Button type="primary" className={'button-space-all'}>图片取证</Button>
              <Button type="primary" className={'button-space-all'}>轨迹分析</Button>
            </Row>
          </Row>
        </Col>
        <Col span={17} className={style.pubHeight}>
          <Video />
        </Col>
      </Row>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, trackingTool, gisMap, loading }) => ({
  dispatch,
  trackingTool,
  gisMap,
  loading,
}))(Index);
