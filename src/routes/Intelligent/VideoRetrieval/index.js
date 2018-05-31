/**
 * 功能描述：视频浓缩摘要
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
import VideoForm from './VideoForm';
import style from './index.less';
import { basicPage10, createType, deleteType, pauseType } from '../EnumVideo';
import Video from '../Video';
import Task from './Task';
import MapModal from '../../GisMap/MapModal';

const Index = ({ dispatch, videoRetrieval, gisMap, loading }) => {

  const { taskList, pagination, searchForm, videoDetail, videoVisible, taskVisible, treeData, selectedPoints } = videoRetrieval;

  const { mapSelectCameraData } = gisMap;

  const pageHeaderProps = {
    menuList: headhildMenu.video,
  };

  const taskModalProps = {
    mapSelectCameraData,
    selectedPoints,
    loading: loading.effects['videoRetrieval/insertTask'],
    visible: taskVisible,
    wrapClassName: style['task-modal'],
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
        type: 'videoRetrieval/insertVideo',
        payload: {
          ...v,
        },
      });
    },
    onCancel: () => {
      dispatch({
        type: 'videoRetrieval/updateState',
        payload: {
          taskVisible: false,
        },
      });
    },
    onDelete: (record) => {
      let data = mapSelectCameraData.filter((item) => item.SBBH !== record.SBBH);
      let points = selectedPoints.filter((item) => item.SBBH !== record.SBBH);
      dispatch({
        type: 'videoRetrieval/updateState',
        payload: {
          selectedPoints: points,
        },
      });
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          mapSelectCameraData: data,
        },
      });
    },
    treeData: treeData,
    onLoadData: (treeNode) => {
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'videoRetrieval/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '',
          },
        });
      }).then((res) => {
        if (res) {
          treeNode.props.dataRef.children = res;
          dispatch({
            type: 'videoRetrieval/updateState',
            payload: {
              treeData: [...treeData],
            },
          });
        }
      });
    },
    onChange: (v, l) => {
      console.log(v, l);
      let points = [];
      v.forEach((o,i) => {
        points.push({NAME: l[i],SBBH:o});
      });
      dispatch({
        type:'videoRetrieval/updateState',
        payload:{
          selectedPoints: points
        }
      })
    },
  };

  /*let expands = [];
  taskList.forEach(item => {
    let child = item.children.map(o => o.rowKey);
    expands.push(item.rowKey, ...child);
  });*/

  const taskProps = {
    loading: loading.effects['videoRetrieval/queryTask'],
    dataSource: taskList,
    pagination: pagination,
    size: 'small',
    rowKey: 'rowKey',
    bordered: true,
    title: () => (<p className={'header-title '}>任务列表</p>),
    indentSize: 12,
    onChange(page) {
      dispatch({
        type: 'videoRetrieval/queryTask',
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
              type: 'videoRetrieval/updateVideo',
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
              type: 'videoRetrieval/updateVideo',
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
              type: 'videoRetrieval/updateVideo',
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
        const { videoName, taskType, taskCompletionRatio, videoStartTime, videoEndTime, deviceNumber, taskCreator, videoDescription } = value;
        dispatch({
          type: 'videoRetrieval/updateState',
          payload: {
            videoVisible: true,
            videoDetail: {
              videoName,
              taskType,
              taskCompletionRatio,
              videoStartTime,
              videoEndTime,
              deviceNumber,
              taskCreator,
              videoDescription,
            },
          },
        });
      },
    },
  };

  const filterProps = {
    searchTask: (v) => {
      dispatch({
        type: 'videoRetrieval/queryTask',
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
        type: 'videoRetrieval/queryTree',
        payload: {
          areaId: 'root',
          userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '',
        },
      });
      dispatch({
        type: 'videoRetrieval/updateState',
        payload: {
          selectedPoints: [],
          taskVisible: true,
        },
      });
    },
  };

  const videoModalProps = {
    videoDetail,
    visible: videoVisible,
    title: '任务详情',
    wrapClassName: style['video-modal'],
    footer: null,
    width: 600,
    onCancel: () => {
      dispatch({
        type: 'videoRetrieval/updateState',
        payload: {
          videoVisible: false,
          videoDetail: {},
        },
      });
    },
  };

  return (
    <PageHeaderLayout {...pageHeaderProps} className={'video-videoRetrieval'}>
      <Task {...taskModalProps} />
      <VideoForm {...videoModalProps} />
      <MapModal />
      <Row className={`${style.retrieval} ${style.pubHeight}`} gutter={15}>
        <Col span={7}>
          <Row>
            <Filter {...filterProps} />
            <TaskList {...taskProps} />
            <Row type={'flex'} justify={'center'} className={'box'}>
              <Button type="primary" className={'button-space-all'}>继续分析</Button>
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

export default connect(({ dispatch, videoRetrieval, gisMap, loading }) => ({
  dispatch,
  videoRetrieval,
  gisMap,
  loading,
}))(Index);
