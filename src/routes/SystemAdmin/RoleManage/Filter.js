import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Input, Form, Tree, Card, Button, Table, Row, Col } from 'antd';


const FormItem = Form.Item;

const Filter = ({
                  onOk,
                  dispatch,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                }) => {
  /*const fn = () =>{
    alert('3')
    dispatch({
      type:'roleManage/updateState',
      payload:{
        resetFields:resetFields()
      }
    })
  }*/

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

  const onRefresh = () =>{
    resetFields()
    dispatch({
      type:'roleManage/query',
    })
  }

  return (<div style={{ marginBottom: '15px' }} >
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>{getFieldDecorator('userName', {initialValue: '',})(<Input placeholder="登录名称" />)}</FormItem>
      <FormItem>{getFieldDecorator('name', {initialValue: '',})(<Input placeholder="用户名" />)}</FormItem>
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
