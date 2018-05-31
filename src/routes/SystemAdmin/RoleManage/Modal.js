import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal,notification,message  } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
let msg = '';
let mes = '';
const modal = ({
  item = {},
  onOk,
  dispatch,
  selectedRowsData,
  form: { getFieldDecorator, validateFields, getFieldsValue,resetFields },
  ...modalProps
}) => {

  const handleOk = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      //清空提示信息
      const data = {
        ...getFieldsValue(),
      };

      dispatch({
        type:'roleManage/updateState',
        payload:{
          resetFields:resetFields()
        }
      })
      let reg= /^[^\s]*$/;
      if(reg.test(values.name)){
        onOk(values);
      }else{
        message.warning('不能为空，请重新输入！')
      }
    });
  };

  const onCancel = () => {
    dispatch({
      type: 'roleManage/updateState',
      payload: {
        modalVisible: false
      }
    })
    resetFields()
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    onCancel:onCancel
  };


  const openNotificationWithIcon = (e) => {
    if(e.target.value.length > 20){
      notification['warning']({
        message: '最多只能输入20个字符!',
      });
    }
  };


  const checkNumber = (rule, value, callback) => {
    if (value) {
      if (value.length === 0) {
        msg = '',
          callback();
      } else if (value.length > 20) {
        msg = '只能输入20个字符';
        callback();
      } else if (value.length > 0 <= 20) {
        callback();
      }
    } else {
      msg = ' ';
      callback();
    }
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal" onSubmit={handleOk}>
        <FormItem label={'名称'} {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue:selectedRowsData?selectedRowsData.roleName:'',
            rules: [{
              type: 'string',
              max: 20,
              //validator: checkNumber,
              required: true, message: '必填并且只能输入20个字符'
            }],
          })(
              <Input placeholder='请输入名称'  onChange={openNotificationWithIcon}/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
};
export default Form.create()(modal);
