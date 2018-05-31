import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Input,Menu,Radio,Row,Col,DatePicker,Select,Form } from 'antd'
import './ModalLeft.less'
const confirm = Modal.confirm
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option
const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
};
const ModalLeft = ({
                     form:{
                       getFieldDecorator,
                       validateFields,
                       getFieldsValue,
                     }
                   }) => {
  const onChange = (e) => {
    console.log('radio checked', e.target.value);/*
    this.setState({
      value: e.target.value,
    });*/
  }
  return (
    <div id="modalLeft">
      <Form>
        <FormItem
          {...formItemLayout}
          label="布控名称："
        >
          {getFieldDecorator('name')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="时段"
        >
          {getFieldDecorator('range-time-picker')(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"   />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控类型"
        >
          {getFieldDecorator('DispatchingUnit')(
            <Select defaultValue="lucy" >
              <Option value="jack">Jack</Option>
              <Option value="disabled" disabled>Disabled</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控种类"
        >
          {getFieldDecorator('DispatchingUnit')(
            <Select defaultValue="lucy" >
              <Option value="jack">Jack</Option>
              <Option value="disabled" disabled>Disabled</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控级别："
        >
          {getFieldDecorator('DispatchingUnit')(
            <Select defaultValue="lucy" >
              <Option value="jack">Jack</Option>
              <Option value="disabled" disabled>Disabled</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控人："
        >
          {getFieldDecorator('name')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控单位："
        >
          {getFieldDecorator('name')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控原因："
        >
          {getFieldDecorator('name')(
            <Input />
          )}
        </FormItem>
      报警处理
      <hr></hr>
        <FormItem
          {...formItemLayout}
          label="联系人员："
        >
          {getFieldDecorator('name')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话："
        >
          {getFieldDecorator('name')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系单位："
        >
          {getFieldDecorator('name')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="操作建议："
        >
          {getFieldDecorator('name')(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="处理意见："
        >
          {getFieldDecorator('name')(
            <TextArea placeholder="11" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="处理结果："
        >
          {getFieldDecorator('name')(
            <RadioGroup onChange={onChange} >
              <Radio value={1}>未处理</Radio>
              <Radio value={2}>已处理</Radio>
            </RadioGroup>
          )}
        </FormItem>

      </Form>
    </div>
  )
}

export default Form.create()(ModalLeft)
