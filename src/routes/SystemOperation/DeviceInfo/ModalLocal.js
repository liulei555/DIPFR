import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Modal, Row, Col, Button, Select,Card} from 'antd';

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
                 form: {getFieldDecorator, validateFields, getFieldsValue},
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const handleBlur = () => {
    console.log('blur');
  }

  const handleFocus = () => {
    console.log('focus');
  }


  return (
    <Modal {...modalOpts} width="60%">
      <Row style={{marginBottom:20}}>
        <Col span={7}>行政区域：<Select
          showSearch
          style={{width: 150}}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="jack">Jack</Option>
        </Select>
        </Col>
        <Col span={7}>
          设备类型：<Select
          showSearch
          style={{width: 150}}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="jack">Jack</Option>
        </Select>
        </Col>
        <Col span={7}>
          名称：<Input style={{width:150}}/>
        </Col>
        <Col span={3}>
          <Button>查询</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card title="Card title"  style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

modal.propTypes = {};
export default Form.create()(modal);
