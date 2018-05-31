/**
 * 视频应用
 */
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Card, Col, Row, Input, Message} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import PlayerList from './PlayerList';
import Video from '../../components/Video/Video';
import {headhildMenu} from '../../common/menu';
import ControlZone from './ControlZone';
import './less/index.less';
import './ContextTrees/index.less';

let flag = false;
const Index = ({dispatch, video, loading}) => {
  const {
    treeData,
    controlFlag,
    deviceList,
    toPlayInfo,
    pageTurning,
    dataSource,
    expandedKeys
  } = video;
  const pageHeaderProps = {
    menuList: headhildMenu.video,
  };
  const videoControl = document.querySelector('#HisVideo');
  const treeProps = {
    dispatch,
    treeData,
    expandedKeys,
    onSelect: (selectedKeys, info) => {
      console.log('onSelect', selectedKeys, info);
      // id =selectedKeys;

      let deviceNum = info.node.props.dataRef.deviceNumber;
      let dataRef = info.node.props.dataRef;
      if (deviceNum) {
        let deviceNum = info.node.props.dataRef.deviceNumber;
        toPlayInfo.push(deviceNum);
        dataSource.push(dataRef);
        let arr = Array.from(new Set(toPlayInfo)), dataArr = Array.from((new Set(dataSource)));
        dispatch({
          type: 'video/updateState',
          payload: {
            toPlayInfo: arr,
            pageTurning: false,
            expandedKeys: selectedKeys,
            dataSource: dataArr,
          }
        })
      } else {
        return Message.info('当前操作不是设备!')
      }
    },
    onChange: (selectedKeys) => {
      console.log(selectedKeys, 'selectedKeys')
      dispatch({
        type: 'video/updateState',
        payload: {
          toPlayInfo: selectedKeys,
          pageTurning: false,
          // expandedKeys: selectedKeys
        }
      })
    },
    onExpand: expandedKeys => {
      dispatch({
        type: 'video/updateState',
        expandedKeys: expandedKeys
      })
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
  let playids = []
  const tabProps = {
    dispatch,
    onChange: (key) => {
      console.log(key, 'index');
    },
    checkable: true,
    treeProps,
    deviceList,
    columns: [{
      title: '编号',
      dataIndex: 'nodeId',
      key: 'nodeId',
    }, {
      title: '摄像头名称',
      dataIndex: 'nodeName',
      key: 'nodeName',
    }, {
      title: '可控',
      dataIndex: 'address',
      key: 'address',
    }],

  };
  const videoProps = {
      dispatch,
      controlFlag,
      toPlayInfo,
      pageTurning,
      treeData,
      goToVideo: (drviceID, playIndex) => {
        // 先判断客户端是否注册;
        if (videoControl) {
          console.log(drviceID, playIndex, 'playIndex')
          let playid = videoControl.MS_SetCameraToCurrentWindowAsyn(drviceID, playIndex);
          console.log(playid);
          if (playid < 0) {
            Message.info('MS_SetCameraToWindow接口错误！错误码' + playid);
            return;
          } else {
            playids.push(playids);
          }
        } else {
          return;
        }
      }
    }
  ;
  return (
    <PageHeaderLayout {...pageHeaderProps}>
      <Row className="videoContainer">
        <Col span={5} className={`pubHeight bgColor`}>
          <PlayerList  {...tabProps} />
        </Col>
        <Col span={19} className={`pubHeight`}>
          <Video {...videoProps}/>
        </Col>
      </Row>
    </PageHeaderLayout>
  );
};

export default connect(({dispatch, video, loading}) => ({
  dispatch,
  video,
  loading,
}))(Index);

