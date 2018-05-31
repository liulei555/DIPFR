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
const DetailModal = ({faceBlackData,carBlackData,onChangeRedio,dispatch,heimingdan,currentItem,form:{
  getFieldDecorator,
  validateFields,
  getFieldsValue,
},
  ...detailModalProps}) => {

  console.log(faceBlackData)
  console.log(carBlackData)

  const formatData = (value) =>{
    let time='1525984348000'
    let d = new Date(time * 1000);    //根据时间戳生成的时间对象
    let date = (d.getFullYear()) + "-" +
      (d.getMonth() + 1) + "-" +
      (d.getDate()) + " " +
      (d.getHours()) + ":" +
      (d.getMinutes()) + ":" +
      (d.getSeconds());
    console.log(date);
  }

  let createTime = []
  if(currentItem){
    console.log(currentItem.dispositionStartTime)
    formatData();
    console.log(formatData(currentItem.dispositionStartTime));
    let endTime = formatData(currentItem.dispositionEndTime);
    //console.log(startTime);
    //createTime.push(startTime)
    createTime.push(endTime)
  }

  console.log(createTime);
  const handleSubmit = (e) => {
    validateFields((err, values) => {
      onOk(values);
    })
  }

  const dateFormat = 'YYYY/MM/DD hh:mm:ss'
const fn = () =>{
    if(currentItem&&currentItem.dispositionMark === '1'){
      return(
        <div>
          <Row>
            <Col>
              <FormItem
                {...formItemLayout1}
                label="号牌号码："
              >
                {getFieldDecorator('platNo',{
                  initialValue: carBlackData?carBlackData.vehicleBrandNum:'',
                })(
                  <Input disabled={true}/>
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
                {getFieldDecorator('platColor',{
                  initialValue: carBlackData?carBlackData.vehiclePlateColor:'',
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择颜色"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={true}
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
                {getFieldDecorator('platRemark',{
                  initialValue: carBlackData?carBlackData.vehicleBrand:'',
                })(
                  <Input disabled={true}/>
                )}
              </FormItem>
            </Col>
          </Row>
        </div>
      )
    }else if(currentItem&&currentItem.dispositionMark === '2'){
      return(
        <div>
          <Row>
            <Col>
              <FormItem
                {...formItemLayout1}
                label="姓名："
              >
                {getFieldDecorator('name',{
                  initialValue: faceBlackData?faceBlackData.personName:'',
                })(
                  <Input  disabled={true}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem
                {...formItemLayout1}
                label="性别："
              >
                {getFieldDecorator('sex',{
                  initialValue: faceBlackData?faceBlackData.personSex:'',
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择性别"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={true}
                  >
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem
                {...formItemLayout1}
                label="出生日期："
              >
                {getFieldDecorator('birthday',{
                  initialValue: '',
                })(
                  <DatePicker  style={{width: 198}}   format={dateFormat} disabled={true}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem
                {...formItemLayout1}
                label="证件号码："
              >
                {getFieldDecorator('idcard',{
                  initialValue: faceBlackData?faceBlackData.personCertificateNum:'',
                })(
                  <Input  disabled={true}/>
                )}
              </FormItem>
            </Col>
          </Row>
        </div>
      )
    }

}

  const fnList = () => {
   /* if(blacklistData){
      return blacklistData.map((item,key) =>{
        return(
          <div key={key} style={{marginTop:'20px'}}>
            <Row>
              <Col span={2}>

              </Col>
              <Col span={22}>
                <Checkbox.Group onChange={onChangeSelect}>
                  <Row>
                    <Col span={24}><Checkbox value={item.id}>{item.vehicleBlacklibName}</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              </Col>
            </Row>
          </div>
        );
      })
    }*/
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


  const cancelDispatch = () => {
   if(currentItem.state === '2'  ){
     return(
       <div>
         撤控信息
         <hr></hr>
         <FormItem
           {...formItemLayout}
           label="撤控人："
         >
           {getFieldDecorator('dispositionRemovePerson',{
             initialValue: currentItem.dispositionRemovePerson?currentItem.dispositionRemovePerson:'',
           })(
             <Input disabled={true}/>
           )}
         </FormItem>
         <FormItem
           {...formItemLayout}
           label="联系电话："
         >
           {getFieldDecorator('dispositionRemoveConNumber',{
             initialValue: currentItem.dispositionRemoveConNumber?currentItem.dispositionRemoveConNumber:'',
           })(
             <Input disabled={true}/>
           )}
         </FormItem>
         <FormItem
           {...formItemLayout}
           label="撤控单位："
         >
           {getFieldDecorator('dispositionCompany',{
             initialValue: currentItem.dispositionCompany?currentItem.dispositionCompany:'',
           })(
             <Select placeholder="请选择" disabled={true}>
               <Option value="1">刑侦支队</Option>
               <Option value="2">经侦支队</Option>
               <Option value="3">交警支队</Option>
               <Option value="4" >治安支队</Option>
               <Option value="5">情报中心</Option>
               <Option value="6" >其他</Option>
             </Select>
           )}
         </FormItem>

         <FormItem
           {...formItemLayout}
           label="撤控原因："
         >
           {getFieldDecorator('dispositionRemoveReason',{
             initialValue: currentItem.dispositionRemoveReason?currentItem.dispositionRemoveReason:'',
             rules: [{
               required: true, message: '必填项',
             }],
           })(
             <Input disabled={true}/>
           )}
         </FormItem>
       </div>
     )
   }
  }

  const onCancel = () => {
    dispatch({
      type:'dispatchManagement/updateState',
      payload:{
        detailVisible: false
      }
    })
  }
  return (
    <Modal {...detailModalProps} width='80%' footer={null}>
      <div>
        <Form>
        <Row>
          <Col span={8}>
            <Card>

                <FormItem
                  {...formItemLayout}
                  label="布控描述："
                >
                  {getFieldDecorator('dispositionTitle',{
                    initialValue: currentItem.dispositionTitle,
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控时段"
                >
                  {getFieldDecorator('createTime',{
                    initialValue: '',
                  })(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"  style={{width:220}} disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控类型"
                >
                  {getFieldDecorator('dispositionType',{
                    initialValue: currentItem.dispositionType,
                  })(
                    <Select disabled={true}>
                      <Option value="1">嫌疑车辆</Option>
                      <Option value="2">在逃人员</Option>
                      <Option value="3">全部</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控种类"
                >
                  {getFieldDecorator('dispositionCategory',{
                    initialValue: currentItem.dispositionCategory,
                  })(
                    <Select disabled={true}>
                      <Option value="1">个人布控</Option>
                      <Option value="2">公共布控</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="严重级别："
                >
                  {getFieldDecorator('seriousLevel',{
                    initialValue: currentItem.seriousLevel,
                  })(
                    <Select disabled={true}>
                      <Option value="1">一般</Option>
                      <Option value="2">严重</Option>
                      <Option value="3">紧急</Option>
                      <Option value="4">致命</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控人："
                >
                  {getFieldDecorator('dispositionPerson',{
                    initialValue: currentItem.dispositionPerson,
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控单位："
                >
                  {getFieldDecorator('dispositionCompany',{
                    initialValue: currentItem.dispositionCompany,
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控原因："
                >
                  {getFieldDecorator('dispositionReason',{
                    initialValue: currentItem.dispositionReason,
                  })(
                    <Select disabled={true}>
                      <Option value="1">交警违法未处理</Option>
                      <Option value="2">交通肇事</Option>
                      <Option value="3">违法犯罪嫌疑</Option>
                      <Option value="4">套牌</Option>
                      <Option value="5">未年检</Option>
                      <Option value="6">报废车</Option>
                      <Option value="7">假牌</Option>
                      <Option value="7">其他</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控备注："
                >
                  {getFieldDecorator('dispositionRemarks',{
                    initialValue: currentItem.dispositionRemarks,
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                报警信息
                <hr></hr>
                <FormItem
                  {...formItemLayout}
                  label="报警类型："
                >
                  {getFieldDecorator('alarmType',{
                    initialValue: currentItem.alarmType,
                  })(
                    <Select disabled={true}>
                      <Option value="1">没有值</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="报警备注："
                >
                  {getFieldDecorator('alarmRemarks',{
                    initialValue: currentItem.alarmRemarks,
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
                    initialValue: currentItem.alarmAssociate,
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系电话："
                >
                  {getFieldDecorator('contactNumber',{
                    initialValue: currentItem.contactNumber,
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系单位："
                >
                  {getFieldDecorator('contactCompany',{
                    initialValue: currentItem.contactCompany,
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="操作建议："
                >
                  {getFieldDecorator('proposalOperation',{
                    initialValue: currentItem.alarmAssociate,
                  })(
                    <Select disabled={true}>
                      <Option value="1">执行预案</Option>
                      <Option value="2">通知民警拦截</Option>
                      <Option value="3">放过不处理</Option>
                      <Option value="4">其他</Option>

                    </Select>
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
                  <Select
                    showSearch
                    style={{ width: 130 }}
                    placeholder="资源目录树"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={true}
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>

                </Col>
                <Col span={8} offset={1}>
                  <Button type='primary' icon="environment">地图选点</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Row>
                <Col>
                  {currentItem&&currentItem.dispositionMark === '1'?<FormItem
                    {...formItemLayout1}

                    label="布控黑名单："
                  >
                    {getFieldDecorator('vehicleId',{
                      initialValue: currentItem?currentItem.vehicleId:''
                    })(
                      <RadioGroup disabled={true}  onChange={onChangeRedio}>
                        <Radio defaultValue = '1'>单个布控</Radio>
                        <Radio value = '2'>批量布控</Radio>
                      </RadioGroup>
                    )}

                  </FormItem>:<FormItem
                    {...formItemLayout1}
                    label="布控黑名单："
                  >
                    {getFieldDecorator('personId',{
                      initialValue: currentItem?currentItem.personId:'',
                    })(
                      <RadioGroup disabled={true}  onChange={onChangeRedio}>
                        <Radio defaultValue = '1'>单个布控</Radio>
                        <Radio value = '2'>批量布控</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>}
                </Col>
              </Row>
              <Row>
                <Col>
                  {console.log(heimingdan)}
                  {heimingdan?fn():fnList()}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        </Form>
        <Button type='primary' onClick={onCancel} style={{marginTop:10,marginLeft:'93%'}}>关闭</Button>
      </div>
    </Modal>
  );
};
export default Form.create()(DetailModal);
