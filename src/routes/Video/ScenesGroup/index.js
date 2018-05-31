import React from 'react';
import {connect} from 'dva';
import {Card, Button, DatePicker, Row, Form, Col, Tabs, Input} from 'antd';
import MyTag from '../MyTag';
import AreaDeviceTree from '../../../components/AreaDeviceTree';
import SearchBtn from '../../../components/SearchBtn';
import '../less/scenes.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};
const ScenesGroup = ({
                       dispatch,
                       video,
                       loading,
                       form: {
                         getFieldDecorator,
                         getFieldsValue,
                         setFieldsValue,
                         validateFields,
                         resetFields,
                         validateFieldsAndScroll,
                       },
                     }) => {
  const {seceneList, seceneGroup, controlFlag} = video;
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
  const seceneListProps = {
    treeData: seceneList.map(ele => {
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
    },
    onLoadData(treeNode) {
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
  const seceneGroupProps = {
    treeData: seceneGroup.map(ele => {
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
      // id =selectedKeys;
      const ID = '71000000001320000008';
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
  const onChange = (key) => {
    console.log(key, 'secene');
    switch (key) {
      case 'seceneTabPane':
        sendFun(4);
        break;
      case 'seceneGroup':
        sendFun(5);
        break;
    }
    ;
  };
  const sendFun = (val) => {
    dispatch({
      type: 'video/queryPatrol', payload: {
        yalx: val,
      },
    });
  };
  const searchLiset = {
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
  const searchGroup = {
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
  const scenesList = {
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
  const scenesGroup = {
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
    <Row>
      <Row id="scenesGroup">
        <Tabs onChange={onChange}>
          <TabPane tab={`场景`} key={`seceneTabPane`}>
            <div className="publicWidth">
              <SearchBtn {...scenesList} />
            </div>
            <div className="borderTop cameraDevice">
              {seceneList.length > 0 && <AreaDeviceTree {...seceneListProps} />}
            </div>
          </TabPane>
          <TabPane tab={`场景组`} key={`seceneGroup`}>
            <div className="publicWidth">
              <SearchBtn {...seceneGroup} />
            </div>
            <div className="borderTop cameraDevice">
              {seceneGroup.length > 0 && <AreaDeviceTree {...seceneGroupProps} />}
            </div>
          </TabPane>
        </Tabs>

        <Col span={12}>
          <Button style={{display: 'block', margin: '15px  auto  0'}} onClick={beginPatrol}>开始播放</Button>
        </Col>
        <Col span={12}>
          <Button style={{display: 'block', margin: '15px  auto  0'}} onClick={endPatrol}>结束播放</Button>
        </Col>
      </Row>
    </Row>
  );
};

export default connect(({dispatch, video, loading}) => ({
  dispatch,
  video,
  loading,
}))(Form.create()(ScenesGroup));
