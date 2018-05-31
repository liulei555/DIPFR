import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Input, Form, Tree, Card, Button, Table, Row, Col } from 'antd';


const FormItem = Form.Item;

const Filter = ({
                  onOk,
                  onRefresh,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(fieldsValue);
      onOk(fieldsValue);
    });
  }

  return (<div style={{ marginBottom: '15px' }} >
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>{getFieldDecorator('userName', {initialValue: '',})(<Input placeholder="用户名称" />)}</FormItem>
      <FormItem>{getFieldDecorator('userId', {initialValue: '',})(<Input placeholder="用户ID" />)}</FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={onRefresh}>
          刷新
        </Button>
      </FormItem>
    </Form>
  </div>)
};

Filter.propTypes = {
};

export default Form.create()(Filter);
