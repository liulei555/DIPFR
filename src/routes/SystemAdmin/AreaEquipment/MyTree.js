import React, {Component} from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import {connect} from 'dva';
import {Input, Form, Tree, Card, Button, Table, Row, Col} from 'antd';
import AreaTree from '../../SheBei/XingZhengSheBei/AreaTree';
import {groupBy} from '../../../utils/utils'

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const FormItem = Form.Item;
const MyTree = ({
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                  title,
                  treeData
                }) => {
  let newTree=treeData.map(ele=>{
    let data={
      ...ele,
      key:ele.id,
      title:ele.name,
    }
    return data
  })
  const treeProps={
    treeData:groupBy(newTree,'pid'),
    selectedKeys:[],
    defaultExpandParent:true,
    onSelect:(selectedKeys, info) => {
     // console.log('onSelect', info);
    },
  }
  return (
    <Card title={title}>
      <div style={{marginBottom: 10}}>
        <Button type="primary">刷新</Button>
        <Button type="primary">删除</Button>
        <Button type="primary">创建节点</Button>
      </div>
      <Form>
        <FormItem>
          {getFieldDecorator('equipment ', {
            rules: [{required: true, message: '请输入设备名!'}],
          })(<Input placeholder="equipment"/>)}
        </FormItem>
      </Form>
      <AreaTree {...treeProps} />
    </Card>
  );
};

export default Form.create()(MyTree);
