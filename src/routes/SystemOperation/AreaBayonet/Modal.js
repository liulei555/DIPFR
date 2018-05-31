import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal,message,notification } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const modal = ({
                 item = {},
                 onOk,
                 dispatch,
                 form: { getFieldDecorator, validateFields, getFieldsValue,resetFields },
                 ...modalProps
               }) => {
  const handleOk = () => {
    validateFields(errors => {
      if (errors) {
        return;
      }
      //清空提示信息
      const data = {
        ...getFieldsValue(),
      };
      let reg= /^[^\s]*$/;
      dispatch({
        type:'bayonetDevice/updateState',
        payload:{
          resetFields:resetFields()
        }
      })
      if(reg.test(data.name)){
        onOk(data);
      }else{
        message.warning('不能为空，请重新输入！')
      }
    });
  };

  const onCancel = () => {
    dispatch({
      type:'bayonetDevice/updateState',
      payload:{
        modalVisible: false
      }
    })
    resetFields()
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  const openNotificationWithIcon = (e) => {
    if(e.target.value.length === 20){
      notification['warning']({
        message: '最多只能输入20个字符!',
      });
    }
  };
  return (
    <Modal {...modalOpts} onCancel={onCancel}>
      <Form layout="horizontal">
        <FormItem label={'名称'}  {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '不能为空!',
            }],
          })(<Input  maxLength="20" onChange={openNotificationWithIcon}/>)}
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
};
export default Form.create()(modal);
