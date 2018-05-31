/**
 * 行政设备关系
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, Col, Row, Input,Popconfirm,message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import {session} from '../../../utils/saveStorage/sessionStorage'
import List from './List';
import AreaDeviceTree from './AreaTree';
import Filter from './Filter';
import Modal from './Modal';
import style from './index.less';

let pageObj = {
  current: 1,
  pageSize: 10
};
const index = ({ dispatch, areaDevice, loading }) => {
  const { dataSource, pagination, treeData, childData ,synctime, modalVisible,nodeData,selectedRowKeys,selectedRowKeysbind,areaId,deviceIds,expandedKeys,searchValue,autoExpandParent,filterValue} = areaDevice;

  const pageHeaderProps  = {
    // tabList: headhildMenu.systemOperation,
    menuList: headhildMenu.systemOperation,
  }

  const listProps = {
    dataSource,
    pagination,
    selectedRowKeys,
    onChange (page) {
      //pageObj = page
      dispatch({
        type:'areaDevice/query',
        payload:{
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
          ...filterValue
        }
      })

    },
    rowSelection:  {
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type:'areaDevice/updateState',
          payload:{
            selectedRowKeysbind:selectedRows,
            selectedRowKeys:selectedRowKeys,
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
        type:'areaDevice/query',
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
          type:'areaDevice/updateState',
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
    nodeData,
    deviceIds,
    checkable: true,
    dispatch,
    autoExpandParent,
    expandedKeys,
    selectedKeys:[],



   /* onSelect(node,e){
      debugger
      if (e.selected) {//点击树节点，保存节点的信息到state里面
        dispatch({
          type: 'areaDevice/updateState',
          payload: {
            nodeData: e.node.props.dataRef,
            expandedKeys: e.node.props.dataRef.nodeId,

          }
        })
      }else{
        dispatch({
          type: 'areaDevice/updateState',
          payload: {
            nodeData: '',
            selectedRowKeys: ''
          }
        })
      }
    },*/
    onRightClick(e,node){
      console.log(e)
      console.log(node)
    },
    onLoadData(treeNode){
      /*dispatch({
        type:'areaDevice/updateState',

      })*/
      console.log(treeNode);
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'areaDevice/queryTree',
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
            type:'areaDevice/updateState',
            payload:{
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
    title: '新增节点',
    dispatch,
    wrapClassName: 'vertical-center-modal',
    onOk(data){//创建节点
      if(nodeData.length>1){
        message.warning("请选择一条记录作为父节点增加！")
      }
      if(nodeData.length < 1){
        dispatch({
          type:'areaDevice/create',
          payload:{
            parentId:'root',
            areaName:data.name,
          }
        })
      }
     if(nodeData.length === 1 && nodeData[0].nodeId!== 'root'){
       dispatch({
         type:'areaDevice/create',
         payload:{
           parentId:nodeData[0].nodeId,
           areaName:data.name,
         }
       })
     }/*else{
       dispatch({
         type:'areaDevice/create',
         payload:{
           parentId:'root',
           areaName:data.name,
         }
       })
     }*/
    },
    onCancel () {
      dispatch({
        type:'areaDevice/updateState',
        payload:{
          modalVisible: false
        }
      })
    },
  };

  const addNode = () => {
    if(nodeData.length > 1){
      message.warning('只能选择一条记录作为父节点');
    }else{
      dispatch({
        type:'areaDevice/updateState',
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
        type:'areaDevice/deleteNode',
        payload:{
          areaIds:e
        }
      })
  }

  /**
   * 刷新方法
   */
  const refreshDevice = () =>{
    dispatch({
      type: 'areaDevice/queryTree',
      payload: {
        areaId: 'root',
        userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
      },
    });
  }

  //绑定设备
  const bindingVideo = () => {
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
         type: 'areaDevice/bindingVideo',
         payload: {
           areaId: nodeData[0].nodeId,
           deviceIds: arr.join(',')
         }
       })
     }
    }else{
      message.warning('请选择区域！')
    }
    /*const arr = []
    if(!selectedRowKeysbind || selectedRowKeysbind.length === 0){
        message.warning('请选择设备')
    }

    if(!nodeData || nodeData === ''){
      message.warning('请选择区域')
    }
    if (selectedRowKeysbind.length > 0 && nodeData.nodeId) {
      selectedRowKeysbind.map(item => {
        arr.push(item.serialNumber);
      })
      dispatch({
        type: 'areaDevice/bindingVideo',
        payload: {
          areaId: nodeData.nodeId,
          deviceIds: arr.join(',')
        }
      })
    }*/
  }

  const unbindingVidnet = () =>{
    console.log(nodeData)
    console.log(deviceIds);
    let unBindData = []
    debugger
    if(deviceIds.length < 1){
      message.warning('请选择设备')
    }
    if(nodeData.length > 0){
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
      console.log(unBindData)
      dispatch({
        type:'areaDevice/unbindingVidnet',
        payload:{
          areaId:deviceIds[0].areaId,
          deviceIds:unBindData.join(','),
        }
      })
    }
    /*if(!deviceIds || deviceIds === ''){
      message.warning('请选择设备')
    }else{
      dispatch({
        type:'areaDevice/unbindingVidnet',
        payload:{
          areaId:areaId,
          deviceIds:deviceIds,
        }
      })
    }*/
  }
  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.nodeId === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };
 const onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = treeData.map((item) => {
      console.log(item);
      if (item.nodeId.indexOf(value) > -1) {
        return getParentKey(item.nodeId, treeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    dispatch({
      type:'areaDevice/updateState',
      payload:{
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
      }
    })
    // this.setState({
    //   expandedKeys,
    //   searchValue: value,
    //   autoExpandParent: true,
    // });
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
    <PageHeaderLayout {...pageHeaderProps} className="systemOperation-areaDevice">
      <Row>
        <Col span={6} style={{}}>
          <Card title="行政区域设备管理">
            <div style={{marginBottom: 15}}>
              <Button type="primary" onClick={refreshDevice}>刷新</Button>
              <Popconfirm  title="确定删除所选记录吗？" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消">
                <Button type="danger" >删除</Button></Popconfirm>
              <Button type="primary" onClick={addNode}>创建节点</Button>
            </div>
            {/*<Input.Search
              placeholder="搜索行政区域"
              onChange={onChange}
              style={{ width: '100%' }}
            />*/}
            <AreaDeviceTree {...treeProps} />
          </Card>
        </Col>
        <Col span={1} style={{ paddingTop: 180, paddingLeft: 15 }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Button type="primary" icon="double-left" onClick={bindingVideo}/>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" icon="double-right" onClick={unbindingVidnet}/>
          </div>
        </Col>
        <Col span={17}>
          <Card title="设备列表">
            <Filter {...filterProps} />
            <List {...listProps} />
          </Card>
        </Col>
      </Row>
      <Modal {...modalProps}  />
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, areaDevice, loading }) => ({
  dispatch,
  areaDevice,
  loading,
}))(index);
