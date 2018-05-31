import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const SceneGroupModal = ({
                           form: {
                             getFieldDecorator,
                             validateFields,
                             resetFields,
                             getFieldValue,
                           },
                           modalType,
                           sceneGroup,
                           commitData,
                           ...modalProps,
                         }) => {

  const FormItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const validateAutoBeginTime = (rule, value, callback) => {
    const reg = /[0-9]{2}:[0-9]{2}:[0-9]{2}/;
    if (value) {
      if (reg.test(value)) {
        callback();
      } else {
        callback('时间格式不正确');
      }
    } else {
      callback('请输入自动启动时间');
    }
  };

  const validateMinValue = (rule, value, callback) => {
    if (value) {
      if (value > 0) {
        callback();
      } else {
        callback('请输入大于0的数');
      }
    } else {
      callback('请输入间隔时间');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        commitData(values);
        setTimeout(() => {
          resetFields();
        }, 1000);
      }
    });
  };

  return (
    <Modal {...modalProps} onOk={handleSubmit}>
      <Form>
        <FormItem label={'场景组名称'}  {...FormItemLayout} hasFeedback>
          {getFieldDecorator('yamc', {
            initialValue: (modalType === 'update') ? sceneGroup.yamc : '',
            rules: [{
              required: true, message: '请输入场景组名称',
            }],
          })(<Input/>)}
        </FormItem>
        <FormItem label={'默认布局'}  {...FormItemLayout} hasFeedback>
          {getFieldDecorator('mrbj', {
            initialValue: (modalType === 'update') ? sceneGroup.mrbj : '',
            rules: [{
              required: true, message: '请选择默认布局',
            }],
          })(<Select>
            <Option value='1'>1</Option>
            <Option value='4'>4</Option>
          </Select>)}
        </FormItem>
        <FormItem label={'自动启动时间'}  {...FormItemLayout} hasFeedback>
          {getFieldDecorator('zdqdsj', {
            initialValue: (modalType === 'update') ? sceneGroup.zdqdsj : '',
            rules: [{ validator: validateAutoBeginTime }],
          })(<Input placeholder="00:00:00"/>)}
        </FormItem>
        <FormItem label={'间隔时间(秒)'}  {...FormItemLayout} hasFeedback>
          {getFieldDecorator('jgsj', {
            rules: [{ validator: validateMinValue }],
            initialValue: (modalType === 'update') ? sceneGroup.jgsj : '',
          })(<Input/>)}
        </FormItem>
      </Form>
    </Modal>
  );
};
export default Form.create()(SceneGroupModal);
