import React from 'react';
import {connect} from 'dva';
import {Col, Row, Modal} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import * as styles from './index.less';
import Filter from './Filter';
import List from './List';
import Video from '../../../components/Video/Video';
import TaskMonitor from './TastMonitorModal';
import config from '../../../config';
let flag = false;
// const socket = io(config.scocketUrl, {
// });
const index = ({taskMonitor, dispatch, video}) => {
  const { treeData, controlFlag } = video;
  const {treeSelectData} = taskMonitor;

  const pageHeaderProps = {
    menuList: headhildMenu.video,
  };
  const modalProps = {
    title:'创建任务',
    okText: '确认',
    cancelText: '取消',
    visible:taskMonitor.visible,
    width: 600,
    wrapClassName: 'historyModal',
    onCancel: ()=>{dispatch({type: 'taskMonitor/save', payload: {visible: false}})},

  }

  const treeProps = {
    treeData,
    selectedKeys: treeSelectData,
    onSelect: (selectedKeys, info, aa) => {
      console.log('onSelect', selectedKeys);
      // id =selectedKeys;
      const ID = '71000000001320000008';
      // goToVideo(ID);
      dispatch({type: 'taskMonitor/save', payload: {treeSelectData: selectedKeys}})
    },
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
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',

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
  };

  const startVideo = () => {
    videoFlag = !videoFlag;
    let videoCtrl = document.getElementById("HisVideo");
    let result = videoCtrl.MS_StartClient('SUPPER_NONEED_USER', '');
    if (result !== 0) {
      alert("MS_StartClient接口错误！错误码" + result);
      return;
    }
    result = videoCtrl.MS_SetCurrentLayout(1);
    if (result !== 0) {
      alert("MS_SetCurrentLayout接口错误！错误码" + result);
      return;
    }
  }
  const goToVideo = (drviceID) => {
    if (videoFlag) {
      startVideo();
    }
    let videoCtrl = document.getElementById("HisVideo");
    let playid = videoCtrl.MS_SetCameraToWindow(drviceID, 0);
    console.log(videoCtrl.MS_SetCameraToWindow, 'videoCtrl.MS_SetCameraToWindow')
    if (playid < 0) {
      alert("MS_SetCameraToWindow接口错误！错误码" + playid);
      return;
    }
  };
  const videoProps={
    dispatch,
    controlFlag
  };
  return (<PageHeaderLayout {...pageHeaderProps} style={{ height: '100%', margin: 0 }}>
    {taskMonitor.visible && <Modal {...modalProps}><TaskMonitor treeProps={treeProps} /></Modal>}
    <Row className={styles.taskMonitor} >
      <Col span={6} className={styles.left}>
        <Row>
          <Col span={24}>
            <Filter styles={styles} dispatch={dispatch} />
          </Col>
          <Col span={24}>
            <List dispatch={dispatch} styles={styles} />
          </Col>
          <Col span={24}>
          </Col>
        </Row>
      </Col>
      <Col className={styles.right} span={18}>
        <div className="rightContainer">
          <Video {...videoProps} />
        </div>
      </Col>
    </Row>
  </PageHeaderLayout>)
};


export default connect(state => (
  {taskMonitor: state.taskMonitor, video: state.video}
))(index);
