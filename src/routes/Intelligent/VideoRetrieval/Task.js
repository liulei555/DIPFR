/**
 * 功能描述：新建任务
 * 2018.05.02
 * 作者：xiongmeng
 */
import React from 'react';
import {
  Modal,
  Col,
  Row,
  Divider,
  Button,
  Form,
  Input,
  DatePicker,
  Radio,
  Upload,
  Icon,
  TreeSelect,
  Tree,
  Badge,
  message,
} from 'antd';
import moment from 'moment/moment';
import PointList from './PointList';
import session from '../../../utils/saveStorage/sessionStorage';
import config from '../../../utils/config';
import { createType } from '../EnumVideo';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const TreeNode = Tree.TreeNode;

const Task = ({
                form: {
                  getFieldDecorator,
                  getFieldsValue,
                  getFieldValue,
                  setFieldsValue,
                  validateFields,
                  setFields,
                },
                ...taskModalProps,
              }) => {

  const { loading, visible, wrapClassName, onSelectMap, onCreate, onCancel, onDelete, mapSelectCameraData, selectedPoints, treeData, onChange, onLoadData } = { ...taskModalProps };

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  let videoType = getFieldValue('videoType') || '0';
  let creator = session.getSession('userName');

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        if (videoType === '0') {
          if (mapSelectCameraData.length === 0 && values.points.length === 0) {
            message.warning('请选择设备！');
          } else {
            let videoName = values.videoName;
            let videoDescription = values.videoDescription;
            let videoStartTime = values.videoStartTime ? moment(values.videoStartTime).format(dateFormat) : undefined;
            let videoEndTime = values.videoEndTime ? moment(values.videoEndTime).format(dateFormat) : undefined;
            let videoInfo = mapSelectCameraData.concat(selectedPoints || []).map((o) => {
              return { deviceNumber: o.SBBH, deviceName: o.NAME, videoStartTime, videoEndTime, videoUrlAddress: '' };
            });
            let postObj = { videoName, videoDescription, taskStatus: createType.toString(), videoInfo };
            console.log(JSON.stringify(postObj));
            onCreate(postObj);
          }
        } else {
          console.log(values);
          let videoName = values.videoName;
          let videoDescription = values.videoDescription;
          let videoStartTime = values.videoStartTime ? moment(values.videoStartTime).format(dateFormat) : undefined;
          let videoEndTime = values.videoEndTime ? moment(values.videoEndTime).format(dateFormat) : undefined;
          let videoInfo = values.localVideo.map((o) => {
            return {
              deviceNumber: ' ',
              deviceName: o.name.substring(0, o.name.lastIndexOf('.')),
              videoStartTime,
              videoEndTime,
              videoUrlAddress: o.response.message || '',
            };
          });
          let postObj = { videoName, videoDescription, taskStatus: createType.toString(), videoInfo };
          console.log(JSON.stringify(postObj));
          onCreate(postObj);
        }
      }
    });
  };

  const handleCheckStartTime = (rule, value, callback) => {
    let videoStartTime = getFieldValue('videoStartTime');
    let videoEndTime = getFieldValue('videoEndTime');
    if (videoStartTime && videoEndTime) {
      videoStartTime.diff(videoEndTime) > 0 && callback('开始时间不能大于结束时间！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const handleCheckEndTime = (rule, value, callback) => {
    let videoStartTime = getFieldValue('videoStartTime');
    let videoEndTime = getFieldValue('videoEndTime');
    if (videoStartTime && videoEndTime) {
      videoStartTime.diff(videoEndTime) > 0 && callback('开始时间不能大于结束时间！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const modalProps = {
    title: '新建任务',
    width: '820px',
    cancelText: '返回',
    destroyOnClose: true,
    confirmLoading: loading,
    visible,
    wrapClassName,
    onOk: handleSubmit,
    onCancel,
  };

  const listProps = {
    dataSource: mapSelectCameraData.concat(selectedPoints),
    pagination: false,
    size: 'small',
    rowKey: record => record.SBBH,
    bordered: true,
    onDelete: async (record) => {
      await onDelete(record);
      let points = selectedPoints.filter((item) => item.SBBH !== record.SBBH);
      setFieldsValue({ points: points.map(o => o.SBBH) });
    },
  };

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCheckUpload = (rule, value, callback) => {
    let video = getFieldValue('localVideo');
    if (video && video.length > 0) {
      for (let v of video) {
        v.status === 'error' && callback('上传失败，请重新上传！');
        v.response && v.response.status !== '1' && callback('上传失败，请重新上传！');
      }
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const upLoadProps = {
    name: 'fileUpLoad',
    accept: 'video/*',
    action: config.api.uploadOneFile,
    listType: 'picture',
  };

  const renderTreeNodes = data => {
    return data ? data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.nodeName}
            key={item.nodeId}
            value={item.nodeId}
            dataRef={item}
            disabled={item.disabled}
            icon={() => <Badge count={item.countTotal} offset={[-10, item.nodeName.length * 16]}/>}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={item.nodeName}
        key={item.nodeId}
        value={item.nodeId}
        dataRef={item}
        disabled={item.disabled}
        icon={() => <Badge count={item.countTotal} offset={[-10, item.nodeName.length * 16]}/>}
      />;
    }) : [];
  };

  return (
    <Modal {...modalProps}>
      <Form onSubmit={handleSubmit}>
        <Row type={'flex'} justify={'center'}>
          <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            {getFieldDecorator('videoType', {
              initialValue: '0',
            })(<RadioGroup>
              <Radio value={'0'} key={'type1'}>联网视频</Radio>
              <Radio value={'1'} key={'type2'}>本地视频</Radio>
            </RadioGroup>)}
          </FormItem>
        </Row>
        <Divider>创建信息</Divider>
        <Row>
          <Col span={12}>
            <FormItem label="创建人" {...formItemLayout}>
              {getFieldDecorator('videoCreator', { initialValue: creator })(<Input disabled/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="创建时间" {...formItemLayout}>
              {getFieldDecorator('videoCreateTime', { initialValue: moment() })(<DatePicker showTime
                                                                                            format={dateFormat}
                                                                                            disabled/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="任务名称" {...formItemLayout}>
              {getFieldDecorator('videoName', {
                rules: [
                  { required: true, message: '请输入任务名称' },
                ],
              })(<Input placeholder="任务名称"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="任务描述" {...formItemLayout}>
              {getFieldDecorator('videoDescription', {
                rules: [
                  { required: true, message: '请输入任务描述' },
                ],
              })(<Input placeholder="任务描述"/>)}
            </FormItem>
          </Col>
        </Row>
        <Divider>录像信息</Divider>
        <Row>
          <Col span={12}>
            <FormItem label="开始时间" {...formItemLayout}>
              {getFieldDecorator('videoStartTime', {
                rules: [
                  { required: true, message: '请选择开始时间' },
                  { validator: handleCheckStartTime },
                ],
              })(<DatePicker showTime format={dateFormat} placeholder="开始时间"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            {/*<FormItem label="起止时间" {...formItemLayout}>
            {getFieldDecorator('videoStartTime', {
              rules: [
                { type: 'array', required: true, message: '请选择起止时间' },
              ],
              initialValue: [moment(),moment().add(10,'m')],
            })(<RangePicker showTime format={dateFormat}/>)}
          </FormItem>*/}
            <FormItem label="结束时间" {...formItemLayout}>
              {getFieldDecorator('videoEndTime', {
                rules: [
                  { required: true, message: '请选择结束时间' },
                  { validator: handleCheckEndTime },
                ],
              })(<DatePicker showTime format={dateFormat} placeholder="结束时间"/>)}
            </FormItem>
          </Col>
        </Row>
        {videoType === '0' ? <Row><Col span={12}>
            <FormItem label="联网选取" {...formItemLayout}>
              {getFieldDecorator('points', {})(
                <TreeSelect
                  multiple
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: 300 }}
                  placeholder="选择设备"
                  loadData={onLoadData}
                  onChange={onChange}
                >
                  {renderTreeNodes(treeData)}
                </TreeSelect>)}
            </FormItem>
          </Col><Col span={12}><FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            <Button type='primary' icon="environment" onClick={onSelectMap}>地图选点</Button>
          </FormItem></Col></Row> :
          <Row><Col span={24}>
            <FormItem label="本地视频" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              {getFieldDecorator('localVideo', {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
                rules: [
                  { required: true, message: '请上传视频!' },
                  { validator: handleCheckUpload },
                ],
              })(<Upload {...upLoadProps}>
                <Button>
                  <Icon type="upload"/>上传
                </Button>
              </Upload>)}
            </FormItem>
          </Col></Row>}
        {videoType === '0' && <Row>
          <Col span={24}>
            <FormItem label="点位列表" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              <PointList {...listProps} />
            </FormItem>
          </Col>
        </Row>}
      </Form>
    </Modal>
  );
};

export default Form.create()(Task);
