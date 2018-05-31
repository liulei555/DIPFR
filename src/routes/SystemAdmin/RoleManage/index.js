/**
 * 行政设备关系
 */
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Card, Col, Row, Input,message} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Filter from './Filter';
import List from './List'
import RoleList from './RoleList'
import {headhildMenu} from "../../../common/menu";
import Modal from './Modal';

let pageObj = {
  current: 1,
  pageSize: 10
};

const Index = ({dispatch, roleManage, loading}) => {
  const { dataSource, pagination,roleList,roleListPagination,selectedRows,selectedRowsData,clikType,modalVisible,roleId,userIds,selectedRowKeys,resetFields,selectedRowKeysUser} = roleManage;
  console.log(selectedRowKeys)
  console.log(selectedRows)
  const pageHeaderProps  = {
    menuList: headhildMenu.systemAdmin,
  }
  const listProps = {
    dataSource,
    pagination,
    onChange (page) {
      pageObj = page
      dispatch({
        type:'roleManage/query',
        payload:{
          pageNum: String(page.current),
          pageSize: String(page.pageSize)
        }
      })
    },
    rowSelection:  {
      selectedRowKeys:selectedRowKeysUser,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys)
        dispatch({
          type:'roleManage/updateState',
          payload:{
            userIds:selectedRowKeys.join(','),
            selectedRowKeysUser:selectedRowKeys,
          }
        })
      },
      getCheckboxProps: record => ({
        serialNumber: record.serialNumber,
      }),
    }
  };

  const roleListProps = {
    dataSource: roleList,
    pagination: roleListPagination,
    /**
     * 新增角色
     */
    addRole() {
      dispatch({
        type: 'roleManage/updateState',
        payload: {
          modalVisible: true,
          selectedRowsData:'',
          clikType:'create'
        }
      })
    },

    /**
     * 删除角色
     */
    deleteRole() {
      if(selectedRows && selectedRows.length === 1){
        dispatch({
          type: 'roleManage/deleteRole',
          payload: {
            roleId: selectedRows[0].roleId,
          }
        })
      }else{
        message.warning("请至少选择一条数据！")
      }
    },

    /**
     * 更新角色信息
     */
    updateRole() {
      console.log(selectedRows)
      if(selectedRows&&selectedRows.length === 1){
        dispatch({
          type:'roleManage/updateState',
          payload:{
            modalVisible:true,
            selectedRowsData:selectedRows[0],
            clikType:'update'
          }
        })
        /*dispatch({
          type: 'roleBindDevice/updateRole',
          payload: {
            roleId: roleIds,
          }
        })*/
      }else if(selectedRows&&selectedRows.length > 0){
        message.warning('只能选择一条，请重新选择！')
      }else{
        message.warning("请选择一条！");
      }
    },

    onChange (page) {
      //pageObj = page
      dispatch({
        type:'roleManage/queryRoleList',
        payload:{
          pageNum: String(page.current),
          pageSize: String(page.pageSize)
        }
      })
    },
    rowSelection:  {
      selectedRowKeys:selectedRowKeys,
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        if(selectedRowKeys){
          dispatch({
            type: 'roleManage/updateState',
            payload: {
              roleId: selectedRowKeys.join(','),
              selectedRows:selectedRows,
              selectedRowKeys:selectedRowKeys,
            }
          })
        }
      },
      getCheckboxProps: record => ({
        serialNumber: record.serialNumber,
      }),
    },

    onRow(record){
      return{
        onClick:() =>{
          dispatch({
            type:'roleManage/updateState',
            payload:{
              selectedRowKeys:[record.roleId],
              roleId: record.roleId,
              selectedRows:[record],
            }
          })
        }
      }
    },
  };


  const modalProps = {
    visible: modalVisible,
    maskClosable: false,
    dispatch,
    title: '新增角色',
    selectedRowsData:selectedRowsData,
    wrapClassName: 'vertical-center-modal',

    onOk(data) {
      if(clikType==='create'){
        dispatch({
          type: 'roleManage/addRole',
          payload: {
            roleName: data.name,
          }
        })
      }else if(clikType==='update'){
        dispatch({
          type: 'roleManage/updateRole',
          payload: {
            roleName: data.name,
            roleId:selectedRowsData.roleId
          }
        })
      }
    },
  };

  /**
   * 给角色绑定用户
   */
  const bindingRole = () => {
    if(!roleId){
      message.warning('请选择角色')
    }
    if(!userIds){
      message.warning('请选择用户')
    }
    if(roleId && userIds){
      dispatch({
        type: 'roleManage/bindingRole',
        payload: {
          roleId: roleId,
          userIds: userIds,
        }
      })
    }
  }


  const filterProps = {
    dispatch,
    onOk(data){
      dispatch({
        type:'roleManage/query',
        payload:{
          data:data,
        }
      })
    }
  }

  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemAdmin-roleManage">
      <Card>
        <Row style={{backgroundColor: '#fff'}}>
          <Col span={6}>
            <RoleList {...roleListProps}/>
          </Col>
          <Col span={2}>
            <div style={{paddingTop: 180, textAlign: 'center', marginBottom: 30}}>
              <Button type="primary" onClick={bindingRole}>绑定</Button>
            </div>
            {/*<div style={{textAlign: 'center'}}>
              <Button type="primary">取消</Button>
            </div>*/}
          </Col>
          <Col offset={1} span={15}>
            <Filter {...filterProps}/>
            <List {...listProps}/>
          </Col>
        </Row>
      </Card>
      <Modal {...modalProps}  />
    </PageHeaderLayout>
  );
};

export default connect(({dispatch, roleManage, loading}) => ({
  dispatch,
  roleManage,
  loading,
}))(Index);
