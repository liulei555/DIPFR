/**
 * 添加单个黑名单
 */
import React from 'react';
import { Modal, Input, Form, DatePicker, Upload, Button, Icon, Select, Cascader } from 'antd';
import moment from 'moment';
import config from '../../utils/config';
import city from '../../utils/address';

const FormItem = Form.Item;
const Option = Select.Option;

const SingleBlack = ({
                       form: {
                         getFieldDecorator,
                         getFieldsValue,
                         getFieldValue,
                         setFieldsValue,
                         validateFields,
                         resetFields,
                         validateFieldsAndScroll,
                       },
                       ...singleBlackProps,
                     }) => {

  const { title, visible, onCreate, onCancel, confirmLoading } = { ...singleBlackProps };

  const sex = { '0': '男', '1': '女' };

  const options = Object.keys(sex).map((key) => (
    <Option value={key} key={`sex${key}`}>{sex[key]}</Option>
  ));

  const dateFormat = 'YYYY-MM-DD';

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        values = {
          ...values,
          birthday: values.birthday ? moment(values.birthday).format(dateFormat) : undefined,
          faceImageAddress: values.faceImageAddress[0].response.message,
          personCertificateType: '1', //证件类型：默认身份证
          province: values.area[0],
          city: values.area[1],
        };
        onCreate(values);
      }
    });
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCheckUpload = (rule, value, callback) => {
    let picture = getFieldValue('faceImageAddress');
    if (picture && picture.length > 0) {
      picture.length > 1 && callback('只能上传一张图片！');
      picture[0].status === 'error' && callback('上传失败，请重新上传！');
      picture[0].response && picture[0].response.status !== '1' && callback('上传失败，请重新上传！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const handleCheckNum = (rule, value, callback) => {
    let num = getFieldValue('personCertificateNum');
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (num) {
      !reg.test(num) && callback('请输入正确的身份证号！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const modalProps = {
    title,
    visible,
    confirmLoading,
    onOk: handleSubmit,
    onCancel,
    destroyOnClose: true,
  };

  const upLoadProps = {
    name: 'fileUpLoad',
    accept: 'image/*',
    action: config.api.uploadOneFile,
    listType: 'picture',
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (<Modal {...modalProps}>
    <Form>
      <FormItem label="姓名" hasFeedback {...formItemLayout}>
        {getFieldDecorator('personName', {
          rules: [{ required: true, message: '请输入姓名!' }],
        })(<Input placeholder="最多10个字" maxLength={10} />)}
      </FormItem>
      <FormItem label="性别" hasFeedback {...formItemLayout}>
        {getFieldDecorator('personSex', {
          rules: [{ required: true, message: '请选择性别!' }],
        })(<Select style={{ width: 172 }}>{options}</Select>)}
      </FormItem>
      <FormItem label="出生" hasFeedback {...formItemLayout}>
        {getFieldDecorator('birthday', {
          rules: [{ required: true, message: '请选择出生年月!' }],
        })(<DatePicker format={dateFormat} placeholder="出生年月" disabledDate={disabledDate} />)}
      </FormItem>
      <FormItem label="区域" hasFeedback {...formItemLayout}>
        {getFieldDecorator('area', {
          rules: [{ required: true, message: '请输入区域!' }],
        })(<Cascader options={city} placeholder="区域" />)}
      </FormItem>
      <FormItem label="证件号" hasFeedback {...formItemLayout}>
        {getFieldDecorator('personCertificateNum', {
          rules: [
            { required: true, message: '请输入证件号!' },
            { validator: handleCheckNum },
          ],
        })(<Input placeholder="证件号" />)}
      </FormItem>
      <FormItem label="照片" hasFeedback {...formItemLayout}>
        {getFieldDecorator('faceImageAddress', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
          rules: [
            { required: true, message: '请上传照片!' },
            { validator: handleCheckUpload },
          ],
        })(<Upload {...upLoadProps}>
          <Button>
            <Icon type="upload" />上传
          </Button>
        </Upload>)}
      </FormItem>
    </Form>
  </Modal>);
};

export default Form.create()(SingleBlack);
