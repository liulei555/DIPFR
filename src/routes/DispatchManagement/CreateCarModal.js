import React from 'react';
import PropTypes from 'prop-types';
import { Form,Card,Modal,Select,DatePicker,Row,Col,Input,Radio,Button,Carousel,TreeSelect,Tree , Badge,Icon,Checkbox,Upload,message,notification} from 'antd';
import config from '../../utils/config';
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
const CreateCarModal = ({onSelectMap,handleChangePhoto,handleCancel,handlePreview,previewVisible, previewImage, fileList,onChangeSelect,blacklistData,onChangeRedio,clickType,onOk,onCancel,selectCarData,onLoadData,treeData,dispatch,heimingdan,selectValueRedio,onSelect,item,onDelete,form:{
  getFieldDecorator,
  validateFields,
  getFieldsValue,
  getFieldValue,
  },
  ...createCarModalProps}) => {

  console.log(selectValueRedio,item);
  const handleSubmit = (e) => {
    e.preventDefault();
   /* validateFields((err, values) => {
      console.log(values);
      onOk(values);
    })*/

    validateFields((err, values) => {
      if (err) {
        return;
      }
      onOk(values);
    });
  }
  const color = {'':'全部','1':'蓝色','2':'黑色','3':'白色','4':'绿色','5':'黄色'};
  const options = Object.keys(color).map((key)=>(
    <Option value={key} key={key}>{color[key]}</Option>
  ));
  const fnList = () => {
    if(blacklistData){
      return blacklistData.map((item1,key) =>{
        return(
          <div key={key} style={{marginTop:'20px'}}>
            <Row>
              <Col span={2}>

              </Col>
              <Col span={22}>
                <Checkbox.Group onChange={onChangeSelect} defaultValue={item.carBlackLibId}>
                  <Row>
                    <Col span={24}><Checkbox value={item1.id || item1.ID}>{item1.vehicleBlacklibName || item1.PERSON_BLACKLIB_NAME}</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              </Col>
            </Row>
          </div>
        );
      })
    }
  }


  const onOkBirthday = (value) =>{
    console.log(value);
    if(value){
      let time = new Date(value._d);
      console.log(time.format('yyyy-MM-dd hh:mm:ss'))
      dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          birthday:time.format('yyyy-MM-dd'),
        }
      })
    }
  }
  const fn = () =>{
    if(clickType==='createCar'){
      return(
        <div>
          <Row>
            <Col>
              <FormItem
                {...formItemLayout1}
                label="号牌号码："
              >
                {getFieldDecorator('platNo',{
                  initialValue: item.platNo,
                })(
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
                {getFieldDecorator('platColor',{
                  initialValue: item.platColor,
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择颜色"
                    //onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >{options}</Select>
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
                  initialValue: '',
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
        </div>
      )
    }else if(clickType === 'createFace'){
      return(
        <div>
          <Row>
            <Col>
              <FormItem
                {...formItemLayout1}
                label="姓名："
              >
                {getFieldDecorator('name',{
                  initialValue: item.name,
                })(
                  <Input />
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
                  initialValue: item.sex,
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择性别"
                    //onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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
                  initialValue: item.birthday,
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD"
                    placeholder="请选择时间"
                    onOk={onOkBirthday}
                  />
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
                  initialValue: item.idcard,
                })(
                  <Input/>
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
    return data?data.map(item => {
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
    }):[];
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
                  <a onClick={()=>onDelete(item)}><Icon type="delete" /></a>
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

  const getPostData = (file) => {
      if(clickType === 'createCar'){
        return {
          file,
          filename: encodeURIComponent(file.name),
          type: '1',
        };
      }else if(clickType === 'createFace'){
        return {
          file,
          filename: encodeURIComponent(file.name),
          type: '2',
        };
      }

  };

  const upLoadProps = {
    name: 'picture',
    accept: 'image/*',
    action: config.api.uploadOneFile,
    listType: 'picture',
    data: getPostData,
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCheckUpload = (rule, value, callback) => {
    let picture = getFieldValue('dispositionImageURL');
    if (picture && picture.length > 0) {
      picture.length > 1 && callback('只能上传一张图片！');
      picture[0].response && picture[0].response.status !== '1' && callback('上传失败，请重新上传！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const openNotificationWithIcon = (e) => {
    if(e.target.value.length === 50){
      notification['warning']({
        message: '最多只能输入50个字符,请重新输入!',
      });
    }
  };
  return (
    <Modal {...createCarModalProps } footer={null} width='80%' onCancel={onCancel}>
      <div>
        <Form onSubmit={handleSubmit}>
        <Row>
          <Col span={8}>
            <Card>

                <FormItem
                  {...formItemLayout}
                  label="布控描述："
                >
                  {getFieldDecorator('dispositionTitle',{
                    initialValue: '',
                    rules: [{
                      type: 'string',
                      max: 50,
                      //validator: checkNumber,
                      required: true, message: '必填项'
                    }],
                  })(
                    <Input onChange={openNotificationWithIcon}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控时段"
                >
                  {getFieldDecorator('createTime',{
                  })(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"  style={{width:220}} onOk={onOkTime}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控类型"
                >
                  {getFieldDecorator('dispositionType',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Select placeholder="请选择">
                      <Option value="1">嫌疑车辆</Option>
                      <Option value="2">在逃人员</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="布控种类"
                >
                  {getFieldDecorator('dispositionCategory',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Select placeholder="请选择">
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
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Select placeholder="请选择">
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
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系电话："
                >
                  {getFieldDecorator('dispositionConNumber',{
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
                  label="布控单位："
                >
                  {getFieldDecorator('dispositionCompany',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
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
                  label="布控原因："
                >
                  {getFieldDecorator('dispositionReason',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Select placeholder="请选择">
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
                <FormItem
                  {...formItemLayout}
                  label="布控备注："
                >
                  {getFieldDecorator('dispositionRemarks',{
                    initialValue: '',
                  })(
                    <Input />
                  )}
                </FormItem>
                报警信息
                <hr></hr>
                <FormItem
                  {...formItemLayout}
                  label="报警类型："
                >
                  {getFieldDecorator('alarmType',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Select placeholder="请选择">
                      <Option value="1">红色预警</Option>
                      <Option value="2">黄色预警</Option>
                      <Option value="3">蓝色预警</Option>
                      <Option value="4">全部</Option>

                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="报警备注："
                >
                  {getFieldDecorator('alarmRemarks',{
                    initialValue: '',
                  })(
                    <Input />
                  )}
                </FormItem>
                报警处理
                <hr></hr>
                <FormItem
                  {...formItemLayout}
                  label="联系人员："
                >
                  {getFieldDecorator('alarmAssociate',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系电话："
                >
                  {getFieldDecorator('contactNumber',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="联系单位："
                >
                  {getFieldDecorator('contactCompany',{
                    initialValue: '',
                    rules: [{
                      required: true, message: '必填项'
                    }],
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
                  label="操作建议："
                >
                  {getFieldDecorator('proposalOperation',{
                    initialValue: '',
                  })(
                    <Select placeholder="请选择">
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
                  <TreeSelect
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
                  <Button type='primary' icon="environment" onClick={onSelectMap}>地图选点</Button>
                </Col>
              </Row>
              <div>
                {selectCarData.length>0&&selectFunction()}
              </div>

            </Card>
          </Col>
          <Col span={8}>

            <Card>
              <Row>
                <Col>
                  {clickType === 'createCar'?<FormItem
                    {...formItemLayout1}
                    label="布控黑名单："
                  >
                    {getFieldDecorator('vehicleId',{
                      initialValue: item.vehicleId,
                    })(
                      <RadioGroup onChange={onChangeRedio}>
                      <Radio value = '1'>单个布控</Radio>
                      <Radio value = '2'>批量布控</Radio>
                      </RadioGroup>
                    )}

                  </FormItem>:<FormItem
                    {...formItemLayout1}
                    label="布控黑名单："
                  >
                    {getFieldDecorator('personId',{
                      initialValue: item.personId,
                    })(
                      <RadioGroup onChange={onChangeRedio}>
                      <Radio value = '1'>单个布控</Radio>
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
              <Row>
                <Col>
                  车辆图片：
                </Col>
              </Row>
              <Row>
                <Col>
                  {/*<Upload
                    action={config.api.uploadOneFile}
                    accept='image/*'
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChangePhoto}
                    data={getPostData}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>*/}
                  <FormItem label="照片"  {...formItemLayout}>
                    {getFieldDecorator('imageAddress', {
                      valuePropName: 'fileList',
                      getValueFromEvent: normFile,
                      /*rules: [
                        { required: true, message: '请上传照片!' },
                        { validator: handleCheckUpload },
                      ],*/
                    })(<Upload {...upLoadProps}>
                      <Button>
                        <Icon type="upload"/>上传
                      </Button>
                    </Upload>)}
                  </FormItem>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
          <Row style={{marginTop:10,marginLeft:'90%'}}>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" htmlType="submit" style={{marginLeft:10}}>保存</Button>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
export default Form.create()(CreateCarModal);
