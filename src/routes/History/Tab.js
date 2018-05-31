/**
 * 行政设备关系
 */
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Card, Col, Row, Message, Tabs, Table} from 'antd';
import CustomSortFilter from '../../components/CustomSortFilter';
import SearchBtn from '../../components/SearchBtn';
import AreaDeviceTree from '../../components/AreaDeviceTree';
import style from './Less/tab.less';
import video from '../../models/video';

const TabPane = Tabs.TabPane;
const Tab = ({dispatch, video, loading, ...tabProps}) => {
  // const {onChange, treeProps, columns, deviceList} = tabProps;
  const {toPlayInfo, selectedRowKeys, dataSource, treeData} = video;
  const collect = [{
    title: '编号',
    dataIndex: 'deviceId',
    key: 'deviceId',
  }, {
    title: '名称',
    dataIndex: 'deviceTitle',
    key: 'deviceTitle',
  }];
  const rowSelection = {
    selectedRowKeys,
    type: 'radio',
    onChange: (keys) => {
      dispatch({
        type: 'video/updateState',
        payload: {
          selectedRowKeys: keys
        }
      })
    },
  };
  const sceneProps = {
    savePrivateScene: () => {
    },
    savaPublicScene: () => {

    }
  }

  const filterProps = {
    dataSource,
    selectedRowKeys,
    dispatch
  };
  const callback = (key) => {
    console.log(key);
  };
  const columns = [{
    title: '编号',
    dataIndex: 'num',
    key: 'num',
  }, {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '隶属单位',
    dataIndex: 'unit',
    key: 'unit',
  }];
  let activeKey = '';
  const callCamera = () => {
    activeKey = 'administrative';
  };
  const callUnit = () => {
    console.log(activeKey, 'activeKey');
    activeKey = 'cameraListKey';
  };
  const handleChange = (tag, checked) => {
    console.log('You are interested in: ', tag);
  };
  const searchProps = {
    placeholder: '设备检索',
    onSearch: (val) => {
      if (val.length <= 0) {
        return;
      }
      dispatch({
        type: 'video/queryMyDevice',
        payload: {
          pageNum: '1', pageSize: '10', deviceConditions: val,
        },
      });
    },
  };
  // 拖拽播放
  const onDragEnd = (info) => {
    let nodeId = info.node.props.eventKey;
    let videoCtrl = document.getElementById('HisVideo');
    let videoIndex = videoCtrl.MS_GetCurrentWindow();  //获取当前活动窗口索引;
    if (videoIndex) {
      videoCtrl.MS_SetCameraToWindow(nodeId, videoIndex)    // 拖拽到指定窗口进行播放;
    } else {
      return Message.info('当前浏览器不支持播放该视频');
    }
  };
  const onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  }
  // const draggerTree = {
  //   ...treeProps,
  //   draggable: true,
  //   onDragEnd,
  // }
  const treeProps = {
    treeData
  }
  const playInfo = {
    columns: [{
      title: '编号(键盘码)',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '摄像头名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    }, {
      title: '可控',
      dataIndex: 'isControl',
      key: 'isControl',
    }]
  }
  return (
    <div id="historyTabPane">
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab="视频点位" key="1">
          <div className="publicWidth">
            <SearchBtn {...searchProps} />
          </div>
          <div className="borderTop cameraDevice contextTree">
            {treeData && <AreaDeviceTree {...treeProps} />}
            {/*{treeProps && <ContextTrees {...treeProps} />}*/}
            {/*{treeProps && <TestTree {...treeProps} />}*/}
          </div>
        </TabPane>
        <TabPane tab="播放点位" key="2">
          <Table rowSelection={rowSelection} dataSource={dataSource.map((e, i) => {
            e.key = i;
            return e;
          })} {...playInfo} />
          <CustomSortFilter {...filterProps} />
          {/*<Scenes {...sceneProps} />*/}
        </TabPane>
        <TabPane tab="收藏点位" key="3">
          <Table className="playList" pagination={false} rowSelection={rowSelection} dataSource={dataSource}
                 columns={columns}/>
          <CustomSortFilter {...filterProps}/>
          {/*<Scenes dispatch={dispatch}/>*/}
          {/*<Table bordered columns={collect}/>*/}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(({dispatch, loading, video}) => ({dispatch, loading, video}))(Tab);
