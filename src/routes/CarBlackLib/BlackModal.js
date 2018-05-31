/**
 * 新建黑名单库
 */
import React from 'react';
import { Modal, Input, Form, Row,Col,Button,Upload,Icon,message,Select } from 'antd';
import style from './BlackModal.less'
import config from '../../utils/config'
const { api } = config
import configUrl from '../../config';
const FormItem = Form.Item;
const Option = Select.Option;
let footer = []
let isDisable = false;
const BlackModal = ({
  dispatch,
  imageUrl,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    setFieldsValue,
    validateFields,
    resetFields,
    validateFieldsAndScroll,
  },
  ...blackProps,
}) => {

  const { title, visible,onCancel,onOk,item,modalType,loading} = { ...blackProps };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  if (modalType === 'detail') {
    isDisable = true
    footer = null
  } else {
    isDisable = false
    footer = [
      <Button key="back" onClick={onCancel}>取消</Button>,
      <Button key="submit" type="primary" onClick={handleSubmit}>
        确定
      </Button>,
    ]
  }
  const modalProps = {
    title,
    visible,
    onCancel,
    onOk,
    item,
    imageUrl,
  };
  const uploadButton = (
    <Button>
      <Icon type="upload" /> 上传
    </Button>
  );
  //上传图片发送的参数
  const dataPost = (file) => {
    return {
      filename: file.name,
    };
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleCheckUpload = (rule, value, callback) => {
    let picture = getFieldValue('vehicleImageUrl');
    if (picture && picture.length > 0) {
      console.log(picture, picture.length)
      picture.length > 1 && callback('只能上传一张图片！');
      picture[0].response && picture[0].response.status !== '1' && callback('上传失败，请重新上传！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };
  const props = {
    name: 'file',
    action: api.uploadOneFile,
    accept: 'image/*',
    listType: 'picture',
    className: 'upload-list-inline',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        dispatch({
          type: 'carBlackLib/updateState',
          payload: { imageUrl: info.file.response.data },
        })
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功！`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败！`);
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        message.error('You can only upload JPG file!');
        return false;

      }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   message.error('Image must smaller than 2MB!');
      // }
      return isJPG;
    },
    data: dataPost
  };
  const bodyColor = { '1': '黑色', '2': '白色', '3': '红色', '4': '其他' }
  const bodyColorOptions = Object.keys(bodyColor).map((key) => (
    <Option value={key} key={key}>{bodyColor[key]}</Option>
  ));
  const color = { '1': '蓝色', '2': '黑色', '3': '白色', '4': '绿色', '5': '黄色' };
  const pro = ["京", "浙", "津", "皖", "沪", "闽", "渝", "赣", "港", "鲁", "澳", "豫", "蒙", "鄂", "新", "湘", "宁", "粤", "藏", "琼", "桂", "川", "冀", "黔", "晋", "云", "辽", "陕", "吉", "甘", "黑", "青", "苏", "台"];
  const options = Object.keys(color).map((key) => (
    <Option value={key} key={key}>{color[key]}</Option>
  ));
  const provinceOptions = pro.map(pro => <Option key={pro}>{pro}</Option>);
  return (<Modal {...modalProps} footer={footer}>
    <Form className={style.blackModal}>
      <Row>
        <Col span={12}>
          <FormItem label="号牌号码" labelCol={{ span: 12 }} wrapperCol={{ span: 9 }}>
            {getFieldDecorator('vehicleBrandNum', {
              initialValue: item.vehicleBrandNum,
              rules: [{ required: true, message: '请选择!' }],
            })(
              <Select style={{ width: 80 }} disabled={isDisable}>{provinceOptions}</Select>
            )}
          </FormItem>
        </Col>
        <Col span={12} pull={1}>
          <FormItem label="" hasFeedback labelCol={{ span: 0 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('vehicleBrandNum1', {
              initialValue: item.vehicleBrandNum1,
              rules: [{ required: true, message: '请输入号牌号码!' }],
            })(<Input placeholder="号牌号码" disabled={isDisable} maxLength={10}/>)}
          </FormItem>
        </Col>
      </Row>
      <FormItem label="号牌颜色" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehiclePlateColor', {
          initialValue: item.vehiclePlateColor,
          //   rules: [{ required: true, message: '请输入号牌颜色!' }],
        })(<Select placeholder="号牌颜色" disabled={isDisable}>{options}</Select>)}
      </FormItem>
      <FormItem label="车辆品牌" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehicleBrand', {
          initialValue: item.vehicleBrand,
          //  rules: [{ required: true, message: '请输入车辆品牌' }],
        })(<Input placeholder="车辆品牌" disabled={isDisable} maxLength={10} />)}
      </FormItem>
      <FormItem label="车身颜色" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehicleBodyColor', {
          initialValue: item.vehicleBodyColor,
          //  rules: [{ required: true, message: '请输入车身颜色!' }],
        })(<Select placeholder="车身颜色" disabled={isDisable}>{bodyColorOptions}</Select>)}
      </FormItem>
      <FormItem label="车主姓名" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehicleOwner', {
          initialValue: item.vehicleOwner,
          //   rules: [{ required: true, message: '请输入车主姓名!' }],
        })(<Input placeholder="车主姓名" disabled={isDisable} maxLength={16} />)}
      </FormItem>
      <FormItem label="车主联系电话" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehicleOwnerPhone', {
          initialValue: item.vehicleOwnerPhone,
          // rules: [{ required: true, message: '请输入车主联系电话!' }],
        })(<Input placeholder="车主联系电话" disabled={isDisable} maxLength={11} />)}
      </FormItem>
      <FormItem label="车主身份证号" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehicleOwnerCard', {
          initialValue: item.vehicleOwnerCard,
          // rules: [{ required: true, message: '请输入车主身份证号!' }],
        })(<Input placeholder="车主身份证号" disabled={isDisable} maxLength={18} />)}
      </FormItem>
      <FormItem label="车辆图片" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehicleImageUrl', {
          initialValue: item.vehicleImageUrl,
          // valuePropName: 'fileList',
          // getValueFromEvent: normFile,
          // rules: [
          //   { validator: handleCheckUpload },
          // ],
        })(<Upload {...props} disabled={isDisable}>
          {item.vehicleImageUrl ? <img width="100%" height="100%" alt="img" src={configUrl.imgIp + item.vehicleImageUrl.replace('/home', '')} /> : uploadButton}
        </Upload>)}
      </FormItem>
    </Form>
  </Modal>);
};
export default Form.create()(BlackModal);
