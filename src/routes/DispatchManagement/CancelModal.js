import React from 'react';
import PropTypes from 'prop-types';
import { Form,Card,Modal,Select,DatePicker,Row,Col,Input,Radio,Button,Carousel,TreeSelect,Tree , Badge,Icon,Checkbox} from 'antd';
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

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
const CancelModal = ({faceBlackData,carBlackData,heimingdan,currentItem,onChangeSelect,blacklistData,onChangeRedio,clickType,onOk,onCancel,selectCarData,onLoadData,treeData,dispatch,selectValueRedio,onSelect,form:{
  getFieldDecorator,
  validateFields,
  getFieldsValue,
},
                          ...cancelModalProps}) => {
  console.log(selectValueRedio);
  const handleSubmit = (e) => {
    e.preventDefault();
   /* validateFields((err, values) => {
      onOk(values);
    })*/
    validateFields(errors => {
      if (errors) {
        return;
      }
      //清空提示信息
      const data = {
        ...getFieldsValue(),
      };
      onOk(data);
    });
  }

  const fnList = () => {
    if(blacklistData){
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
    }
  }
  const dateFormat = 'YYYY/MM/DD hh:mm:ss'
  const fn = () =>{
    if(heimingdan){
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
                    initialValue:'',
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
    }else if(heimingdan === false){
      return(
        <div>
          <Row>
            <Col>
              <FormItem
                {...formItemLayout1}
                label="号牌号码："
              >
                {getFieldDecorator('vehicleBrandNum',{
                  initialValue: '',
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
                {getFieldDecorator('vehicleBrandNum',{
                  initialValue: '',
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
                {getFieldDecorator('nameDesx',{
                  initialValue: '',
                })(
                  <Input disabled={true}/>
                )}
              </FormItem>
            </Col>
          </Row>
        </div>
      )
    }

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

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.nodeName}
            key={item.nodeId}
            value={item.nodeId}
            dataRef={item}
            icon={() => <Badge count={item.countTotal} offset={[-10,item.nodeName.length*16]}/>}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={item.nodeName}
        key={item.nodeId}
        value={item.nodeId}
        dataRef={item}
        icon={() => <Badge count={item.countTotal} offset={[-10,item.nodeName.length*16]}/>}
      />;
    });
  };

  /*const deleteDeviceArgs = (record) => {
    console.log(record);
  }*/
  const selectFunction = () =>{
    if(selectCarData){
      return selectCarData.map((item,key) =>{
        return(
          <div key={key} style={{marginTop:'20px'}}>
            <Row>
              <Col span={2}>
                <a onClick={() =>{
                  let panes = selectCarData.filter(pane => pane.nodeId !== item.nodeId);
                  dispatch({
                    type:'dispatchManagement/updateState',
                    payload:{
                      selectCarData:panes
                    }
                  })
                }}><Icon type="delete" /></a>
              </Col>
              <Col span={22}>
                {item.nodeName}
              </Col>
            </Row>
          </div>
        );
      })
    }
  }

  const onOkTime = (value) =>{
    console.log(value);
    if(value){
      let startTime = new Date(value[0]._d);
      let endTime = new Date(value[1]._d);
      console.log(startTime.format('yyyy-MM-dd hh:mm:ss'));
      //new Date(startTime.Format('yyyy-MM-dd'))

      console.log(endTime);
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          dispositionStartTime:startTime.format('yyyy-MM-dd hh:mm:ss'),
          dispositionEndTime:endTime.format('yyyy-MM-dd hh:mm:ss'),
        }
      })
    }
  }

  return (
    <Modal {...cancelModalProps } footer={null} width='80%' onCancel={onCancel}>
      <div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col span={8}>
              <Card>

                <FormItem
                  {...formItemLayout}
                  label="布控标题："
                >
                  {getFieldDecorator('dispositionTitle',{
                    initialValue: currentItem?currentItem.dispositionTitle:'',
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控时段"
                >
                  {getFieldDecorator('createTime',{
                  })(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"  style={{width:220}} onOk={onOkTime} disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控类型"
                >
                  {getFieldDecorator('dispositionType',{
                    initialValue: currentItem?currentItem.dispositionType:'',
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
                    initialValue:currentItem?currentItem.dispositionCategory:'',
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
                    initialValue:currentItem?currentItem.seriousLevel:'',
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
                    initialValue: currentItem?currentItem.dispositionPerson:'',
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="联系电话："
                >
                  {getFieldDecorator('dispositionConNumber',{
                    initialValue: currentItem?currentItem.dispositionConNumber:'',
                  })(
                    <Input disabled={true}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控单位："
                >
                  {getFieldDecorator('dispositionCompany',{
                    initialValue: currentItem?currentItem.dispositionCompany:'',
                  })(
                    <Select disabled={true}>
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
                  label="布控原因："
                >
                  {getFieldDecorator('dispositionReason',{
                    initialValue: currentItem?currentItem.dispositionReason:'',
                  })(
                    <Select disabled={true}>
                      <Option value="1">交警违法未处理</Option>
                      <Option value="2">交通肇事</Option>
                      <Option value="3">违法犯罪嫌疑</Option>
                      <Option value="4">套牌</Option>
                      <Option value="5">未年检</Option>
                      <Option value="6">报废车</Option>
                      <Option value="7">假牌</Option>
                      <Option value="8">其他</Option>
                    </Select>
                  )}
                </FormItem>
                撤控信息
                <hr></hr>
                <FormItem
                  {...formItemLayout}
                  label="撤控人："
                >
                  {getFieldDecorator('dispositionRemovePerson',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系电话："
                >
                  {getFieldDecorator('dispositionRemoveConNumber',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="撤控单位："
                >
                  {getFieldDecorator('dispositionCompany',{
                    initialValue: '',
                  })(
                    <Select placeholder="请选择">
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
                    initialValue: '',
                    rules: [{
                      required: true, message: '不能为空!',
                    }],
                  })(
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
                    <TreeSelect
                      disabled={true}
                      key={'资源目录树'}
                      value={'资源目录树'}
                      style={{ width: 150 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto',minWidth:300 }}
                      placeholder="资源目录树"
                      loadData={onLoadData}
                      onSelect={onSelect}
                    >
                      {renderTreeNodes(treeData)}
                    </TreeSelect>

                  </Col>
                  <Col span={8} offset={1}>
                    <Button type='primary' icon="environment">地图选点</Button>
                  </Col>
                </Row>
                <div>
                  {selectFunction()}
                </div>

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
                    {heimingdan?fn():fnList()}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Button type="primary" htmlType="submit" >保存</Button>
            <Button onClick={onCancel}>取消</Button>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
export default Form.create()(CancelModal);
