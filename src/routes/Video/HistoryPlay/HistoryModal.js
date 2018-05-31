import { Input, Form, DatePicker, Row, Tabs, Radio, Col, Icon} from 'antd';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const HistoryModal = ({form: { getFieldDecorator } }) => {
  const dateFormat = 'YYYY年MM月DD日';
  return (<Form layout="inline">

    <Tabs size='larger' defaultActiveKey="1">
      <TabPane tab={<span>添加至线索库</span>} key="1">
        <Row>
          <FormItem label="任务名称" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {getFieldDecorator('trackName', {})(
              <RadioGroup>
                <Radio value={1}>人</Radio>
                <Radio value={2}>车</Radio>
                <Radio value={3}>物</Radio>
                <Radio value={4}>场景</Radio>
                <Radio value={4}>其他</Radio>
              </RadioGroup>)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="按键编号" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('trackName', {})(<Input />)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="任务名称" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('trackName', {})(<Input />)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="保存期限" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('trackName', {})(<Input />)}
          </FormItem>
        </Row>
        <Row>
          <Col span={12}><FormItem label="开始时间" labelCol={{ span: 5, offset: 4 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('startTime', {})(<DatePicker showTime format={dateFormat} placeholder="开始时间"/>)}
          </FormItem></Col>
          <Col span={12}>
            <FormItem label="结束时间" labelCol={{ span: 5 ,offset: 1 }} wrapperCol={{ span: 15 }}>
              {getFieldDecorator('endTime', {})(<DatePicker showTime format={dateFormat} placeholder="结束时间"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="视频描述" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('trackName', {})(<TextArea />)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="素材归属" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {getFieldDecorator('trackName', {})(
              <RadioGroup>
                <Radio value={1}>涉案视频</Radio>
                <Radio value={2}>线索视频</Radio>
              </RadioGroup>)}
          </FormItem>
        </Row>
      </TabPane>
      <TabPane tab={<span>添加至视频缓存库</span>} key="2">
        <Row>
          <FormItem label="任务名称" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {getFieldDecorator('trackName', {})(
              <RadioGroup>
                <Radio value={1}>人</Radio>
                <Radio value={2}>车</Radio>
                <Radio value={3}>物</Radio>
                <Radio value={4}>场景</Radio>
                <Radio value={4}>其他</Radio>
              </RadioGroup>)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="按键编号" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('trackName', {})(<Input />)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="任务名称" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('trackName', {})(<Input />)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="保存期限" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('trackName', {})(<Input />)}
          </FormItem>
        </Row>
        <Row>
          <Col span={12}><FormItem label="开始时间" labelCol={{ span: 5, offset: 4 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('startTime', {})(<DatePicker showTime format={dateFormat} placeholder="开始时间" />)}
          </FormItem></Col>
          <Col span={12}>
            <FormItem label="结束时间" labelCol={{ span: 5 ,offset: 1 }} wrapperCol={{ span: 15 }}>
              {getFieldDecorator('endTime', {})(<DatePicker showTime format={dateFormat} placeholder="结束时间" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="视频描述" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
            {getFieldDecorator('trackName', {})(<TextArea />)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="素材归属" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
            {getFieldDecorator('trackName', {})(
              <RadioGroup>
                <Radio value={1}><Icon type="save" />涉案视频</Radio>
                <Radio value={2}><Icon type="save" />线索视频</Radio>
              </RadioGroup>)}
          </FormItem>
        </Row>
      </TabPane>
    </Tabs>

  </Form>);
};

export default Form.create()(HistoryModal);
