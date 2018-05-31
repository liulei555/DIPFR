import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Input, Form, Tree, Card, Button, Table, Row, Col } from 'antd';


const FormItem = Form.Item;

const Filter = ({
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                  search,
                  syncCache,
                  synctime
                }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        search(values);
      }
    });
  };
  const handleSyncCache = (e) => {
    e.preventDefault();
    syncCache()
  };

  return (<div style={{ marginBottom: '15px' }} >
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>{getFieldDecorator('deviceName', {})(<Input placeholder="设备名称" />)}</FormItem>
      <FormItem>{getFieldDecorator('deviceType', {})(<Input placeholder="设备类型" />)}</FormItem>
      <FormItem>{getFieldDecorator('deviceNumber', {})(<Input placeholder="设备编码" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button type="primary" htmlType="submit">
          刷新
        </Button>
        <Button type="primary" htmlType="button" onClick={handleSyncCache}>
          同步缓存{synctime}
        </Button>
      </FormItem>
    </Form>
  </div>)
};

Filter.propTypes = {
};

export default Form.create()(Filter);
