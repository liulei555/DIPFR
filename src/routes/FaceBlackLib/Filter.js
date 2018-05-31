import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Button, Row, Select, Icon } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const Filter = ({
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                  searchForm,
                  onSearch,
                }) => {

  const sex = { '0': '男', '1': '女' };

  const options = Object.keys(sex).map((key) => (
    <Option value={key} key={`sex${key}`}>{sex[key]}</Option>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSearch(values);
      }
    });
  };

  return (<Row className={'filter-row'}>
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem label="姓名" labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
        {getFieldDecorator('personName', {})(<Input placeholder="姓名"/>)}
      </FormItem>
      <FormItem label="性别" labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
        {getFieldDecorator('personSex', {})(<Select style={{ width: 120 }}>{options}</Select>)}
      </FormItem>
      <FormItem label="证件号" labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
        {getFieldDecorator('personCertificateNum', {})(<Input placeholder="证件号"/>)}
      </FormItem>
      <FormItem label="" labelCol={{ span: 16 }} wrapperCol={{ span: 8 }}>
        <Button type="primary" htmlType="submit" className={'button-space-large'}>
          <Icon type="search" />搜索
        </Button>
      </FormItem>
    </Form>
  </Row>);
};

Filter.propTypes = {
  searchForm: PropTypes.object,
  onSearch: PropTypes.func,
};

const mapPropsToFields = {
  mapPropsToFields(props) {
    return {
      personName: Form.createFormField({
        value: props.searchForm.personName,
      }),
      personSex: Form.createFormField({
        value: props.searchForm.personSex,
      }),
      personCertificateNum: Form.createFormField({
        value: props.searchForm.personCertificateNum,
      }),
    };
  },
};

export default Form.create(mapPropsToFields)(Filter);
