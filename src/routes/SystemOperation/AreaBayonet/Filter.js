import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Input, Form, Select, Card, Button, Table, Row, Col } from 'antd';

const Option = Select.Option
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
                  dispatch,
                  syncCache,
                  synctime
                }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:'bayonetDevice/updateState',
          payload:{
            filterValue:values,
          }
        })
        search(values);
      }
    });
  };
  const handleSyncCache = (e) => {
    e.preventDefault();
    syncCache()
  };

  const onRefresh = () =>{
    resetFields()
    /*dispatch({
      type:'deviceInfo/query',

    })*/
    search();
  }

  return (<div style={{ marginBottom: '15px' }} >
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>{getFieldDecorator('deviceName', {})(<Input placeholder="设备名称" />)}</FormItem>
      <FormItem>{getFieldDecorator('deviceType', {})(
        <Select

        showSearch
        style={{ width: 150}}
        placeholder="请选择设备类型"
      >
        <Option value="4">卡口</Option>
        <Option value="5">摄像头</Option>
        <Option value="14">硬盘录像机</Option>
        <Option value="15">视频矩阵</Option>
        <Option value="3">3G电警</Option>
        <Option value="">全部</Option>
      </Select>)}
      </FormItem>
      <FormItem>{getFieldDecorator('deviceNumber', {})(<Input placeholder="设备编码" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button type="primary" onClick={onRefresh}>
          刷新
        </Button>
        {/*<Button type="primary" htmlType="button" onClick={handleSyncCache}>
          同步缓存{synctime}
        </Button>*/}
      </FormItem>
    </Form>
  </div>)
};

Filter.propTypes = {
};

export default Form.create()(Filter);
