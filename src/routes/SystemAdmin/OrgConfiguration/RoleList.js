/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Menu,Row,Col,Button } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';
const List = ({ location,addRole,deleteRole,updateRole, app, ...roleListProps }) => {
  // location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    }
  ]

  return (
    <div >
      <Row style={{marginBottom:20}}>
        <Col span={4}><Button type='primary' onClick={addRole}>新增</Button></Col>
        <Col span={4} offset={2}><Button type='primary' onClick={deleteRole}>删除</Button></Col>
        <Col span={4} offset={2}><Button type='primary' onClick={updateRole}>修改</Button></Col>
      </Row>
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
