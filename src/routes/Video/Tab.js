/**
 * 行政设备关系
 */
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Card, Col, Row, Message, Tabs, Table} from 'antd';
import CustomSortFilter from './CustomSortFilter';
import Scenes from './Scenes';
import CameraList from './CameraList';
import Operatable from './Operatable'
import style from './less/tab.less';
import video from '../../models/video';

const TabPane = Tabs.TabPane;
const Tab = ({dispatch, video, loading, ...tabProps}) => {
  const {onChange, treeProps, columns, deviceList} = tabProps;
  const {toPlayInfo, selectedRowKeys, dataSource} = video;
  const carmeraProps = {
    treeProps,
  };
  const collect = [{
    title: '编号',
    dataIndex: 'deviceId',
    key: 'deviceId',
  }, {
    title: '名称',
    dataIndex: 'deviceTitle',
    key: 'deviceTitle',
  }];
  console.log(video, 'video')
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
  console.log(dataSource, '播放列表');
  return (
    <div id="videoTabPane">
      <Tabs defaultActiveKey="1" animated={false} onChange={onChange}>
        <TabPane tab="视频点位" key="1">
          <CameraList {...carmeraProps} />
        </TabPane>
        <TabPane tab="播放点位" key="2">
          <Table rowSelection={rowSelection} dataSource={dataSource.map((e, i) => {
            e.key = e.nodeId;
            return e;
          })} {...tabProps} />
          <CustomSortFilter {...filterProps} />
          <Scenes {...sceneProps} />
        </TabPane>
        <TabPane tab="收藏点位" key="3">
          <Table className="playList" pagination={false} rowSelection={rowSelection} dataSource={dataSource}
                 columns={columns}/>
          <CustomSortFilter {...filterProps}/>
          <Scenes dispatch={dispatch}/>
          {/*<Table bordered columns={collect}/>*/}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(({dispatch, loading, video}) => ({dispatch, loading, video}))(Tab);
