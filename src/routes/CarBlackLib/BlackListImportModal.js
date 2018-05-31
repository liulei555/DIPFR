
import React from 'react';
import { Modal, Input, Form, Row,Select,Upload, message, Button, Icon } from 'antd';
import config from '../../utils/config'
const {api}=config
const FormItem = Form.Item;
const Option = Select.Option;

const BlackListImportModal = ({
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

  const { title, visible, onCancel,onBatchImport } = { ...blackLibProps };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        //onCreate(values);
      }
    });
  };
  const dataPost=(file) => {
    return {
      filename:file.name,
    };
  }
  const props = {
    name: 'file',
    action: api.uploadOneFile,
    accept: 'application/x-zip-compressed',
    className: 'upload-list-inline',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        onBatchImport(info.file.response.data)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功！`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败！`);
      }
    },
    data:dataPost
  };
  const modalProps = {
    title,
    visible,
    onOk: handleSubmit,
    onCancel,
    destroyOnClose: true,
  };
  return (<Modal {...modalProps} footer={null}>
    <Form>
      <Row>
        <FormItem label="文件信息" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {getFieldDecorator('fileName', {
          })(<Upload {...props}>
            <Button>
              <Icon type="upload" /> 上传文件
            </Button>
          </Upload>)}
        </FormItem>
      </Row>
     {/* <FormItem label="黑名单库描述" hasFeedback labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('type', {
          rules: [{ required: true, message: '黑名单库描述!' }],
        })(<Input placeholder="黑名单库描述"/>)}
      </FormItem>*/}
    </Form>
  </Modal>);
};

export default Form.create()(BlackListImportModal);
