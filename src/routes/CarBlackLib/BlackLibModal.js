/**
 * 新建黑名单库
 */
import React from 'react';
import { Modal, Input, Form, Row,Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const BlackLib = ({
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                    ...blackLibProps,
                }) => {

  const { title, visible, onCreate, onCancel } = { ...blackLibProps };
  const type = {1:'临时库',2:'其他库'};
  const options = Object.keys(type).map((key)=>(
    <Option value={key} key={key}>{type[key]}</Option>
  ));
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onCreate(values);
      }
    });
  };

  const modalProps = {
    title,
    visible,
    onOk: handleSubmit,
    onCancel,
    destroyOnClose: true,
  };

  return (<Modal {...modalProps}>
    <Form>
      <FormItem label="黑名单库名称" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehicleBlacklibName', {
          rules: [{ required: true, message: '请输入黑名单库名称!' }],
        })(<Input placeholder="最多输入25字" maxLength={25}/>)}
      </FormItem>
      <FormItem label="黑名单库描述" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: '请输入黑名单库描述!' }],
        })(<Input placeholder="最多输入50字" maxLength={50} />)}
      </FormItem>
      <FormItem label="黑名单库类型" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('type', {
          rules: [{ required: true, message: '黑名单库类型!' }],
        })(<Select>{options}</Select>)}
      </FormItem>
    </Form>
  </Modal>);
};

export default Form.create()(BlackLib);
