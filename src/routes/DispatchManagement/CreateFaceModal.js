import React from 'react';
import PropTypes from 'prop-types';
import { Form,Card,Modal,Select,DatePicker,Row,Col,Input,Radio,Button,Carousel} from 'antd';
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option
const { TextArea } = Input;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 18},
  },
};

const formItemLayout1 = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};
const CreateFaceModal = ({dispatch,heimingdan,form:{
  getFieldDecorator,
  validateFields,
  getFieldsValue,
},
  ...createFaceModalProps}) => {

  const handleSubmit = (e) => {
    validateFields((err, values) => {
      onOk(values);
    })
  }

const fn = () =>{
    return(
      <div>
        <Row>
          <Col>
            <FormItem
              {...formItemLayout1}
              label="号牌号码："
            >
              {getFieldDecorator('namew')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem
              {...formItemLayout1}
              label="号牌颜色："
            >
              {getFieldDecorator('nameColor')(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择颜色"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <Option value="4">红色</Option>
                  <Option value="5">黑色</Option>
                  <Option value="6">蓝色</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem
              {...formItemLayout1}
              label="车辆描述："
            >
              {getFieldDecorator('nameDesx')(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    )
}
  const handleChange = (value) => {
    if(value === '2'){
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          heimingdan:true,
        }
      })
    }else{
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          heimingdan:false,
        }
      })
    }
    console.log(`selected ${value}`);
  }

  const handleBlur = () => {
    console.log('blur');
  }

  const handleFocus = () => {
    console.log('focus');
  }
  return (
    <Modal {...createFaceModalProps} width='80%'>
      <div>
        <Form>
        <Row>
          <Col span={8}>
            <Card>

                <FormItem
                  {...formItemLayout}
                  label="布控描述："
                >
                  {getFieldDecorator('name')(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控时段"
                >
                  {getFieldDecorator('range-time-picker')(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"  style={{width:220}} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控类型"
                >
                  {getFieldDecorator('DispatchingUnit')(
                    <Select>
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
                    <Select >
                      <Option value="jack">Jack</Option>
                      <Option value="disabled" disabled>Disabled</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="严重级别："
                >
                  {getFieldDecorator('DispatchingUnit')(
                    <Select>
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
                <FormItem
                  {...formItemLayout}
                  label="布控备注："
                >
                  {getFieldDecorator('nameDesc')(
                    <Input />
                  )}
                </FormItem>
                报警信息
                <hr></hr>
                <FormItem
                  {...formItemLayout}
                  label="报警类型："
                >
                  {getFieldDecorator('DispatchingUnit')(
                    <Select>
                      <Option value="jack">Jack</Option>
                      <Option value="disabled" disabled>Disabled</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="报警备注："
                >
                  {getFieldDecorator('w')(
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

            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Row>
                <Col span={4}>
                  <span style={{fontSize:12}}>布控范围</span>
                </Col>
                <Col span={11}>
                  {/*<FormItem
                    {...formItemLayout}
                    label=""
                  >
                    {getFieldDecorator('nameDesc')(
                      <Select
                        showSearch
                        style={{ width: 130 }}
                        placeholder="资源目录树"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    )}
                  </FormItem>*/}
                  <Select
                    showSearch
                    style={{ width: 130 }}
                    placeholder="资源目录树"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>

                </Col>
                <Col span={8} offset={1}>
                  <Button type='primary' icon="download">地图选点</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Row>
                <Col>
                  <FormItem
                    {...formItemLayout1}
                    label="布控黑名单："
                  >
                    {getFieldDecorator('nameHei')(
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="类型"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        <Option value="1">XX黑名单库</Option>
                        <Option value="2">XXX单个布控</Option>
                        <Option value="3">Tom</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  {heimingdan&&fn()}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        </Form>
      </div>
    </Modal>
  );
};
export default Form.create()(CreateFaceModal);
