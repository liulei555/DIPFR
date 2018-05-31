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
  InputNumber,
  Checkbox,
} from 'antd';
import moment from 'moment/moment';
import style from './index.less';
import PointList from '../VideoRetrieval/PointList';
import session from '../../../utils/saveStorage/sessionStorage';
import config from '../../../utils/config';
import { createType } from '../EnumVideo';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const TreeNode = Tree.TreeNode;
const CheckboxGroup = Checkbox.Group;

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

  const { loading, visible, onCreate, onCancel, onDelete, mapSelectCameraData, onSelectMap  } = { ...taskModalProps };

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  let radiusType = getFieldValue('radiusType') || '0';
  let creator = session.getSession('userName');

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        if (mapSelectCameraData.length === 0) {
          message.warning('请点击地图选择设备！');
        } else {
          console.log(values);
          let trackName = values.trackName;
          let trackDescription = values.trackDescription;
          let trackPictureUrl = values.targetImage[0].response.message;
          let videoStartTime = moment(values.videoStartTime).format(dateFormat);
          let videoEndTime = moment(values.videoEndTime).format(dateFormat);
          let coordinate = values.coordinate;
          let radius = values.radiusType === '0' ? 0 : values.radius;
          let trackTarget = values.trackTarget.join(',');
          let pointInfo = mapSelectCameraData.map((o) => {
            return { deviceNumber: o.SBBH, videoName: o.NAME, videoStartTime, videoEndTime, latitude: o.X, longitude: o.Y, inspectionArea: o.QY };
          });
          let postObj = { trackName, trackDescription, trackPictureUrl, taskStatus: createType.toString(), coordinate, radius, trackTarget, pointInfo };
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
    onOk: handleSubmit,
    onCancel,
  };

  const listProps = {
    dataSource: mapSelectCameraData,
    pagination: false,
    size: 'small',
    rowKey: record => record.SBBH,
    bordered: true,
    onDelete: (record) => {
      onDelete(record);
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

  const checkOptions = [
    { label: '人脸', value: '1' },
    { label: '行人', value: '2' },
    { label: '机动车', value: '3' },
    { label: '非机动车', value: '4' },
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCheckUpload = (rule, value, callback) => {
    let image = getFieldValue('targetImage');
    if (image && image.length > 0) {
      image[0].status === 'error' && callback('上传失败，请重新上传！');
      image[0].response && image[0].response.status !== '1' && callback('上传失败，请重新上传！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const upLoadProps = {
    name: 'fileUpLoad',
    accept: 'image/*',
    action: config.api.uploadOneFile,
    listType: 'picture',
  };

  return (
    <Modal {...modalProps} wrapClassName={style['task-modal']}>
      <Form onSubmit={handleSubmit}>
        <Divider>创建信息</Divider>
        <Row>
          <Col span={12}>
            <FormItem label="创建人" {...formItemLayout}>
              {getFieldDecorator('videoCreator', { initialValue: creator })(<Input disabled/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="创建时间" {...formItemLayout}>
              {getFieldDecorator('videoCreateTime', { initialValue: moment() })(<DatePicker
                showTime
                format={dateFormat}
                disabled />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="任务名称" {...formItemLayout}>
              {getFieldDecorator('trackName', {
                rules: [
                  { required: true, message: '请输入任务名称' },
                ],
              })(<Input placeholder="任务名称"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="任务描述" {...formItemLayout}>
              {getFieldDecorator('trackDescription', {
                rules: [
                  { required: true, message: '请输入任务描述' },
                ],
              })(<Input placeholder="任务描述"/>)}
            </FormItem>
          </Col>
        </Row>
        <Divider>追踪信息</Divider>
        <Row>
          <Col span={12}>
            <Col span={16}>
              <FormItem label="中心坐标" labelCol={{ span: 9 }} wrapperCol={{ span: 14 }}>
                {getFieldDecorator('coordinate', {})(
                  <Input placeholder="中心坐标" />)}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                <Button type='primary' icon="environment" onClick={onSelectMap}>地图选点</Button>
              </FormItem>
            </Col>
          </Col>
          <Col span={12}>
            <Col span={18}>
              <FormItem label="追踪半径" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('radiusType', {initialValue: '0'})(<RadioGroup>
                  <Radio value={'0'} key={'type1'}>自动匹配</Radio>
                  <Radio value={'1'} key={'type2'}>手动设置</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
            <Col span={6}>
              {radiusType === '1' && <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                {getFieldDecorator('radius', {
                  initialValue: 100,
                  rules: [
                    { required: true, message: '请输入半径' },
                  ],
                })(<InputNumber min={1} formatter={value => `${value}m`} parser={value => value.replace('m', '')}/>)}
              </FormItem>}
            </Col>
          </Col>
        </Row>
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
        <Row>
          <Col span={24}>
            <Col span={12}>
              <FormItem label="追踪目标" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                {getFieldDecorator('trackTarget', {
                  rules: [
                    { required: true, message: '请选择追踪目标!' },
                  ],
                })(<CheckboxGroup options={checkOptions}  />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 20 }}>
                {getFieldDecorator('targetImage', {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                  rules: [
                    { required: true, message: '请上传目标图片!' },
                    { validator: handleCheckUpload },
                  ],
                })(<Upload {...upLoadProps}>
                  <Button>
                    <Icon type="upload"/>上传目标图片
                  </Button>
                </Upload>)}
              </FormItem>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="点位列表" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              <PointList {...listProps} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Form.create()(Task);
