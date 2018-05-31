import React from 'react';
import { Input, Radio, DatePicker, Select, Form } from 'antd';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const RadioGroup = Radio.Group;
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

const AlarmDetail = ({
                       form: {
                         getFieldDecorator,
                         validateFields,
                         getFieldsValue,
                       },
                     }) => {

  return (
    <Form>
      <FormItem
        {...formItemLayout}
        label="布控描述"
      >
        {getFieldDecorator('description')(
          <Input disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="布控时间段"
      >
        {getFieldDecorator('range-time-picker')(
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="布控类型"
      >
        {getFieldDecorator('type')(
          <Select disabled={true}>
            <Option value="jack">Jack</Option>
            <Option value="disabled" disabled>Disabled</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="布控种类"
      >
        {getFieldDecorator('DispatchingUnit')(
          <Select disabled={true}>
            <Option value="jack">Jack</Option>
            <Option value="disabled" disabled>Disabled</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="严重级别"
      >
        {getFieldDecorator('level')(
          <Select disabled={true}>
            <Option value="jack">Jack</Option>
            <Option value="disabled" disabled>Disabled</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="布控人"
      >
        {getFieldDecorator('name')(
          <Input disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="布控单位"
      >
        {getFieldDecorator('unit')(
          <Input disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="布控原因"
      >
        {getFieldDecorator('reason')(
          <Input disabled={true}/>,
        )}
      </FormItem>
      报警处理
      <hr></hr>
      <FormItem
        {...formItemLayout}
        label="联系人员"
      >
        {getFieldDecorator('person')(
          <Input disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="联系电话"
      >
        {getFieldDecorator('phone')(
          <Input disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="联系单位"
      >
        {getFieldDecorator('contact')(
          <Input disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="操作建议"
      >
        {getFieldDecorator('operation')(
          <Input disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="处理意见"
      >
        {getFieldDecorator('idea')(
          <TextArea placeholder="11" disabled={true}/>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="处理结果："
      >
        {getFieldDecorator('result')(
          <RadioGroup disabled={true}>
            <Radio value={1}>未处理</Radio>
            <Radio value={2}>已处理</Radio>
          </RadioGroup>,
        )}
      </FormItem>
    </Form>
  );
};

export default Form.create()(AlarmDetail);
