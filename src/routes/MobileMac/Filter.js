import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Form, TimePicker, Button, Row, Col, DatePicker, Input, Cascader, Switch ,Icon,Select,Radio } from 'antd'
import {wrapAuth} from "../../utils/wrapAuth";
import style from "./index.less";
const AuthButton = wrapAuth(Button);
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const Filter = ({
                  form:{
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
	                search,
									...filterProps
                }) => {
  const rangeConfig = {
    rules: [{ type: 'array', required: false}],
  };
  //提交代码
  const handleSubmit = (e) => {
    e.preventDefault();
      validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const rangeTimeValue = fieldsValue['timePicker'];
      const values = {
        ...fieldsValue,
        'timePicker': [
	        rangeTimeValue && rangeTimeValue.length ? rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss') : '',
	        rangeTimeValue && rangeTimeValue.length ? rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss') : '',
        ],
      };
	      search(values);
    });
  };
  return (
    <div {...filterProps}>
      <Form onSubmit={handleSubmit} className="ant-advanced-search-form">
        <Row gutter={24} type="flex" justify="start">
          <Col xs={{ span: 8}}>
            <FormItem
              label="时段"
            >
              {getFieldDecorator('timePicker', rangeConfig)(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />         
              )}
            </FormItem>
          </Col>
          <Col span={4} >
            <FormItem
              label="站点编号"
            >
              {getFieldDecorator('siteNumber')(
                <Input/>
              )}
            </FormItem>
          </Col>
	        <Col span={5} >
		        <FormItem
			        label="疑似车辆号牌"
		        >
			        {getFieldDecorator('suspectedVehicle')(
				        <Input/>
			        )}
		        </FormItem>
	        </Col>
        </Row>
        <Row gutter={24} type="flex" justify="start">
	        <Col span={4} >
		        <FormItem
			        label="手机串号"
		        >
			        {getFieldDecorator('phoneImsi')(
				        <Input/>
			        )}
		        </FormItem>
	        </Col>
	        <Col span={5} >
		        <FormItem
			        label="手机MAC地址"
		        >
			        {getFieldDecorator('phoneMac')(
				        <Input/>
			        )}
		        </FormItem>
	        </Col>
          <Col span={4}>
            <FormItem
              label="报警处理"
            >
              {getFieldDecorator('processingResult',{
	              initialValue:''
              })(
                <Select>
                  <Option value="">全部</Option>
                  <Option value="0">已处理</Option>
                  <Option value="1">未处理</Option>
                </Select>
              )}
            </FormItem>
          </Col>
	        <Col span={7}>
		        <FormItem
			        label="行驶方向"
		        >
			        {getFieldDecorator('drivingDirection')(
				        <RadioGroup>
					        <Radio value=''>全部</Radio>
					        <Radio value='进上海'>进上海</Radio>
					        <Radio value='出上海'>出上海</Radio>
				        </RadioGroup>
			        )}
		        </FormItem>
	        </Col>
          <Col span={1}>
            <FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

Filter.propTypes = {
  //onAdd: PropTypes.func,
}

export default Form.create()(Filter)
