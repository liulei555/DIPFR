import React from 'react';
import {connect} from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {Col, Row, Tabs, Modal, Message, Form} from 'antd';
import {headhildMenu} from '../../../common/menu';
import * as styles from './index.less';
import List from './List'
import Filter from './Filter';
import Option from './Option';
import config from '../../../config';
import Video from '../../../components/Video/Video';
import Offline from './Offline'
import HistoryModal from './HistoryModal';
import Operatable from '../Operatable';
import MapModal from '../../GisMap/MapModal';

const TabPane = Tabs.TabPane;
const index = ({dispatch, videoHistory, video, loading, form: {getFieldDecorator, getFieldsValue, validateFields, resetFields}}) => {
  const pageHeaderProps = {
    menuList: headhildMenu.video,
  };
  const {treeData, controlFlag, onlineInfo, offlineInfo, treeVal, mapFlag, pageTurning, playInfo} = video;
  const startVideo = () => {
    dispatch({
      type: 'video/updateState',
      payload: {
        controlFlag: !controlFlag,
      }
    });
    let videoCtrl = document.querySelector("#HisVideo");
    if (videoCtrl && videoCtrl.MS_StartClient) {
      let result = videoCtrl.MS_StartClient('SUPPER_NONEED_USER', '');
      if (result !== 0) {
        Message.info("MS_StartClient接口错误！错误码" + result);
        return;
      } else {
        videoCtrl.MS_SetCurrentLayout(2);
        videoCtrl.MS_SetCurrentLayout(4);
      }
    } else {
      return Message.info('当前浏览器不支持播放该视频');
    }
  };
  const goToVideo = (drviceID) => {
    if (!controlFlag) {
      startVideo();
    }
    let videoCtrl = document.getElementById('HisVideo');
    // 缺少获取当前布局信息
    if (videoCtrl.MS_SetLayoutMode) {
      videoCtrl.MS_SetLayoutMode(2);
      let layoutNum = videoCtrl.MS_GetLayoutState();
      // 获取当前播放窗口索引
      let playIndex = videoCtrl.MS_GetCurrentWindow;
      console.log(playIndex, 'playIndex')
      let playid = videoCtrl.MS_SetCameraToCurrentWindowAsyn(drviceID, playIndex);
      if (playid < 0) {
        Message.info('MS_SetCameraToWindow接口错误！错误码' + playid);
        return;
      }
    } else {
      Message.info('当前浏览器不支持设备视频播放！');
    }
  };
  const treeProps = {
    dispatch,
    treeData,
    mapFlag,
    selectedKeys: [],
    onSelect: (selectedKeys, info) => {
      // debugger
      console.log('onSelect', selectedKeys);
      // id =selectedKeys;
      const ID = '71000000001320000008';
      // goToVideo(ID);
    },
    onChange: (value) => {
      // debugger
      dispatch({
        type: 'video/updateState',
        payload: {
          treeVal: value
        }
      })
    },
    treeVal,
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'video/query',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
          },
        });
      }).then((res) => {
        if (res) {
          treeNode.props.dataRef.children = res;
          dispatch({
            type: 'video/updateState',
            payload: {
              treeData: [...treeData],
            },
          });
        }
      });
    },
  }
  const videoProps = {
    dispatch,
    controlFlag,
    screenNum: 6,
    playInfo,
    screenIndex: 0,
    pageTurning,
    goToVideo,
  };
  const modalProps = {
    title: '视频取证',
    okText: '确认',
    cancelText: '取消',
    visible: videoHistory.visible,
    width: 600,
    wrapClassName: 'historyModal',
    onCancel: () => {
      dispatch({type: 'videoHistory/save', payload: {visible: false}})
    },
  }
  // 回放列表props
  let onlineStream;
  const onlineProps = {
    submit: (val) => {
      validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        } else {
          return;
        }
        console.log(values, 'history')
        let data = {
          ...values,
          deviceIDs: values.deviceIDs || '71000000001320000008',
          startTime: values.startTime.format('YYYY,MM,DD,HH,mm,ss'),
          endTime: values.endTime.format('YYYY,MM,DD,HH,mm,ss'),
        };
        dispatch({
          type: 'video/onlineInfo',
          payload: {
            onlineInfo: values.deviceIDs,
            playInfo: values.deviceIDs
          }
        });
        values.deviceID.map((ele, index) => {
          if (index > 3) {
            return
          }
          goToVideo(ele.nodeId);
        })
        let videoCtrl = document.getElementById('HisVideo');  //ocx控件id;
        let playid = videoCtrl.MS_PlayBackbyTime(values.deviceID, values.startTime, values.endTime, 0);
        if (playid < 0) {
          return Message.info("MS_PlayBackbyTime接口错误！错误码" + result)
        }
      });
    }
  };
  // 离线录像操作信息
  const offlineProps = {
    submit: (val) => {
      validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        console.log(values, 'history')
        let data = {
          ...values,
          startTime: values.startTime.format('YYYY,MM,DD,HH,mm,ss'),
          endTime: values.endTime.format('YYYY,MM,DD,HH,mm,ss'),
        }

        let videoCtrl = document.getElementById('HisVideo');  //ocx控件id;
        let videoIndex = videoCtrl.MS_GetCurrentWindow(); // 当前播放窗体索引；
        console.log(videoIndex, 'videoIdnex')
        // debugger
        if (videoIndex) {
          onlineStream = videoCtrl.MS_GetCurrentVideoInfo(videoIndex) // 当前窗体历史码流；
          console.log(onlineStream, 'onlineStream')
          if (onlineStream) {
            return Message.info('无当前窗体历史码流');
          }
          dispatch({
            type: 'video/offlineVideo',
            payload: {
              offlineVideo: onlineStream,
            }
          })
        } else {
          Message.info('当前浏览器不支持设备视频播放！');
          return;
        }
      });
    }
  };
  // 联网录像信息表
  const {screenNum, drviceID, screenIndex} = videoProps;
  let videoCtrl = document.getElementById('HisVideo');
  const configFun = () => {
    if (videoCtrl.MS_SetLayoutMode) {
      videoCtrl.MS_SetLayoutMode(2);
      videoCtrl.MS_SetCurrentLayout(screenNum || 4);
      let playid = videoCtrl.MS_SetCameraToCurrentWindowAsyn(drviceID, screenIndex);
      if (playid < 0) {
        Message.info.info('MS_SetCameraToWindow接口错误！错误码' + playid);
        return;
      }
    } else {
      Message.info('当前浏览器不支持设备视频播放！');
      return;
    }
  };
  const onlineTableProps = {
    selectedRowKeys: [],
    columns: [{
      title: '点位',
      dataIndex: 'location',
    }, {
      title: '录像名称',
      dataIndex: 'name',
    }],
    dataSource: onlineInfo,
    rowSelection: {
      type: 'radio',
      onSelect: (row) => {
        selectedRowKeys.push(row.key)
        console.log(row, 'onselect')
      },
    }
  };
  return (<PageHeaderLayout {...pageHeaderProps} style={{height: '100%', margin: 0}}>
    {videoHistory.visible && <Modal {...modalProps}><HistoryModal/></Modal>}
    <Row className={styles.history} id='select'>
      <Col span={6} className={styles.left}>
        <Row>
          <Col span={24} className={styles.filter}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span>联网录像</span>} key="1">
                <Filter dispatch={dispatch} treeProps={treeProps} filterProps={onlineProps} styles={styles}/>
                <Col span={24}>
                  <Operatable tableProps={onlineTableProps}/>
                </Col>
              </TabPane>
              {/*<TabPane tab={<span>离线录像</span>} key="2">*/}
              {/*<Offline {...offlineProps} styles={styles}/>*/}
              {/*<Col span={24}>*/}
              {/*<List {...offlineInfo} />*/}
              {/*</Col>*/}
              {/*</TabPane>*/}
            </Tabs>
          </Col>
        </Row>
      </Col>
      <Col span={18}>
        <Video {...videoProps} />
      </Col>
    </Row>
    <MapModal/>
  </PageHeaderLayout>);
};

export default connect(state => (
  {
    videoHistory: state.videoHistory,
    video: state.video,
  }
))(Form.create()(index));
