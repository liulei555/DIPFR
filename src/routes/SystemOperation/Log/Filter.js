import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Input, Form, Tree, Card, Button, Table, Row, Col,Select,DatePicker } from 'antd';

const RangePicker = DatePicker.RangePicker;
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
        search(values);
      }
    });
  };
  const handleSyncCache = (e) => {
    e.preventDefault();
    syncCache()
  };


  var format = function(time, format)
  {
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : "") + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
      switch(a){
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      }
    })
  }
  const onOk = (value) =>{
    console.log(value);
    if(value){
      let startTime = new Date(value[0]._d);
      let endTime = new Date(value[1]._d);

      let time1=startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate() + ' ' + startTime.getHours() + ':' + startTime.getMinutes() + ':' + startTime.getSeconds();

      let time2=endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + endTime.getHours() + ':' + endTime.getMinutes() + ':' + endTime.getSeconds();

      let time3=format(startTime, 'yyyy-MM-dd HH:mm:ss')
      dispatch({
        type:'log/updateState',
        payload:{
          startTime:format(startTime, 'yyyy-MM-dd HH:mm:ss'),
          endTime:format(endTime, 'yyyy-MM-dd HH:mm:ss'),
        }
      })
    }
  }

  const onChangeTimeCreate = () => {
    dispatch({
      type:'log/updateState',
      payload:{
        startTime:'',
        endTime:'',
      }
    })
  }

  const onRefresh = () =>{
    resetFields()
    dispatch({
      type:'log/updateState',
      payload:{
        startTime:'',
        endTime:'',
        selectValues:{},
      }
    })
    dispatch({
      type:'log/query',
    })
  }

  return (<div style={{ marginBottom: '15px' }} >
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>{getFieldDecorator('userName', {})(<Input placeholder="请输入用户名称" />)}</FormItem>
      <FormItem>{getFieldDecorator('logType', {})(

        <Select placeholder="请输入日志类型" style={{width:'150px'}}>
        <Option value="1">登录</Option>
        <Option value="2">实时播放</Option>
        <Option value="3">视频控制</Option>
        <Option value="4" >历史回放</Option>
        <Option value="5">录像下载</Option>
        <Option value="6" >卡口布控</Option>
        <Option value="7">卡口查询</Option>
        <Option value="8">卡口下载</Option>
        <Option value="9">数据分析</Option>
        <Option value="10" >组织机构管理</Option>
        <Option value="11">用户管理</Option>
        <Option value="12" >相邻派出所配置</Option>
        <Option value="13">岗位管理</Option>
        <Option value="14">岗位授权</Option>
        <Option value="15">协警场景配置</Option>
        <Option value="16" >设备管理</Option>
        <Option value="17">构建下载</Option>
        <Option value="18" >案件管理</Option>
        <Option value="19">线索管理</Option>
        <Option value="20">高危人员查询</Option>
        <Option value="21">数据下载</Option>
        <Option value="22" >视频任务管理</Option>
        <Option value="23">其他</Option>
        </Select>
      )}</FormItem>
      <FormItem>{getFieldDecorator('ip', {})(<Input placeholder="请输入ip" />)}
      </FormItem>

      <FormItem

        label=""
      >
        {getFieldDecorator('createTime',{
        })(
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" onOk={onOk} style={{width:395,marginBottom:20 }} onChange={onChangeTimeCreate}/>

        )}
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button type="primary" onClick={onRefresh}>
          刷新
        </Button>
      </FormItem>
    </Form>
  </div>)
};

Filter.propTypes = {
};

export default Form.create()(Filter);
