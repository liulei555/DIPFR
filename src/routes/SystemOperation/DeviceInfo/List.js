/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Table, Button, notification, Form, Row, Col, DatePicker, Input, Select,message} from 'antd';
import {Link} from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';
import moment from 'moment';


const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};
const List = ({onEdit,disabledState,nodeName, app, verificationTime, deviceLocal,affiliationLocal,installationTime,dispatch,onOk,form: {
    getFieldDecorator,
    validateFields,
    resetFields,
  }, ...tableProps,
              }) => {
  // location.query = queryString.parse(location.search)

    const onEditList = () => {
      console.log(resetFields)
      dispatch({
      type:'deviceInfo/updateState',
      payload:{
        resetFields:resetFields(),
      }
    })
      onEdit()
    }

  //展开的子行
  const expandedRowRender = record => {
      console.log(record)
    const onInstallationChange = (date, dateString) => {
      console.log(date)
      if(date){
        var d = new Date(date._d);
        console.log(d)
        dispatch({
          type:'deviceInfo/updateState',
          payload:{
            installationTime: d,
          }
        })
      }else{
        dispatch({
          type:'deviceInfo/updateState',
          payload:{
            verificationTime: '',
          }
        })
      }
    }

    const onVerificationChange = (date, dateString) => {
      if(date){
        var d = new Date(date._d);
        console.log(d)
        dispatch({
          type:'deviceInfo/updateState',
          payload:{
            installationTime: d,
          }
        })
      }else{
        dispatch({
          type:'deviceInfo/updateState',
          payload:{
            verificationTime: '',
          }
        })
      }
    }


    const handleSubmit = (e) => {
      let reg= /^[^\s]*$/;
      e.preventDefault();
      validateFields((err, values) => {
        debugger
        if(reg.test(values.deviceName)){
          onOk(values);
        }else{
          message.warning('不能为空，请重新输入！')
        }
      })
      resetFields()
    }

    const openNotificationWithIcon = (e) => {
      if(e.target.value.length === 20){
        notification['warning']({
          message: '最多只能输入20个字符,请重新输入!',
        });
      }
    };

    const dateFormat = 'YYYY/MM/DD hh:mm:ss'
    return (
      <div>
        <Form
          className="ant-advanced-search-form"
          onSubmit={handleSubmit}
        >
          <Row>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="设备名称">
                {getFieldDecorator('deviceName',{
                  initialValue: record.deviceName,
                  rules: [{
                    required: true, message: '必填项'
                  }],
                  }
                )(
                  <Input disabled={disabledState} maxLength="20" onChange={openNotificationWithIcon}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="设备编号">
                {getFieldDecorator('deviceNumber',{
                    initialValue: record.deviceNumber,
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="设备位置">
                {getFieldDecorator('reservedField1',{
                    initialValue: record.reservedField1?record.reservedField1:'',
                  }
                )(//onClick={deviceLocal}
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="所属单位">
                {getFieldDecorator('reservedField2',{
                    initialValue: nodeName,
                  }
                )(
                  <Input onClick={affiliationLocal} readOnly={true} disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="设备型号">
                {getFieldDecorator('deviceModle',{
                    initialValue: record.deviceModle?record.deviceModle:'',
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="设备子型">
                {getFieldDecorator('subDeviceType',{
                    initialValue: record.subDeviceType,
                  }
                )(
                  <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="请选择型号"
                    disabled={disabledState}
                  >
                    <Option value='1'>1</Option>
                    <Option value='2'>2</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="厂商名称">
                {getFieldDecorator('manufacturerName',{
                    initialValue: record.manufacturerName,
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="联系方式">
                {getFieldDecorator('contactWay',{
                    initialValue: record.contactWay,
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="网络地址">
                {getFieldDecorator('ipAddress',{
                    initialValue: record.ipAddress,
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="通讯服务">
                {getFieldDecorator('deviceCommMode',{
                    initialValue: record.deviceCommMode,
                  }
                )(
                  <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="请选择"
                    disabled={disabledState}
                  >
                    <Option value='0'>0</Option>
                    <Option value='1'>1</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="软件版本">
                {getFieldDecorator('softwareVersion',{
                    initialValue: record.softwareVersion,
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="地方代码">
                {getFieldDecorator('localDeviceCode',{
                    initialValue: record.localDeviceCode,
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}//<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                label="安装日期">
                {getFieldDecorator('installDate',{
                  initialValue:moment(record.installDate, dateFormat)
                  }
                )(
                  <DatePicker onChange={onInstallationChange} style={{width: 198}}   format={dateFormat} disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="检定日期">
                {getFieldDecorator('checkDate',{
                    initialValue: moment(record.installDate, dateFormat),
                  }
                )(
                  <DatePicker onChange={onVerificationChange} style={{width: 198}}  format={dateFormat} disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="保养周期">
                {getFieldDecorator('maintenancePeriod',{
                    initialValue: record.maintenancePeriod,
                  }
                )(
                  <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="请选择"
                    disabled={disabledState}
                  >
                    <Option value={record.maintenancePeriod}>3</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="保修期限">
                {getFieldDecorator('maintenanceExpireDate',{
                    initialValue: record.maintenanceExpireDate,
                  }
                )(
                  <Select
                    showSearch
                    style={{width: 182}}
                    placeholder="请选择"
                    disabled={disabledState}
                  >
                    <Option value={record.maintenanceExpireDate}>6</Option>
                  </Select>
                )}年
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="经度坐标">
                {getFieldDecorator('longitude',{
                    initialValue: record.longitude,
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="维度坐标">
                {getFieldDecorator('latitude',{
                    initialValue: record.latitude,
                  }
                )(
                  <Input disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <FormItem
                {...formItemLayout}
                label="设备描述">
                {getFieldDecorator('deviceDesc',{
                    initialValue: record.deviceDesc,
                  }
                )(
                  <Input disabled={disabledState} maxLength="50" onChange={openNotificationWithIcon}/>
                )}
              </FormItem>
            </Col>

            <Col span={3}>
              <FormItem
                label="">
                {getFieldDecorator('serialNumber',{
                    initialValue: record.serialNumber,
                  }
                )(
                  <Input style={{width:100,display:'none'}} disabled={disabledState}/>
                )}
              </FormItem>
            </Col>
            <Col span={3} >
              <Button type='primary'  htmlType="submit">保存</Button>
              <Button type="primary" onClick={onEditList}>编辑</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }

  const columns = [
    {
      title: '设备ID',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '设备状态',
      dataIndex: 'deviceLifeStatus',
      key: 'deviceLifeStatus',
      render:text => <span>{text === '0' ? '未知':(text === '1' ? '正常':(text === '2' ? '故障' : (text === '3' ? '脱机' : '')))}</span>

    },
    {
      title: '内部位置代码',
      dataIndex: 'innerLocationCode',
      key: 'innerLocationCode',
      width: 120
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType',
      width: 100,
      render:text => <span>{text === '4' ? '卡口':(text === '5' ? '摄像头' : (text === '14' ? '硬盘录像机' : (text === '15' ? '视频矩阵' : (text === '3' ? '3G电警' : ''))))}</span>
    },
    {
      title: '内部设备编号',
      dataIndex: 'deviceNumber',
      key: 'deviceNumber',
      width: 120
    },
  ];
  return (
    <div style={{}}>
      <Table
        {...tableProps}
        expandedRowRender={expandedRowRender}
        bordered
        size="middle"
        scroll={{x: 700}}
        columns={columns}
        rowKey={record => record.serialNumber}
        expandRowByClick={true}
      />
    </div>
  );
};

List.propTypes = {
  location: PropTypes.object,
};

/*export default List;*/
export default Form.create()(List)
