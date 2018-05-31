/**
 * 行政设备关系
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, Col, Row, Input } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import List from './List';
import AreaDeviceTree from '../../../components/AreaDeviceTree';
import Filter from './Filter';
import Modal from './Modal';
import style from './index.less';

let pageObj = {
  current: 1,
  pageSize: 10
};
const index = ({ dispatch, xingZhengSheBei, loading }) => {
  const { dataSource, pagination, treeData, childData ,synctime, modalVisible} = xingZhengSheBei;

  const pageHeaderProps  = {
    // tabList: headhildMenu.systemOperation,
    menuList: headhildMenu.systemOperation,
  }

  const listProps = {
    dataSource,
    pagination,
    onChange (page) {
      pageObj = page
      dispatch({
        type:'xingZhengSheBei/query',
        payload:{
          pageNum: String(page.current),
          pageSize: String(page.pageSize)
        }
      })

    },
    rowSelection:  {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        serialNumber: record.serialNumber,
      }),
    }
  };

  const filterProps = {
    search(values) {
      dispatch({
        type:'xingZhengSheBei/query',
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
          type:'xingZhengSheBei/updateState',
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
          type: 'xingZhengSheBei/queryTree',
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
            type:'xingZhengSheBei/updateState',
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
    wrapClassName: 'vertical-center-modal',
    onOk(data){
      console.log(data)
      modalProps.onCancel()
    },
    onCancel () {
      dispatch({
        type:'xingZhengSheBei/updateState',
        payload:{
          modalVisible: false
        }
      })
    },
  };

  const addNode = () => {
    console.log('add')
    dispatch({
      type:'xingZhengSheBei/updateState',
      payload:{
        modalVisible: true
      }
    })
  }

  return (
    <PageHeaderLayout {...pageHeaderProps}>
      <Row>
        <Col span={6} style={{}}>
          <Card title="行政区域">
            <div style={{marginBottom: 15}}>
              <Button type="primary">刷新</Button>
              <Button type="primary">删除</Button>
              <Button type="primary" onClick={addNode}>创建节点</Button>
            </div>
            <Input.Search
              placeholder="搜索行政区域"
              onSearch={value => console.log(value)}
              style={{ width: '100%' }}
            />
            <AreaDeviceTree {...treeProps} />
          </Card>
        </Col>
        <Col span={1} style={{ paddingTop: 180, paddingLeft: 15 }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Button type="primary" icon="double-left" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" icon="double-right" />
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

export default connect(({ dispatch, xingZhengSheBei, loading }) => ({
  dispatch,
  xingZhengSheBei,
  loading,
}))(index);
