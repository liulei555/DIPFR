/**
 * 角色绑定设备关系
 */
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Card, Col, Row, Input,message} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {headhildMenu} from '../../../common/menu';
import List from './List';
import RoleList from './RoleList';
import Filter from './Filter';
import Modal from './Modal';
import style from './index.less';
import {putUtil} from "../../../utils/request/request";

let pageObj = {
  current: 1,
  pageSize: 10
};
const index = ({dispatch, roleBindDevice, loading}) => {
  const {dataSource, pagination, roleList, roleListPagination, childData, synctime, modalVisible, deviceId, roleIds,selectedRows,selectedRowsData,clikType,selectedRowKeysDevice,selectedRowKeysRole,filterValue} = roleBindDevice;
  console.log(filterValue);

  const pageHeaderProps = {
    // tabList: headhildMenu.systemOperation,
    menuList: headhildMenu.systemAdmin,
  }


  const deviceListProps = {
    dataSource,
    pagination,
    onChange(page) {
      //pageObj = page
      dispatch({
        type: 'roleBindDevice/queryDevice',
        payload: {
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
          ...filterValue
        }
      })
    },
    rowSelection: {
      selectedRowKeys:selectedRowKeysDevice,
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type: 'roleBindDevice/updateState',
          payload: {
            deviceId: selectedRowKeys.join(','),
            selectedRowKeysDevice:selectedRowKeys
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
        type: 'roleBindDevice/updateState',
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
      if(selectedRows&&selectedRows.length>0){
        dispatch({
          type: 'roleBindDevice/deleteRole',
          payload: {
            roleId: roleIds,
          }
        })
      }else{
        message.warning('请至少选择一条记录！')
      }

    },

    /**
     * 更新角色信息
     */
    updateRole() {
      if(selectedRows){
        if(selectedRows && selectedRows.length === 1){
          dispatch({
            type:'roleBindDevice/updateState',
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
        }else{
          message.warning('只能选择一条，请重新选择！')
        }
      }else{
        message.warning('请选择一条数据！')
      }

    },
    onChange(page) {//角色列表的分页
      dispatch({
        type: 'roleBindDevice/queryRoleList',
        payload: {
          pageNum: String(page.current),
          pageSize: String(page.pageSize)
        }
      })
    },
    rowSelection: {
      selectedRowKeys:selectedRowKeysRole,
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type: 'roleBindDevice/updateState',
          payload: {
            roleIds: selectedRowKeys.join(','),
            selectedRows:selectedRows,
            selectedRowKeysRole:selectedRowKeys,
          }
        })
      },
      getCheckboxProps: record => ({
        serialNumber: record.serialNumber,
      }),
    }
  };

  const filterProps = {
    dispatch,
    search(values) {
      console.log(values);
      dispatch({
        type: 'roleBindDevice/queryDevice',
        payload: {
          pageNum: String(pageObj.current),
          pageSize: String(pageObj.pageSize),
          ...values
        }
      })
    },
    syncCache(values) {
      console.log('同步缓存')
      let time = 60

      function setsynctime(time) {
        time--;
        dispatch({
          type: 'roleBindDevice/updateState',
          payload: {
            synctime: time
          }
        })
        if (time < 1) return
        setsynctime(time)
      }

      setsynctime(time)
    }
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
          type: 'roleBindDevice/addRole',
          payload: {
            roleName: data.name,
          }
        })
      }else if(clikType==='update'){
        dispatch({
          type: 'roleBindDevice/updateRole',
          payload: {
            roleName: data.name,
            roleId:selectedRowsData.roleId
          }
        })
      }
    },
  };

  const addNode = () => {
    console.log('add')
    dispatch({
      type: 'roleBindDevice/updateState',
      payload: {
        modalVisible: true
      }
    })
  }

  const bindingRole = () => {
    if(!roleIds){
      message.warning('请选择角色')
    }
    if(!deviceId){
      message.warning('请选择设备')
    }
    if(roleIds && deviceId){
      dispatch({
        type: 'roleBindDevice/bindingRole',
        payload: {
          roleIds: roleIds,
          deviceId: deviceId,
        }
      })
    }

  }

  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemAdmin-roleBindDevice">
      <Row>
        <Col span={10} style={{}}>
          <Card title="角色列表">
            <RoleList {...roleListProps} />
          </Card>
        </Col>
        <Col span={2} style={{paddingTop: 16}}>
          <div style={{paddingTop: 180, textAlign: 'center', marginBottom: 30}}>
            <Button type="primary" onClick={bindingRole}>绑定</Button>
          </div>
          {/*<div style={{textAlign: 'center'}}>
            <Button type="primary">取消</Button>
          </div>*/}
        </Col>
        <Col span={12}>
          <Card title="设备列表">
            <Filter {...filterProps} />
            <List {...deviceListProps} />
          </Card>
        </Col>
      </Row>
      <Modal {...modalProps}  />
    </PageHeaderLayout>
  );
};

export default connect(({dispatch, roleBindDevice, loading}) => ({
  dispatch,
  roleBindDevice,
  loading,
}))(index);
