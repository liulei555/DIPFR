import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './index.less'
import { Form, TimePicker, Button, Row, Col, DatePicker, Input, Cascader, Switch ,Icon,Select,} from 'antd'
import {wrapAuth} from "../../utils/wrapAuth";
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const AuthButton = wrapAuth(Button);


const formItemLayout = {
  labelCol: {
    xs: {span: 6},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 18},
    sm: {span: 18},
  },
};

const formItemLayout1 = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 9},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 15},
  },
};
const Filter = ({
                  form:{
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                  createCarDispatch,
                  createFaceDispatch,
                  creatTimeStart,
                  creatTimeEnd,
                  dispositionEndTime,
                  onSubmite,
                  dispatch,
                  curPowers,
                }) => {
  const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
  };
  //提交
  const handleSubmit = (e) => {
    e.preventDefault();
      validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(fieldsValue);
      // Should format date value before submit.
      //const rangeTimeValue = fieldsValue['createTime'];
      //console.log(rangeTimeValue);
     /* const values = {
        ...fieldsValue,
        'createTime': [
          rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
          rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
        ],
      };*/
      onSubmite(fieldsValue);
    });
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const handleBlur = () => {
    console.log('blur');
  }

  const handleFocus = () => {
    console.log('focus');
  }

  const onOk = (value) =>{
      console.log(value);
      if(value){
        let startTime = new Date(value[0]._d);
        let endTime = new Date(value[1]._d);
        dispatch({
          type:'dispatchManagement/updateState',
          payload:{
            creatTimeStart:startTime.format('yyyy-MM-dd hh:mm:ss'),
            creatTimeEnd:endTime.format('yyyy-MM-dd hh:mm:ss'),
          }
        })
      }
  }

  const onOkDisStopTime = (value) =>{
    console.log(value);
    if(value){
      let time = new Date(value._d);
      console.log(time.format('yyyy-MM-dd hh:mm:ss'))
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          dispositionEndTime:time.format('yyyy-MM-dd hh:mm:ss'),
        }
      })
    }
  }

  const onChangeTime = () => {
    dispatch({
      type:'dispatchManagement/updateState',
      payload:{
        dispositionEndTime:'',
      }
    })
  }

  const onChangeTimeCreate = () => {
    dispatch({
      type:'dispatchManagement/updateState',
      payload:{
        creatTimeStart:'',
        creatTimeEnd:'',
      }
    })
  }

  return (
    <div className={styles.filterCss}>
      <Form onSubmit={handleSubmit} layout="inline">

          <FormItem
            label="布控类型"
            className={styles.filterCss}
          >
            {getFieldDecorator('dispositionMark',{
              initialValue: '',
            })(
              <Select
                showSearch
                style={{ width: 150,marginBottom:20 }}
                placeholder="请选择类型"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <Option value="1">车辆布控</Option>
                <Option value="2">人脸布控</Option>
                <Option value="">全部</Option>
              </Select>
            )}
          </FormItem>
          <FormItem

            label="创建时间"
          >
            {getFieldDecorator('createTime',{
            })(
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" onOk={onOk} style={{width:395,marginBottom:20 }} onChange={onChangeTimeCreate}/>
            )}
          </FormItem>
          <FormItem
            label="布控截至时间"
            style={{marginBottom:20 }}
          >
            {getFieldDecorator('dispositionEndTime',{
            })(
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择时间"
                onOk={onOkDisStopTime}
                onChange={onChangeTime}
              />
            )}
          </FormItem>
          <FormItem
            label="布控单位"
          >
            {getFieldDecorator('dispositionCompany',{
              initialValue: '',
            })(
              <Select style={{width:150,marginBottom:20}}>
                <Option value="1">刑侦支队</Option>
                <Option value="2">经侦支队</Option>
                <Option value="3">交警支队</Option>
                <Option value="4" >治安支队</Option>
                <Option value="5">情报中心</Option>
                <Option value="6" >其他</Option>
                <Option value="" >全部</Option>
              </Select>
            )}
          </FormItem>
        <br/>
          <FormItem

            label="布控状态"
          >
            {getFieldDecorator('state',{
              initialValue: '',
            })(
              <Select
                showSearch
                style={{ width: 150,marginBottom:20 }}
                placeholder="请选择类型"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <Option value="0">删除</Option>
                <Option value="1">布控</Option>
                <Option value="2">撤控</Option>
                <Option value="3">已处置</Option>
                <Option value="">全部</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
          label="布控描述"
        >
          {getFieldDecorator('dispositionTitle',{
            initialValue: '',
          })(
            <Input style={{width:395,marginBottom:20}}/>
          )}
        </FormItem>
          <FormItem
            label="布控人"
            style={{marginLeft:42,marginBottom:20}}
          >
            {getFieldDecorator('dispositionPerson',{
              initialValue: '',
            })(
              <Input/>
            )}
          </FormItem>
          <Button type='primary'  htmlType="submit" style={{marginLeft:70,width:150}}>查询</Button>
        <br/>
          <Button  type='primary'   onClick={createCarDispatch} style={{marginLeft:10}}>新建车辆布控任务</Button>
          <Button type='primary'   onClick={createFaceDispatch} style={{marginLeft:10}}>新建人脸布控任务</Button>

      </Form>
    </div>
  )
}

Filter.propTypes = {
  //onAdd: PropTypes.func,
}

export default Form.create()(Filter)
