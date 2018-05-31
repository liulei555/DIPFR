import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, TimePicker,Tree,TreeSelect, Button, Row, Col, DatePicker, Input, Cascader, Switch ,Icon,Select,Checkbox} from 'antd'
import {wrapAuth} from "../../utils/wrapAuth";
import style from './index.less'
const AuthButton = wrapAuth(Button);
const FormItem = Form.Item;
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
                  form:{
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
               ...props,
                }) => {
  const {treeData,onLoadData,onSearch,showMap}=props
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
  //提交代码
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
      };
      onSearch(values)
    });
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} layout={'inline'}>
        <Row className={style.videoAnalyticsSch}>
        <Col span={5}>
          <FormItem
          label="设备选择："
        >
          {getFieldDecorator('deviceType')(
            <TreeSelect
              key={'资源目录树'}
              value={'资源目录树'}
              style={{ width: 150 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto',minWidth:300 }}
              placeholder="资源目录树"
              loadData={onLoadData}
            >
              {renderTreeNodes(treeData)}
            </TreeSelect>
          )}
        </FormItem>
        </Col>
        <Col span={3}>
        <FormItem>
          <Button onClick={showMap}><Icon type="environment" />地图选点</Button>
        </FormItem>
        </Col>
       <Col span={5}>
        <FormItem
          label="设备厂家："
        >
          {getFieldDecorator('manufacturerName')(
            <Select style={{width:150}}>
              <Option value="大华">大华</Option>
              <Option value="海康">海康</Option>
            </Select>
          )}
        </FormItem>
       </Col>
       <Col span={5}>
        <FormItem
          label="设备ip"
        >
          {getFieldDecorator('ipAddress')(
            <Input />
          )}
        </FormItem>
       </Col>
      <Col span={5}>
        <FormItem
          label="分析类型："
        >
          {getFieldDecorator('anlysisType')(
            <Select style={{width:150}}>
              <Option value="大华">大华</Option>
              <Option value="海康">海康</Option>
            </Select>
          )}
        </FormItem>
      </Col>
        </Row>
        <Row style={{marginTop:20}}>
          <Col span={8}>
            <FormItem
              label="设备编码"
            >
              {getFieldDecorator('deviceNumber')(
                <Input style={{width:274}}/>
              )}
            </FormItem>
          </Col>
     <Col span={5}>
        <FormItem
          label="设备名称"
        >
          {getFieldDecorator('deviceName')(
           <Input />
          )}
        </FormItem>
     </Col>
     <Col span={6}>
        <FormItem
          label="分析状态"
        >
          {getFieldDecorator('analysisStatus')(
            <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox value="全部">全部</Checkbox>
                <Checkbox value="B">分析中</Checkbox>
                <Checkbox value="C">已停止</Checkbox>
            </Checkbox.Group>
          )}
        </FormItem>
     </Col>
      <Col span={4}>
        <FormItem>
          <Button  htmlType="submit" className='button-space'>查询</Button>
          <Button  className='button-space'>导出</Button>
        </FormItem>
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
