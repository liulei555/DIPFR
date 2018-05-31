import React, {Component} from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import {connect} from 'dva';
import {Input, Form, Tree, Card, Button, Table, Row, Col,Message} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import MyTree from './MyTree';
import UserTable from './UserTable';
import CommonModal from '../../../components/CommonModal/index'
import { headhildMenu } from '../../../common/menu';
import style from './less/index.less';
import form from '../../../models/form';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const FormItem = Form.Item;
const onSearchChange = e => {
};

let table = [
  {id: 0, name: 'UN'},
  {id: 1, pid: 0, name: 'china'},
  {id: 2, pid: 1, name: 'guangdong'},
  {id: 3, pid: 2, name: 'shenzhen'},
  {id: 4, pid: 2, name: 'guangzhou'},
  {id: 5, pid: 0, name: 'USA'},
  {id: 6, pid: 5, name: 'AK'},
];

const Index = ({
                 form: {
                   getFieldDecorator,
                   getFieldsValue,
                   setFieldsValue,
                   validateFields,
                   resetFields,
                   validateFieldsAndScroll,
                 },
                 areaEquipment,
                 dispatch,
               }) => {
  const {dataSource,selectedRows,selectedRowKeys,modalProps} = areaEquipment;
  const pageHeaderProps  = {
    menuList: headhildMenu.systemOperation,
  }
  const treeProps = {
    title: '行政区域设备树',
    treeData: [],
    onSelect: (selectedKeys, info) => {
     // console.log('onSelect', info);
    }
  }
  const cancelModal=()=>{
    dispatch({
      type:'areaEquipment/callModal',
      payload:{
        modalProps:{
          visible:false,
        },
      }
    })
  };
  // add role
  const addModal = () => {
    let modalProps = {
      visible:true,
      title: '添加角色',
      formItemData:[{
        title:'roleName',
        label:'角色名称',
      }],
      onCancel: () => {
        cancelModal();
        resetFields();
      },
      onSubmit:(data)=>{
        dispatch({
          type:'areaEquipment/addRole',
          payload:data,
        })
      },
    };
    weakUpModal('callModal',modalProps);
  }
  const userProps = {
    columns: [
      {
        title: '角色ID',
        dataIndex: 'roleId',
        key: 'roleId',
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      },
    ],
    userData: dataSource,
    title: '角色列表',
    addRole:addModal,
    rowSelection:{
      selectedRowKeys,
      type:'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys, selectedRows,'radio')
        dispatch({
          type:'areaEquipment/selectRow',
          payload:{selectedRows:selectedRows[0],selectedRowKeys:selectedRowKeys}
        })
      }
    },
    deleteRole:()=>{
      if(!selectedRows.roleId){
        Message.info('请选择一个待删除的选项')
      }else{
        dispatch({
          type:'areaEquipment/deleteRole',
          payload:{
            roleId:selectedRows.roleId
          }
        })
      }
    },
    editRole:()=>{
      if(!selectedRows.roleId){
        Message.info('请选择一个待编辑的选项')
      }else{
        editModal()
      }
    }
  };
  const editModal=()=>{
    // console.log(selectedRows,'selectedRows')
    let modalProps = {
      visible: true,
      onCancel: () => {
        cancelModal();
        resetFields();
      },
      title: '编辑角色',
      onSubmit:(data)=>{
        dispatch({
          type:'areaEquipment/editRole',
          payload:{
            ...data
          }
        })
      },
      formItemData:[{
        title:'roleId',
        label:'角色ID',
        val:`${selectedRows.roleId}`,
        readOnly:true,
      },{
        title:'roleName',
        label:'角色名称',
        val:`${selectedRows.roleName}`,
      }]
    };
    weakUpModal('callModal',modalProps);
  };
  // call modal
  const weakUpModal=(type,props)=>{
    dispatch({
      type:`areaEquipment/${type}`,
      payload:{
        modalProps:props
      }
    })
  }
  return (
    <PageHeaderLayout {...pageHeaderProps}>
      <Row>
        <Col span={6}>
          <MyTree {...treeProps} />
        </Col>
        <Col span={2} style={{paddingTop: 16}}>
          <div style={{paddingTop: 180, textAlign: 'center', marginBottom: 30}}>
            <Button type="primary">绑定</Button>
          </div>
          <div style={{textAlign: 'center'}}>
            <Button type="primary">取消</Button>
          </div>
        </Col>
        <Col span={16}>
          <UserTable {...userProps} />
        </Col>
      </Row>
      <CommonModal {...modalProps} />
    </PageHeaderLayout>
  );
};

export default connect(({dispatch, areaEquipment, loading}) => ({
  dispatch,
  areaEquipment,
  loading,
}))(Form.create()(Index));
