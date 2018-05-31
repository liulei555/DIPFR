/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Menu,Col,Row,Button,Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';
import {addRole} from "../../../services/roleBindDevice";
const List = ({ location,addRole,deleteRole,updateRole, app, ...roleListProps }) => {
  // location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    }
  ]

  const  confirm = (e) => {
    deleteRole()
  }
  const cancel = (e) => {
    console.log(e);
  }
  return (
    <div style={{}}>
      <div style={{marginBottom:20}}>
        <Row>
          <Col span={4}><Button type='primary' onClick={addRole}>新增</Button></Col>
          <Col span={4}><Popconfirm  title="确定删除所选记录吗？" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消"><Button type='danger'>删除</Button></Popconfirm></Col>
          <Col span={4}><Button type='primary' onClick={updateRole}>修改</Button></Col>
        </Row>
      </div>
      <Table
        {...roleListProps}
        bordered
        size="middle"
        columns={columns}
        rowKey={record => record.roleId}
      />
    </div>
  );
};

List.propTypes = {
  location: PropTypes.object,
};

export default List;
