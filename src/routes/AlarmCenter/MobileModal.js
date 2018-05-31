import React from 'react';
import { Input, Radio, Select, Form, Modal, Row, Col, Button } from 'antd';
import style from './Modal.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const formItemInline = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const MobileModal = ({
                       form: {
                         getFieldDecorator,
                         validateFields,
                         getFieldsValue,
                       },
                       ...modalProps
                     }) => {
  const footer = [
    <Button key={'btn1'}>手机MAC轨迹</Button>,
    <Button key={'btn2'}>一车一档</Button>,
  ];

  return (
    <Modal {...modalProps} footer={footer} className={style.alarmModal}>
      <Form>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="手机串号IMSI"
            >
              {getFieldDecorator('number')(
                <Input disabled={true}/>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机MAC地址"
            >
              {getFieldDecorator('address')(
                <Input disabled={true}/>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="站点编号"
            >
              {getFieldDecorator('station')(
                <Input disabled={true}/>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="行驶方向"
            >
              {getFieldDecorator('direction')(
                <Input disabled={true}/>,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="疑似车辆"
            >
              {getFieldDecorator('description')(
                <TextArea placeholder="沪A 88888（3次）
                沪A 88888（4次）
                沪A 88888（5次）" rows={8} disabled={true}/>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem
            {...formItemInline}
            label="处理意见"
          >
            {getFieldDecorator('idea')(
              <TextArea placeholder="11" rows={5} disabled={true}/>,
            )}
          </FormItem>
        </Row>
        <Row>
          <FormItem
            {...formItemInline}
            label="处理结果："
          >
            {getFieldDecorator('result')(
              <RadioGroup disabled={true}>
                <Radio value={1}>未处理</Radio>
                <Radio value={2}>已处理</Radio>
              </RadioGroup>,
            )}
          </FormItem>
        </Row>
      </Form>
    </Modal>
  );
};
export default Form.create()(MobileModal);
