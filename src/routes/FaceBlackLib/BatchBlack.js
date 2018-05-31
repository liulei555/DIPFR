/**
 * 批量添加黑名单
 */
import React from 'react';
import { Modal, Input, Form, Upload, Button, Icon } from 'antd';
import config from '../../utils/config';

const FormItem = Form.Item;

const BatchBlack = ({
                      form: {
                        getFieldDecorator,
                        getFieldsValue,
                        getFieldValue,
                        setFieldsValue,
                        validateFields,
                        resetFields,
                        validateFieldsAndScroll,
                      },
                      ...batchBlackProps,
                    }) => {

  const { title, visible, onCreate, onCancel } = { ...batchBlackProps };


  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onCreate({srcPath: values.zipFile[0].response.message});
      }
    });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCheckUpload = (rule, value, callback) => {
    let file = getFieldValue('zipFile');
    if (file && file.length > 0) {
      file.length > 1 && callback('只能上传一个压缩包！');
      file[0].status === 'error' && callback('上传失败，请重新上传！');
      file[0].response && file[0].response.status !== '1' && callback('上传失败，请重新上传！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const modalProps = {
    title,
    visible,
    onOk: handleSubmit,
    onCancel,
    destroyOnClose: true,
  };

  const upLoadProps = {
    name: 'fileUpLoad',
    accept: 'application/x-zip-compressed',
    action: config.api.uploadOneFile,
    listType: 'picture',
  };

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  return (<Modal {...modalProps}>
    <Form>
      <FormItem label="文件" hasFeedback {...formItemLayout}>
        {getFieldDecorator('zipFile', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
          rules: [
            { required: true, message: '请上传压缩文件!' },
            { validator: handleCheckUpload },
          ],
        })(<Upload {...upLoadProps}>
          <Button>
            <Icon type="upload"/>上传
          </Button>
        </Upload>)}
      </FormItem>
      <FormItem label="说明" {...formItemLayout}>
        <h4>请上传图片和excel的压缩包</h4>
      </FormItem>
    </Form>
  </Modal>);
};

export default Form.create()(BatchBlack);
