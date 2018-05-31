import { Input, Form, DatePicker, Row, Tabs, Radio, Col, Button, Icon} from 'antd';
import AreaTree from '../History/AreaTree';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const TaskMonitor = ({ form: { getFieldDecorator } , treeProps}) => {
  const dateFormat = 'YYYY年MM月DD日';
  return (<Form layout="inline">
    <Row>
      <FormItem label="任务名称" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('trackName', {})(<Input />)}
      </FormItem>
    </Row>
    <Row>
      <FormItem label="创建人" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('trackName', {})(<Input />)}
      </FormItem>
    </Row>
    <Row>
      <FormItem label="任务标签" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('trackName', {})(<Input />)}
      </FormItem>
    </Row>
    <Row>
      <Col span={14}><FormItem label="创建时间" labelCol={{ span:5, offset:4}} wrapperCol={{ span: 15 }}>
        {getFieldDecorator('startTime', {})(<DatePicker showTime format={dateFormat} placeholder="开始时间"/>)}
      </FormItem></Col>
      <Col span={10}>
        <FormItem label="有效期" labelCol={{ span: 5, offset: 0}} wrapperCol={{ span: 10 }}>
          {getFieldDecorator('endTime', {})(<Input />)}
        </FormItem>
      </Col>
    </Row>
    <Row>
      <FormItem label="任务描述" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('trackName', {})(<TextArea />)}
      </FormItem>
    </Row>
    <Row>
      <FormItem label="任务点位" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('trackName', {})( <AreaTree {...treeProps} />)}
      </FormItem>
    </Row>
    <Row>
      <Col offset={5}>
        <Button>地图选点<Icon type="environment" /></Button>
      </Col>
    </Row>
  </Form>);
};

export default Form.create()(TaskMonitor);
