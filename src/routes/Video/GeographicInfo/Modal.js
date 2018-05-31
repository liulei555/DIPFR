import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal } from 'antd';
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
  form: { getFieldDecorator, validateFields, getFieldsValue },
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
      onOk(data);
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label={'名称'} hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
          })(<Input  />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
};
export default Form.create()(modal);
