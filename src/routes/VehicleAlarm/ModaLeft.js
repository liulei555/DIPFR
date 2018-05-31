import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Input,Menu,Radio,Button,Col,DatePicker,Select,Form } from 'antd'
import './ModalLeft.less'
import moment from 'moment';
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
                     },
                     item
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
          {getFieldDecorator('dispositionTitle', {
            initialValue: item.dispositionTitle,
          })(
           <Input disabled={true} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="时段"
        >
          {getFieldDecorator('createTime',{
            initialValue:'',//moment(item.createTime, "YYYY-MM-DD HH:mm:ss")
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"  disabled={true} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控类型"
        >
          {getFieldDecorator('dispositionType',{
            initialValue:item.dispositionType
          })(
            <Select defaultValue="lucy" disabled={true}>
              <Option value="jack">Jack</Option>
              <Option value="disabled" disabled>Disabled</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控种类"
        >
          {getFieldDecorator('dispositionCategory',{
            initialValue:item.dispositionCategory,
          })(
            <Select defaultValue="lucy" disabled={true} >
              <Option value="jack">Jack</Option>
              <Option value="disabled" disabled>Disabled</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控级别："
        >
          {getFieldDecorator('seriousLevel',{
            initialValue:item.seriousLevel,
          })(
            <Select defaultValue="lucy" disabled={true}>
              <Option value="jack">Jack</Option>
              <Option value="disabled" disabled>Disabled</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控人："
        >
          {getFieldDecorator('dispositionPerson',{
            initialValue:item.dispositionPerson,
          })(
            <Input disabled={true}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控单位："
        >
          {getFieldDecorator('dispositionCompany',{
            initialValue:item.dispositionCompany,
          })(
            <Input disabled={true}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="布控原因："
        >
          {getFieldDecorator('dispositionReason',{
            initialValue:item.dispositionReason,
          })(
            <Input disabled={true}/>
          )}
        </FormItem>
      报警处理
      <hr></hr>
        <FormItem
          {...formItemLayout}
          label="联系人员："
        >
          {getFieldDecorator('alarmAssociate',{
            initialValue:item.alarmAssociate,
          })(
            <Input disabled={true}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话："
        >
          {getFieldDecorator('contactNumber',{
            initialValue:item.contactNumber
          })(
            <Input disabled={true}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系单位："
        >
          {getFieldDecorator('contactCompany',{
            initialValue:item.contactCompany
          })(
            <Input disabled={true}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="操作建议："
        >
          {getFieldDecorator('proposalOperation',{
            initialValue:item.proposalOperation
          })(
            <Input disabled={true}/>
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
        <FormItem
          label=""
          style={{textAlign:'center'}}
        >
          {getFieldDecorator('name')(
            <Button>提交</Button>
          )}
        </FormItem>
      </Form>
    </div>
  )
}

export default Form.create()(ModalLeft)
