/**
 * 设备绑定组织
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
import AreaDeviceTree from './AreaTree';

let pageObj = {
  current: 1,
  pageSize: 10
};

const Index = ({dispatch, orgConfiguration, geographicInfo,loading}) => {
  const { dataSource, pagination,roleList,roleListPagination,selectedRows,selectedRowsData,clikType,modalVisible,roleId,userIds,treeData,nodeData,selectedRowKeysUser,confirmLoading } = orgConfiguration;

  const pageHeaderProps  = {
    menuList: headhildMenu.systemAdmin,
  }
  const listProps = {
    dataSource,
    pagination,
    onChange (page) {
      //pageObj = page
      dispatch({
        type:'orgConfiguration/query',
        payload:{
          pageNum: String(page.current),
          pageSize: String(page.pageSize)
        }
      })

    },
    rowSelection:  {
      selectedRowKeys:selectedRowKeysUser,
      onChange: (selectedRowKeys, selectedRows) => {
        // debugger;
        var arr = []
        console.log(selectedRows)
        selectedRows.map((item) =>{
          var user = {};
          console.log(item);
          user.userId = item.userId
          user.userName = item.name
          user.userLogin = item.userName
          arr.push(user)
        })
        /*for(let i=0;i<selectedRows.length;i++){
         // let user={userId:selectedRows[i].userId,name:selectedRows[i].userName}
          arr.push({userId:selectedRows[i].userId,name:selectedRows[i].userName})
        }*/
        console.log(arr);
        dispatch({
          type:'orgConfiguration/updateState',
          payload:{
            userIds:arr,
            selectedRowKeysUser:selectedRowKeys
          }
        })
      },
      getCheckboxProps: record => ({
        serialNumber: record.serialNumber,
      }),
    }
  };

  /**
   * 给设备绑定用户
   */
  const bindingUser = () => {
    if(!nodeData){
      message.warning('请选择区域！')
    }
    if(!userIds || userIds.length === 0){
      message.warning("请选择用户")
    }
    if(nodeData && userIds && userIds.length > 0){
      if(!nodeData.subCode){
        message.warning('你选择的已是区域下面的用户，请选择区域！')
      }else if(nodeData.subCode){
        if(confirmLoading === false){
          console.log(confirmLoading)
          dispatch({
            type:'orgConfiguration/updateState',
            payload:{
              confirmLoading:true,
            }
          })
          dispatch({
            type: 'orgConfiguration/bindingUser',
            payload: {
              areaId: nodeData.nodeId,
              users: userIds,
            }
          })

        }
      }
    }
  }

  const treeProps = {
    treeData,
    //checkable: true,
    dispatch,
    selectedKeys:[],

    onSelect(node,e){
      console.log(e.node.props.dataRef)
      if (e.selected) {//点击树节点，保存节点的信息到state里面
        dispatch({
          type: 'orgConfiguration/updateState',
          payload: {
            nodeData: e.node.props.dataRef,
            selectedRowKeys: ''
          }
        })
      }
    },
    onRightClick(e,node){
      console.log(e)
      console.log(node)
    },
    onLoadData(treeNode){
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'orgConfiguration/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          },
        });
      }).then((res) => {
        console.log(res)
        if(res){
          treeNode.props.dataRef.children = res
          dispatch({
            type:'orgConfiguration/updateState',
            payload:{
              treeData: [...treeData],
            },
          })
        }
      });
    },
  };

  const filterProps = {

    onRefresh(){
     treeProps.onLoadData();
      dispatch({
        type:'orgConfiguration/query'
      })
    },

    onOk(data){
      console.log(data);
      dispatch({
        type:'orgConfiguration/query',
        payload:{
          data:data,
        }
      })
    }
  }

  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemAdmin-orgConfiguration">
      <Card>
        <Row style={{backgroundColor: '#fff'}}>

          <Col span={6}>
            <Card title="行政区域">
              <AreaDeviceTree {...treeProps} />
            </Card>
          </Col>
          <Col span={2}>
            <div style={{paddingTop: 180, textAlign: 'center', marginBottom: 30}}>
              <Button type="primary" onClick={bindingUser}>绑定</Button>
            </div>
            {/*<div style={{textAlign: 'center'}}>
              <Button type="primary">取消</Button>
            </div>*/}
          </Col>
          <Col offset={1} span={14}>
            <Filter {...filterProps}/>
            <List {...listProps}/>
          </Col>
        </Row>
      </Card>
    </PageHeaderLayout>
  );
};

export default connect(({dispatch, orgConfiguration,geographicInfo, loading}) => ({
  dispatch,
  orgConfiguration,
  geographicInfo,
  loading,
}))(Index);
