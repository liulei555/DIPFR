/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as queryString from 'query-string';
import styles from './index.less';
const List = ({ location, app, ...tableProps }) => {
  // location.query = queryString.parse(location.search)
  const columns = [
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      width:100
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 130,
    },
    {
      title: 'MAC地址',
      dataIndex: 'mac',
      key: 'mac',
      width: 130,
    },
    {
      title: '操作时间',
      dataIndex: 'operationTime',
      key: 'operationTime',
      width: 130,
    },{
      title: '操作模块',
      dataIndex: 'operationModule',
      key: 'operationModule',
      width: 90,
      render:text => <span>{text == '1' ? '通用':(text == '2' ? 'Gis' : (text == '3' ? '视频' : (text == '4' ? '卡口' : (text == '5' ? '设备' : (text == '6' ? '权限' : (text == '7' ? '案件' : (text == '8' ? '图侦' : (text == '9' ? '视频任务' : (text == '10' ? '布控告警' : '')))))))))}</span>
    },{
      title: '日志类型',
      dataIndex: 'logType',
      key: 'logType',
      width: 90,
      render:text => <span>{text == '1' ? '登录':(text == '2' ? '实时播放' : (text == '3' ? '视频控制' : (text == '4' ? '历史回放' : (text == '5' ? '录像下载' : (text == '6' ? '卡口布控' : (text == '7' ? '卡口查询' : (text == '8' ? '卡口下载' : (text == '9' ? '数据分析' : (text == '10' ? '组织机构管理' : (text == '11' ? '用户管理' : (text == '12' ? '相邻派出所配置' : (text == '13' ? '岗位管理' : (text == '14' ? '岗位授权' : (text == '15' ? '协警场景配置' : (text == '16' ? '设备管理' : (text == '17' ? '构建下载' : (text == '18' ? '案件管理' : (text == '19' ? '线索管理' : (text == '20' ? '高危人员查询' : (text == '21' ? '数据下载 ' : (text == '22' ? '视频任务管理' : (text == '99' ? '其他' : ''))))))))))))))))))))))}</span>
    }
    ,{
      title: '日志描述',
      dataIndex: 'logDescription',
      key: 'logDescription',
    },
  ];
  return (
    <div style={{}}>
      <Table
        {...tableProps}
        bordered
        size="middle"
        scroll={{ x: 1366 }}
        columns={columns}
        rowKey={record => record.xh}
      />
    </div>
  );
};

List.propTypes = {
  location: PropTypes.object,
};

export default List;
