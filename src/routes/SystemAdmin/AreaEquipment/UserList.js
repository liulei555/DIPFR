import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input, Form, Tree, Card, Button, Table, Row, Col } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import MyTree from './MyTree';
import UserTable from './UserTable';
import style from './less/index.less';
import { groupBy } from '../../../utils/groupBy';
import form from '../../../models/form';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const FormItem = Form.Item;
const onSearchChange = e => {
};

let table = [
  { id: 1, pid: 0, name: 'china' },
  { id: 2, pid: 1, name: 'guangdong' },
  { id: 3, pid: 2, name: 'shenzhen' },
  { id: 4, pid: 2, name: 'guangzhou' },
  { id: 5, pid: 0, name: 'USA' },
  { id: 6, pid: 5, name: 'AK' },
];
const userProps = {
  columns: [
    {
      title: '用户ID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '用户地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '用户类型',
      key: 'type',
    },
    {
      title: '用户编号',
      key: 'action',
    },
  ],
  userData: [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  title:'用户列表'
};
const AreaEquipmentTree = ({
                             form: {
                               getFieldDecorator,
                               getFieldsValue,
                               setFieldsValue,
                               validateFields,
                               resetFields,
                               validateFieldsAndScroll,
                             },
                           }) => {
  return (
    <PageHeaderLayout>
      <Row>
        <Col span={6}>
          <MyTree />
        </Col>
        <Col span={2} style={{paddingTop:16}}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Button type="primary">刷新</Button>
          </div>
        </Col>
        <Col span={16}>
          <UserTable {...userProps} />
        </Col>
      </Row>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, areaEquipmentTree, app }) => ({
  dispatch,
  areaEquipmentTree,
  app,
}))(Form.create()(AreaEquipmentTree));
