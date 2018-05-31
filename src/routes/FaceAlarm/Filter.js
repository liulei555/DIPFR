import React from 'react';
import moment from 'moment';
import { Form, Button, Row, Col, DatePicker, Input, Icon, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const Filter = ({
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                    getFieldValue,
                  },
                  onSearch,
                }) => {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';

  //提交代码
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        values = {
          ...values,
          startTime: values.startTime ? moment(values.startTime).format(dateFormat) : undefined,
          endTime: values.endTime ? moment(values.endTime).format(dateFormat) : undefined,
        };
        onSearch(values);
      }
    });
  };

  const handleCheckStartTime = (rule, value, callback) => {
    let startTime = getFieldValue('startTime');
    let endTime = getFieldValue('endTime');
    if (startTime && endTime) {
      startTime.diff(endTime) > 0 && callback('开始时间不能大于结束时间！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const handleCheckEndTime = (rule, value, callback) => {
    let startTime = getFieldValue('startTime');
    let endTime = getFieldValue('endTime');
    if (startTime && endTime) {
      startTime.diff(endTime) > 0 && callback('开始时间不能大于结束时间！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  return (
    <Form onSubmit={handleSubmit} className="search-form">
      <Row gutter={36} type="flex" justify="start">
        <Col>
          <Row type="flex" justify="end">
            <FormItem
              label="时段"
            >
              {getFieldDecorator('startTime', {
                rules: [
                  { validator: handleCheckStartTime },
                ],
              })(
                <DatePicker showTime format={dateFormat} placeholder="开始时间"/>,
              )}
            </FormItem>
            <h4 className={'text-date'}>至</h4>
            <FormItem
              label=""
            >
              {getFieldDecorator('endTime', {
                rules: [
                  { validator: handleCheckEndTime },
                ],
              })(
                <DatePicker showTime format={dateFormat} placeholder="结束时间"/>,
              )}
            </FormItem>
          </Row>
          <Row type="flex" justify="end">
            <FormItem
              label="报警设备"
            >
              {getFieldDecorator('AlarmEquipment', { initialValue: 'lucy' })(
                <>
                  <Select className={'base-width'} defaultValue={'lucy'}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                  </Select>
                  <Button className={'base-width btn-margin'}><Icon type="environment"/>地图选点</Button>
                </>,
              )}
            </FormItem>
          </Row>
        </Col>
        <Col>
          <Row>
            <FormItem
              label="布控单位"
            >
              {getFieldDecorator('DispatchingUnit', { initialValue: 'jack' })(
                <Select className={'base-width'}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                </Select>,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem
              label="报警处理"
            >
              {getFieldDecorator('AlarmProcessing')(
                <Select className={'base-width'}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                </Select>,
              )}
            </FormItem>
          </Row>
        </Col>
        <Col>
          <Row type={'flex'} justify={'end'}>
            <FormItem
              label="布控人"
            >
              {getFieldDecorator('DispatchingPerson')(
                <Input/>,
              )}
            </FormItem>
          </Row>
          <Row type={'flex'} justify={'end'}>
            <FormItem
              label="布控人描述"
            >
              {getFieldDecorator('DispatchingDsc')(
                <Input/>,
              )}
            </FormItem>
          </Row>
        </Col>
        <Col className={'align-end'}>
          <Row>
            <FormItem>
              <Button type="primary" htmlType="submit"><Icon type="search"/>搜索</Button>
            </FormItem>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(Filter);
