import React from 'react';
import {connect} from 'dva';
import {Tabs, Button, DatePicker, Row, Form, Col, Collapse, Checkbox, Input, Radio} from 'antd';
import MyTag from './MyTag';
import AreaDeviceTree from '../../components/AreaDeviceTree';
import SearchBtn from '../../components/SearchBtn';
import style from './less/historyVideo.less';

const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const {TextArea, Search} = Input;
const pictureOptions = ['没有图像', '视频丢失', '视频遮挡', '图像抖动', '图像模糊', '色彩异常', '亮度异常', '名称错误', '雪花'];
const cloudStatus = ['控制失效', '速度缓慢', '左右接反', '上下接反', '缩放接反', '其他'];
const laneStatus = ['无效', '模糊'];
const laneStatusPro = ['无数据', '模糊', '遮挡', '补光灯故障', '抓拍机位置不对'];
const HistoryVideo = ({
                        dispatch, video, loading,
                      }) => {
  const {checkAll1, treeData, indeterminate1, checkedList1, checkAll2, indeterminate2, checkedList2, deviceList, deviceList1,toPlayInfo} = video;
  const onChange1 = (checkedList) => {
    dispatch({
      type: 'video/updateState',
      payload: {
        checkedList1: checkedList,
        indeterminate1: !!checkedList.length && (checkedList.length < pictureOptions.length),
        checkAll1: checkedList.length === pictureOptions.length,
      },
    });
  };
  const onCheckAllChange1 = (e) => {
    dispatch({
      type: 'video/updateState',
      payload: {
        checkedList1: e.target.checked ? pictureOptions : [],
        indeterminate1: false,
        checkAll1: e.target.checked,
      },
    });
  };
  const onChange2 = (checkedList) => {
    dispatch({
      type: 'video/updateState',
      payload: {
        checkedList2: checkedList,
        indeterminate2: !!checkedList.length && (checkedList.length < cloudStatus.length),
        checkAll2: checkedList.length === cloudStatus.length,
      },
    });
  };
  const onCheckAllChange2 = (e) => {
    dispatch({
      type: 'video/updateState',
      payload: {
        checkedList2: e.target.checked ? cloudStatus : [],
        indeterminate2: false,
        checkAll2: e.target.checked,
      },
    });
  };
  const bayonetProps = {
    treeData: deviceList1,
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
          type: 'video/queryBayonet',
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
              deviceList1: [...deviceList1],
            },
          });
        }
      });
    },
  };
  const treeProps = {
    treeData,
    selectedKeys: [],
    onSelect: (selectedKeys, info) => {
      console.log('onSelect', selectedKeys);
      // id =selectedKeys;
      const ID = '71000000001320000008';
      // goToVideo(ID);

    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'video/queryBayonet',
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
  const tabChange = (key) => {
    switch (key) {
      case 'bayonetGruop':
        sendFun();
        break;
    }
  };
  const sendFun = () => {
    dispatch({
      type: 'video/queryBayonet',
      payload: {
        areaId: 'root',
      },
    });
  };
  const btnProp = {
    placeholder: '卡口设备检索',
    onSearch: (val) => {
      if (val.length <= 0) {
        return;
      }
      // // debugger
      // deviceType 设备类型 4 代表卡口
      dispatch({
        type: 'video/queryMyDevice',
        payload: {
          pageNum: '1', pageSize: '10', deviceConditions: val, deviceType: '4',
        },
      });
    },
  };
  return (
    <Row className="historyVideo">
      <Tabs onChange={tabChange}>
        <TabPane tab={`视频巡检分组`} key={`videoTabPane`}>
          <div className="publicWidth">
            <SearchBtn/>
          </div>
          <div className="borderTop cameraDevice">
            {treeProps && <AreaDeviceTree {...treeProps} />}
          </div>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="视频巡检" key="1">
              <Row>
                <Col span={4}>
                  <span>图像：</span>
                </Col>
                <Col span={20}>
                  <Checkbox
                    indeterminate={indeterminate1}
                    onChange={onCheckAllChange1}
                    checked={checkAll1}
                  >
                    全选
                  </Checkbox>
                  <br/>
                  <CheckboxGroup options={pictureOptions} Checkbox onChange={onChange1} value={checkedList1}/>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={4}>
                  <span>云台：</span>
                </Col>
                <Col span={20}>
                  <Checkbox
                    indeterminate={indeterminate2}
                    onChange={onCheckAllChange2}
                    checked={checkAll2}
                  >
                    全选
                  </Checkbox>
                  <br/>
                  <CheckboxGroup options={cloudStatus} Checkbox onChange={onChange2} value={checkedList2}/>
                </Col>
              </Row>
              <Row>
                <Input placeholder="报修人电话" style={{marginTop: 10}}/>
              </Row>
              <Row>
                <Input placeholder="备注" style={{marginTop: 10}}/>
              </Row>
              <Row style={{marginTop: 10}}>
                <span>是否正常：</span>
                <RadioGroup>
                  <Radio value={1}>正常</Radio>
                  <Radio value={2}>异常</Radio>
                </RadioGroup>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={18}/>
                <Col span={6}>
                  <Button type="primary">提交</Button>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab={`卡口行政分组`} key={`bayonetGruop`}>
          <div className="publicWidth">
            <SearchBtn {...btnProp} />
          </div>
          <div className="borderTop cameraDevice">
            {bayonetProps && <AreaDeviceTree {...bayonetProps} />}
          </div>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="视频巡检" key="1">
              <Row style={{marginTop: 10}}>
                <Col span={5}>
                  <span>车道1：</span>
                </Col>
                <Col span={19}>
                  <CheckboxGroup options={laneStatus} Checkbox onChange={onChange2} value={checkedList2}/>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={5}>
                  <span>车道2：</span>
                </Col>
                <Col span={19}>
                  <CheckboxGroup options={laneStatus} Checkbox onChange={onChange2} value={checkedList2}/>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={5}>
                  <span>车道3：</span>
                </Col>
                <Col span={19}>
                  <CheckboxGroup options={laneStatusPro} Checkbox onChange={onChange2} value={checkedList2}/>
                </Col>
              </Row>
              <Row>
                <TextArea placeholder="备注" style={{marginTop: 10}}/>
              </Row>
              <Row style={{marginTop: 10}}>
                <span>是否正常：</span>
                <RadioGroup>
                  <Radio value={1}>正常</Radio>
                  <Radio value={2}>异常</Radio>
                </RadioGroup>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <Button className={`submitBtn`} type="primary">提交</Button>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    </Row>
  );
};

export default connect(({dispatch, video, loading}) => ({dispatch, video, loading}))(HistoryVideo);
