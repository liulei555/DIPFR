import React from 'react';
import {Input, Button, Tree, Row, Col, Tabs, Table, Message} from 'antd';
import {connect} from 'dva';
import MyTag from '../MyTag';
import TestTree from '../TestTree';
import SearchBtn from '../../../components/SearchBtn';
import '../less/patrol.less';

const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Patrol = ({dispatch, video}) => {
  const {patrolList, patrolGroup, controlFlag, toPlayInfo, userPatrolDevice, activeKey} = video;
  let videoCtrl = document.getElementById('HisVideo');
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
    if (controlFlag) {
      startVideo();
    }
    // 缺少获取当前布局信息
    if (videoCtrl.MS_SetLayoutMode) {
      videoCtrl.MS_SetLayoutMode(2);
      let layoutNum = videoCtrl.MS_GetLayoutState();
      videoCtrl.MS_SetCurrentLayout(layoutNum || 4);
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
  const patrolListProps = {
    treeData: patrolList.map(ele => {
      let obj = {};
      obj = {
        nodeName: ele.yamc,
        nodeId: ele.yabh,
        ...ele,
      };
      return obj;
    }),
    selectedKeys: [],
    onSelect: (selectedKeys, info) => {
      debugger;
      if (info.node.props.dataRef.cameraBumber) {
        dispatch({
          type: 'video/toPlayInfo',
          toPlayInfo: selectedKeys
        })
      }
    },
    onLoadData(treeNode) {
      console.log(treeNode, 'treeNode');
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        if (treeNode.props.dataRef.cameraName) {
          return;
        } else {
          dispatch({
            type: 'video/queryCamera',
            payload: {
              resolve,
              planNumber: treeNode.props.dataRef.nodeId,
            },
          });
        }
      }).then((res) => {
        console.log(res, 'resolve res')
        if (res && res.length > 0) {
          let arr = patrolList.map(ele => {
            if (ele.yabh === treeNode.props.dataRef.yabh) {
              ele.children = treeNode.props.dataRef.children;
              return ele
            } else return ele
          })
          console.log(arr, patrolList)
          dispatch({
            type: 'video/updateState',
            payload: {
              patrolList: [...arr],
            },
          });
        }
      });
    },
  };
  const patrolGroupProps = {
    treeData: patrolGroup.map(ele => {
      let obj = {};
      obj = {
        nodeName: ele.yamc,
        nodeId: ele.yabh,
        ...ele,
      };
      return obj;
    }),
    selectedKeys: [],
    onSelect: (selectedKeys, info) => {
      console.log('onSelect', selectedKeys);
      const ID = selectedKeys;
      goToVideo(ID);
    },
    onLoadData(treeNode) {
      console.log(treeNode, 'treeNode');
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'video/queryCamera',
          payload: {
            resolve,
            planNumber: treeNode.props.dataRef.nodeId,
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
  const tabOnChange = (activeKey) => {
    console.log(activeKey);
    dispatch({
      type: 'video/updateState',
      activeKey: activeKey
    })
    switch (activeKey) {
      case '1':
        console.log(2);
        sendFun(2);
        break;
      case '2':
        console.log(2);
        sendFun(3);
        break;
    }
  };
  const sendFun = (val) => {
    dispatch({
      type: 'video/queryPatrol', payload: {
        yalx: val,
      },
    });
  };
  const listSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const listProps = {};
  const groupProps = {};
  const searchProps = {
    placeholder: '搜索任务',
    onSearch: (val) => {
      if (val.length <= 0) {
        return;
      }
      dispatch({
        type: 'video/queryPatrol',
        payload: {
          planType: '2',
          pageNum: '1',
          pageSize: '2',
          // 添加巡逻任务字段
        },
      });
    },
  };
  const reqUserDevice = (type) => {
    // 根据任务类型进行用户设备请求;
  };
  const beginPatrol = () => {
    // 巡逻接口
    let type;
    activeKey === 1 ? type = 'list' : type = 'group';
    switch (activeKey) {
      case '1':
        console.log(2);
        // reqUserDevice(type);
        break;
      case '2':
        console.log(2);
        // reqUserDevice(type);
        break;
    }
    if (userPatrolDevice && userPatrolDevice.length < 0) {
      return Message.info('无巡逻任务!');
    } else {
      // 根据用户查找巡逻配置下所有设备
      let DeviceArr = userPatrolDevice.filter(ele => ele.nodeId);
      dispatch({
        type: 'video/updateState',
        toPlayInfo: DeviceArr,
        bannerVideo: true,
      })
    }
  };
  const endPatrol = () => {
    // 结束巡逻  关闭当前所有播放视频
    let flag = videoCtrl.MS_DisConnectAllCamera;
    if (flag) {
      videoCtrl.MS_DisConnectAllCamera();
    } else {
      return;
    }
  };
  return (
    <Row id="patrol">
      <Tabs onChange={tabOnChange}>
        <TabPane tab={`巡逻`} key={`1`}>
          <div className="publicWidth">
            <SearchBtn {...searchProps} />
          </div>
          <div className="borderTop cameraDevice">
            {patrolListProps && <TestTree {...patrolListProps} />}
          </div>
        </TabPane>
        <TabPane tab={`巡逻组`} key={`2`}>
          <div className="publicWidth">
            <SearchBtn {...searchProps} />
          </div>
          <div className="borderTop cameraDevice">
            {patrolGroup && <TestTree {...patrolGroupProps} />}
          </div>
        </TabPane>
      </Tabs>
      <Col span={12}>
        <Button style={{display: 'block', margin: '15px  auto  0'}} onClick={beginPatrol}>开始巡逻</Button>
      </Col>
      <Col span={12}>
        <Button style={{display: 'block', margin: '15px  auto  0'}} onClick={endPatrol}>结束巡逻</Button>
      </Col>
    </Row>
  );
};

export default connect(({dispatch, video, loading}) => ({
  dispatch,
  video,
  loading,
}))(Patrol);
