import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Form, TimePicker, TreeSelect, Tree, Button, Row, Col, DatePicker, Input, Cascader, Switch, Icon, Select } from 'antd'
import { wrapAuth } from "../../utils/wrapAuth";
import style from './filter.less'
const AuthButton = wrapAuth(Button);
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option
const TreeNode = Tree.TreeNode;
const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const Filter = ({
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                    getFieldValue,
                  },
                  ...props,
                }) => {
  const { treeData, onLoadData, showMap, onSearch } = props;
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const renderTreeNodes = data => {
    return data ? data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.nodeName}
            key={item.nodeId}
            value={item.nodeId}
            dataRef={item}
            icon={() => <Badge count={item.countTotal} offset={[-10, item.nodeName.length * 16]} />}
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
        icon={() => <Badge count={item.countTotal} offset={[-10, item.nodeName.length * 16]} />}
      />;
    }) : [];
  };
  //提交代码
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const rangeTimeValue = fieldsValue['createTime'];
      const values = {
        ...fieldsValue,
        alarmTimeStart: fieldsValue.alarmTimeStart ? moment(fieldsValue.alarmTimeStart).format(dateFormat) : undefined,
        alarmTimeEnd: fieldsValue.alarmTimeEnd ? moment(fieldsValue.alarmTimeEnd).format(dateFormat) : undefined,
      };
      console.log('Received values of form: ', values);
      onSearch(values)
    });
  };

  const handleCheckStartTime = (rule, value, callback) => {
    let startTime = getFieldValue('alarmTimeStart');
    let endTime = getFieldValue('alarmTimeEnd');
    if (startTime && endTime) {
      startTime.diff(endTime) > 0 && callback('开始时间不能大于结束时间！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  const handleCheckEndTime = (rule, value, callback) => {
    let startTime = getFieldValue('alarmTimeStart');
    let endTime = getFieldValue('alarmTimeEnd');
    if (startTime && endTime) {
      startTime.diff(endTime) > 0 && callback('开始时间不能大于结束时间！');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback();
  };

  return (
    <div className={style.filterVehicle}>
      <Form onSubmit={handleSubmit} className="search-form">
        <Row gutter={36} type="flex" justify="start">
          <Col>
            <Row type="flex" justify="end">
              <FormItem
                label="时段"
              >
                {getFieldDecorator('alarmTimeStart', {
                  rules: [
                    { validator: handleCheckStartTime },
                  ],
                })(
                  <DatePicker showTime format={dateFormat} placeholder="开始时间" />,
                )}
              </FormItem>
              <h4 className={'text-date'}>至</h4>
              <FormItem
                label=""
              >
                {getFieldDecorator('alarmTimeEnd', {
                  rules: [
                    { validator: handleCheckEndTime },
                  ],
                })(
                  <DatePicker showTime format={dateFormat} placeholder="结束时间" />,
                )}
              </FormItem>
            </Row>
            <Row type="flex" justify="end">
              <FormItem
                label="报警设备"
              >
                {getFieldDecorator('deviceNumber', {})(
                  <>
                    <TreeSelect
                      key={'资源目录树'}
                      value={'资源目录树'}
                      className={'base-width'}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: 300 }}
                      placeholder="资源目录树"
                      loadData={onLoadData}
                    >
                      {renderTreeNodes(treeData)}
                    </TreeSelect>
                    <Button onClick={showMap} className={'base-width btn-margin'}><Icon type="environment" />地图选点</Button>
                  </>,
                )}
              </FormItem>
            </Row>
          </Col>
          <Col>
            <Row>
              <FormItem
                label="布控单位"
              >
                {getFieldDecorator('dispositionCompany')(
                  <Select className={'base-width'}>
                    <Option value="1">刑侦支队</Option>
                    <Option value="2">经侦支队</Option>
                    <Option value="3">交警支队</Option>
                    <Option value="4" >治安支队</Option>
                    <Option value="5">情报中心</Option>
                    <Option value="6" >其他</Option>
                  </Select>
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem
                label="报警处理"
              >
                {getFieldDecorator('AlarmProcessing')(
                  <Select className={'base-width'}>
                    <Option value="全部">全部</Option>
                    <Option value="已处理">已处理</Option>
                    <Option value="未处理">未处理</Option>
                  </Select>
                )}
              </FormItem>
            </Row>
          </Col>
          <Col>
            <Row type={'flex'} justify={'end'}>
              <FormItem
                label="布控人"
              >
                {getFieldDecorator('dispositionPerson')(
                  <Input />,
                )}
              </FormItem>
            </Row>
            <Row type={'flex'} justify={'end'}>
              <FormItem
                label="布控人描述"
              >
                {getFieldDecorator('dispositionTitle')(
                  <Input />,
                )}
              </FormItem>
            </Row>
          </Col>
          <Col className={'align-end'}>
            <Row>
              <FormItem>
                <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
              </FormItem>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

Filter.propTypes = {
  //onAdd: PropTypes.func,
}

export default Form.create()(Filter)
