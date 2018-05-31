import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, DatePicker, Button, Row, Col, Radio } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

const Filter = ({
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                  searchTask,
                  addTask,
                }) => {

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        values = {
          ...values,
          videoStartTime: values.videoTime ? moment(values.videoTime[0]).format(dateFormat) : undefined,
          videoEndTime: values.videoTime ? moment(values.videoTime[1]).format(dateFormat) : undefined,
        };
        searchTask(values);
      }
    });
  };

  return (<div className={'box'}>
    <p className={'header-title'}>视频摘要任务管理</p>
    <Form onSubmit={handleSubmit}>
      {/*<Row>
        <Col span={11}>
          <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            {getFieldDecorator('videoStartTime', {})(<DatePicker showTime format={dateFormat} placeholder="开始时间"/>)}
          </FormItem>
        </Col>
        <Col span={2} className={'separator'}>~</Col>
        <Col span={11}>
          <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            {getFieldDecorator('videoEndTime', {})(<DatePicker showTime format={dateFormat} placeholder="结束时间"/>)}
          </FormItem>
        </Col>
      </Row>*/}
      <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
        {getFieldDecorator('videoName', {})(<Input placeholder="任务名称"/>)}
      </FormItem>
      <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
        {getFieldDecorator('videoTime', {
          rules: [
            { type: 'array', },
          ],
        })(<RangePicker placeholder={['开始时间','结束时间']} showTime format={dateFormat}/>)}
      </FormItem>
      <FormItem label="任务状态" labelCol={{ span: 4 }} wrapperCol={{ span: 17 }}>
        {getFieldDecorator('taskStatus', {})(<RadioGroup>
          <Radio value="33">已完成</Radio>
          <Radio value="-1">未完成</Radio>
        </RadioGroup>)}
      </FormItem>
      <Row type="flex" justify="center">
        <Button type="primary" htmlType="submit" className={'button-space-all'}>
          任务查询
        </Button>
        <Button htmlType="button" onClick={addTask} className={'button-space-all'}>
          任务新建
        </Button>
      </Row>
    </Form>
  </div>);
};

Filter.propTypes = {
  searchTask: PropTypes.func,
  addTask: PropTypes.func,
};

export default Form.create()(Filter);
