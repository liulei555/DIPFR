import React from 'react';
import {Button, Card, Col, Row, Input, Tabs, Table, Form, Tag} from 'antd';
import {connect} from 'dva';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import AreaDeviceTree from '../../components/AreaDeviceTree';
import TestTree from './TestTree'
import SearchBtn from '../../components/SearchBtn';
import ContextTrees from './ContextTrees'
import TestTreeSelect from './TestTreeSelect';
import './less/tab.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const CheckableTag = Tag.CheckableTag;
const CarmerList = ({
                      form: {
                        getFieldDecorator,
                        getFieldsValue,
                        setFieldsValue,
                        validateFields,
                        resetFields,
                        validateFieldsAndScroll,
                      },
                      dispatch,
                      loading,
                      video,
                      ...carmeraProps,
                    }) => {
  const {deviceList, treeFlag} = video;
  const {treeProps} = carmeraProps;
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
  };
  const draggerTree = {
    ...treeProps,
    draggable: true,
    onDragEnd,
  };
  return (
    <Row>
      <div className="publicWidth">
        <SearchBtn {...searchProps} />
      </div>
      <div className="borderTop cameraDevice contextTree">
        {treeProps && <AreaDeviceTree {...treeProps} />}
        {/*{treeProps && <ContextTrees {...treeProps} />}*/}
        {/*{treeProps && <TestTree {...treeProps} />}*/}
      </div>
    </Row>
  );
};

export default connect(({dispatch, loading, video}) => ({dispatch, loading, video}))(Form.create()(CarmerList));
