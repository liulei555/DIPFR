import {Input, Form, DatePicker, Button, Row} from 'antd';

const FormItem = Form.Item;


const Filter = ({form: {getFieldDecorator}, styles, dispatch}) => {
  const dateFormat = 'YYYY年MM月DD日 HH:mm:ss';
  return (<div className={styles.form}>
    <div className={styles.title}>任务监控管理</div>
    <Form layout="inline">
      <FormItem label="任务名称" labelCol={{span: 9}} wrapperCol={{span: 15}}>
        {getFieldDecorator('startTime', {})(<Input/>)}
      </FormItem>
      <FormItem label="开始时间" labelCol={{span: 9}} wrapperCol={{span: 15}}>
        {getFieldDecorator('startTime', {})(
          <DatePicker
            allowClear={false}
            showTime
            format={dateFormat}
            placeholder="开始时间"
          />)}
      </FormItem>
      <FormItem label="任务状态" labelCol={{span: 9}} wrapperCol={{span: 15}}>
        {getFieldDecorator('startTime', {})(<Input/>)}
      </FormItem>
      <FormItem label="结束时间" labelCol={{span: 9}} wrapperCol={{span: 15}}>
        {getFieldDecorator('endTime', {})(
          <DatePicker
            allowClear={false}
            showTime
            format={dateFormat}
            placeholder="结束时间"
          />)}
      </FormItem>
      <div className={styles.button}>
        <Button type="primary" htmlType="submit">
          查询任务
        </Button>
        <div className={styles.option}>
          <Button type="primary">删除任务</Button>
        </div>
        <Button type="primary" htmlType="submit" onClick={() => {
          dispatch({type: 'taskMonitor/save', payload: {visible: true}})
        }}>
          创建任务
        </Button>
      </div>
    </Form>
  </div>);
};


export default Form.create()(Filter);
