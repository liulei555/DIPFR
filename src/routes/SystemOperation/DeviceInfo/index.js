/**
 * 系统运维-- 一机一档 ---设备信息管理
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, Col, Row, Input } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';
import ModalLocal from './ModalLocal'
import style from './index.less';

let pageObj = {
  current: 1,
  pageSize: 10
};
const index = ({ dispatch, deviceInfo, loading }) => {
  const { dataSource, pagination, treeData, childData ,synctime, modalVisible,installationTime,verificationTime,affiliationVisible,curPowers,nodeName,disabledState,filterValue} = deviceInfo;
console.log(treeData)
  const pageHeaderProps  = {
    // tabList: headhildMenu.systemOperation,
    menuList: headhildMenu.systemOperation,
  }

  const listProps = {
    installationTime:installationTime,
    verificationTime:verificationTime,
    dispatch,
    disabledState,
    nodeName,
    dataSource,
    pagination,
    onEdit(){
      dispatch({
        type:'deviceInfo/updateState',
        payload:{
          disabledState:false,
        }
      })
    },
    onChange (page) {
      //pageObj = page
      dispatch({
        type:'deviceInfo/query',
        payload:{
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
            ...filterValue
        },
      })
    },

    affiliationLocal(){
      dispatch({
        type:'deviceInfo/queryTree',
        payload: {
          areaId: 'root',
          userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
        },
      })
      dispatch({
        type:'deviceInfo/updateState',
        payload:{
          affiliationVisible:true,
        }
      })
    },

    deviceLocal(){
      dispatch({
        type:'deviceInfo/updateState',
        payload:{
          modalVisible:true,
        }
      })
    },

    onOk(data){
      data.checkDate = verificationTime;
      data.installDate = installationTime;
      console.log(data);
      dispatch({
        type:'deviceInfo/update',
        payload:{
          data:data
        }
      })
    }
  };

  const filterProps = {
    curPowers,
    dispatch,
    search(values) {
      dispatch({
        type:'deviceInfo/query',
        payload:{
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
          type:'deviceInfo/updateState',
          payload:{
            synctime: time
          }
        })
        if(time < 1) return
        setsynctime(time)
      }
      setsynctime(time)
    }
  };

  const treeProps = {
    treeData,
    selectedKeys:[],
    defaultExpandParent:true,

    onSelect(node,e){
      if(e.selected){
        console.log(e)
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
          type: 'deviceInfo/queryTree',
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
          console.log(treeData)
          dispatch({
            type:'deviceInfo/updateState',
            payload:{
              treeData: [...treeData],
            },
          })
        }
      });
    },
  };

  const modalProps = {
    visible: affiliationVisible,
    maskClosable: false,
    treeData:treeData,
    nodeName,
    title: '所选单位选取',
    wrapClassName: 'vertical-center-modal',
    onSelectTree(node,e){
      console.log(e.node.props.dataRef);
      dispatch({
        type:'deviceInfo/updateState',
        payload:{
          nodeName:e.node.props.dataRef.nodeName,
        }
      })
      modalProps.onCancel()
    },
    onOk(data){
      modalProps.onCancel()
    },
    onCancel () {
      dispatch({
        type:'deviceInfo/updateState',
        payload:{
          affiliationVisible: false
        }
      })
    },
  };

  const modalLocalProps = {
    visible: modalVisible,
    maskClosable: false,
    title: '所选单位选取',
    wrapClassName: 'vertical-center-modal',

    onOk(data){
      modalLocalProps.onCancel()
    },
    onCancel () {
      dispatch({
        type:'deviceInfo/updateState',
        payload:{
          modalVisible: false
        }
      })
    },
  };

  const addNode = () => {
    console.log('add')
    dispatch({
      type:'deviceInfo/updateState',
      payload:{
        modalVisible: true
      }
    })
  }

  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemOperation-deviceInfo">
      <Row>
        <Col span={24}>
          <Card>
            <Filter {...filterProps}/>
            <List {...listProps}/>
            { treeData&&<Modal {...modalProps}/>}
            <ModalLocal {...modalLocalProps}/>
          </Card>
        </Col>
      </Row>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, deviceInfo, loading }) => ({
  dispatch,
  deviceInfo,
  loading,
}))(index);
