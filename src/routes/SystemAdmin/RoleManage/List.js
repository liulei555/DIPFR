/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Menu,Spin } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';
const List = ({ loading,location, app, ...tableProps }) => {
  // location.query = queryString.parse(location.search)
  console.log({...tableProps});

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '编码',
      dataIndex: 'userCode',
      key: 'userCode'
    }, {
      title: '性别',
      dataIndex: 'gendar',
      key: 'gendar',
      render: text => <span>{text === "1" ? '男' : (text === '2' ? '女' : '')}</span>
    }, {
      title: '证件号码',
      dataIndex: 'identityNumber',
      key: 'identityNumber'
    },{
      title: '登录名',
      dataIndex: 'userName',
      key: 'userName'
    }, {
      title: '所属组织',
      dataIndex: 'fullOrgName',
      key: 'fullOrgName'
    }, {
      title: '账户状态',
      dataIndex: 'loginStatus',
      key: 'loginStatus',
      render: text =>
        <span>{text === "1" ? '正常' : '禁用'}</span>
    }
  ];
  return (
    <div style={{}}>
      <Table
        {...tableProps}
        bordered
        size="middle"
        scroll={{ x: 700 }}
        columns={columns}
        rowKey={record => record.userId}
      />
    </div>
  );
};

List.propTypes = {
  location: PropTypes.object,
};

export default List;
