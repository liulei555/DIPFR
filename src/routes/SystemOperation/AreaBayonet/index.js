/**
 * 行政设备关系
 */
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Card, Col, Row, Input,Popconfirm,message} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {headhildMenu} from '../../../common/menu';
import List from './List';
import AreaDeviceTree from './AreaTree';
import Filter from './Filter';
import Modal from './Modal';
import style from './index.less';

let pageObj = {
  current: 1,
  pageSize: 10
};
const index = ({dispatch, bayonetDevice, loading}) => {
  const {dataSource, pagination, treeData, childData, synctime, modalVisible, nodeData, selectedRowKeys, selectedRowKeysbind, selectedRows,deviceIds,expandedKeys,upOk,areaId,filterValue} = bayonetDevice;

  const pageHeaderProps = {
    // tabList: headhildMenu.systemOperation,
    menuList: headhildMenu.systemOperation,
  }

  const listProps = {
    dataSource,
    pagination,
    selectedRowKeys,
    onChange(page) {
      //pageObj = page
      dispatch({
        type: 'bayonetDevice/query',
        payload: {
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
          ...filterValue,
        }
      })

    },
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRows);
        dispatch({
          type: 'bayonetDevice/updateState',
          payload: {
            selectedRowKeysbind: selectedRows,
            /*selectedRowKeys:selectedRowKeys,
            selectedRows:selectedRows*/
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
      dispatch({
        type: 'bayonetDevice/query',
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
          type: 'bayonetDevice/updateState',
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

  const treeProps = {
    treeData,
    dispatch,
    nodeData,
    deviceIds,
    expandedKeys,
    selectedKeys: [],
    defaultExpandParent: true,
   /* onSelect(node, e) {
      console.log(e.node.props.dataRef)
      if (e.selected) {//点击树节点，保存节点的信息到state里面
        dispatch({
          type: 'bayonetDevice/updateState',
          payload: {
            nodeData: e.node.props.dataRef,
            selectedRowKeys: ''
          }
        })
      }
    },*/
    onRightClick(e, node) {
      console.log(e)
      console.log(node)
    },
    onLoadData(treeNode) {
      console.log(treeNode)
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'bayonetDevice/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          },
        });
      }).then((res) => {
        console.log(res)
        if (res) {
          treeNode.props.dataRef.children = res
          console.log(treeData)
          dispatch({
            type: 'bayonetDevice/updateState',
            payload: {
              treeData: [...treeData],
            },
          })
        }
      });
    },
  };

  const modalProps = {
    visible: modalVisible || false,
    maskClosable: false,
    dispatch,
    title: '新增节点',
    wrapClassName: 'vertical-center-modal',
    onOk(data){//创建节点
      if(nodeData.length>1){
        message.warning("请选择一条记录作为父节点增加！")
      }
      if(nodeData.length < 1){
        dispatch({
          type:'bayonetDevice/create',
          payload:{
            parentId:'root',
            areaName:data.name,
          }
        })
      }
      if(nodeData.length === 1 && nodeData[0].nodeId!== 'root'){
        dispatch({
          type:'bayonetDevice/create',
          payload:{
            parentId:nodeData[0].nodeId,
            areaName:data.name,
          }
        })
      }
    },
  };

  const addNode = () => {
    if(nodeData.length > 1){
      message.warning('只能选择一条记录作为父节点');
    }else{
      dispatch({
        type:'bayonetDevice/updateState',
        payload:{
          modalVisible: true
        }
      });
    }
  }

  /**
   * 删除节点
   */
  const deleteNode = (e) =>{
    dispatch({
      type:'bayonetDevice/deleteNode',
      payload:{
        areaIds:e
      }
    })
  }

  /**
   * 刷新方法
   */
  const refreshDevice = () => {
    dispatch({
      type: 'bayonetDevice/queryTree',
      payload: {
        areaId: 'root',
        userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
      },
    });
  }

  /**
   * 绑定卡口
   */
  const bindingBayonet = () => {
    const arr = []
    if(!selectedRowKeysbind || selectedRowKeysbind.length === 0){
      message.warning('请选择设备')
    }
    if(nodeData.length > 0){
      if(nodeData.length > 1){
        message.warning('请选择一条区域记录！')
      }
      if(nodeData.length === 1 && selectedRowKeysbind.length > 0){
        selectedRowKeysbind.map(item => {
          arr.push(item.serialNumber);
        })
        dispatch({
          type: 'bayonetDevice/bindingBayonet',
          payload: {
            areaId: nodeData[0].nodeId,
            deviceIds: arr.join(',')
          }
        })
      }
    }else{
      message.warning('请选择区域')
    }
  }

  /**
   * 解绑卡口
   */
  const unbindingBayonet = () =>{
    let unBindData = []
    if(deviceIds.length < 1){
      message.warning('请选择设备')
    }
    if(deviceIds.length < 1 && nodeData.length > 0){
      message.warning('选择的区域，请选择设备！')
    }
    if(deviceIds.length> 0 ){
      deviceIds.map((item)=>{
        let ret1 = unBindData.find((value, index, arr) => {
          return value.nodeId ===  item.nodeId
        })
        if(!ret1){
          unBindData.push(item.nodeId)
        }
      })
      dispatch({
        type:'bayonetDevice/unbindingBayonet',
        payload:{
          areaId:deviceIds[0].areaId,
          deviceIds:unBindData.join(','),
        }
      })
    }
  }

  const  confirm = (e) => {
    let deleteArr = []
    let deleteObject
    if(nodeData && nodeData.length > 0){
      for(let i = 0;i<nodeData.length;i++){
        console.log(nodeData[i])
        if(!nodeData[i].children){
          if(nodeData[i].nodeType === 'area'){
            deleteObject = {
              areaId:nodeData[i].nodeId
            }
            deleteArr.push(deleteObject)
          }else if(nodeData[i].nodeType === 'device'){
            message.warning('你选择的是设备，不能删除，请选择区域')
          }
        }else{
          message.warning('所选的区域下面有子项，请先删除子项')
        }
      }
      if(deleteArr.length>0){
        deleteNode(deleteArr)
      }
    }else{
      message.warning('请选择一条记录！')
    }
  }
  const cancel = (e) => {
    console.log(e);
  }
  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemOperation-areaBayonet">
      <Row>
        <Col span={6} style={{}}>
          <Card title="行政区域卡口设备">
            <div style={{marginBottom: 15}}>
              <Button type="primary" onClick={refreshDevice}>刷新</Button>
              <Popconfirm  title="确定删除所选记录吗？" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消">
              <Button type="danger">删除</Button>
              </Popconfirm>
              <Button type="primary" onClick={addNode}>创建节点</Button>
            </div>
            {/*<Input.Search
              placeholder="搜索行政区域"
              onSearch={value => console.log(value)}
              style={{width: '100%'}}
            />*/}
            <AreaDeviceTree {...treeProps} />
          </Card>
        </Col>
        <Col span={1} style={{paddingTop: 180, paddingLeft: 15}}>
          <div style={{textAlign: 'center', marginBottom: 30}}>
            <Button type="primary" icon="double-left" onClick={bindingBayonet}/>
          </div>
          <div style={{textAlign: 'center'}}>
            <Button type="primary" icon="double-right" onClick={unbindingBayonet}/>
          </div>
        </Col>
        <Col span={17}>
          <Card title="设备列表">
            <Filter {...filterProps} />
            <List {...listProps} />
          </Card>
        </Col>
      </Row>
      <Modal {...modalProps}/>
    </PageHeaderLayout>
  );
};

export default connect(({dispatch, bayonetDevice, loading}) => ({
  dispatch,
  bayonetDevice,
  loading,
}))(index);
