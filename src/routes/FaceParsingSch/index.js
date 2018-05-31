import React from 'react';
import { connect } from 'dva'
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import Filter from './Filter'
import List from './List'
import {headhildMenu} from "../../common/menu";
import {Card} from 'antd'
import style from './index.less'
import MapModal from "../GisMap/MapModal";
const FaceParsingSch=({dispatch,faceParseSch,gisMap})=>{
  const pageHeaderProps = {
    menuList: headhildMenu.spaceTime,
  };
  const {mapSelectCameraData} = gisMap
  const {treeData,list,pagination,selectedRowKeys}=faceParseSch
  const listProps={
    dataSource:list,
    pagination,
    rowKey: record => record.deviceNumber,
    onSort(a,b){
      console.log(a,b)
    },
    rowSelection:{
      selectedRowKeys:selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type: 'faceParseSch/updateState',
          payload: {
            selectedRowKeys:selectedRowKeys
          },
        });
      }
    },

    onChange (page) {
      const { query, pathname } = location
      dispatch({
        type:'faceParseSch/query',
        payload:{
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
          deviceType:'5',
        }
      })
    },
    onAnalysisItem(v){
      console.log(v)
      dispatch({
        type:'faceParseSch/startAnalysis',
        payload:{
         devices:[v.deviceNumber],
        }
      })
    },
    onStopItem(v){
      console.log(v)
      dispatch({
        type:'faceParseSch/endAnalysis',
        payload:{
          devices:[v.deviceNumber],
        }
      })
    },
    onAnalysis(v){
     // console.log(selectedRowKeys)
      dispatch({
        type:'faceParseSch/startAnalysis',
        payload:{
          devices:selectedRowKeys,
        }
      })
    },
    onStop(v){
      dispatch({
        type:'faceParseSch/endAnalysis',
        payload:{
          devices:selectedRowKeys,
        }
      })
    }
  }
  const filterProps={
    treeData:treeData,
    onLoadData(treeNode){
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'faceParseSch/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',
          },
        });
      }).then((res) => {
        if(res){
          treeNode.props.dataRef.children = res
          dispatch({
            type:'faceParseSch/queryTree',
            payload:{
              treeData: [...treeData],
            },
          })
        }
      });
    },
    onSearch(values){
      dispatch({
        type:'faceParseSch/query',
        payload:{
          pageNum:'1',
          pageSize:'100',
          deviceType:'5',
          deviceName:values.deviceName,
          deviceNumber:values.deviceNumber,
          manufacturerName:values.manufacturerName,
          ipAddress:values.ipAddress,
        }
      })
    },
    showMap(){
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          showMapModel: true
        },
      });
    }
  }
  return (
    <PageHeaderLayout {...pageHeaderProps} className="FaceParsingSch">
      <Card classNames={style.faceParsingSch}>
        <Card bordered={false} bodyStyle={{padding:0}}> <Filter {...filterProps}/></Card>
        <Card bordered={false}> <List {...listProps}/></Card>
        <MapModal />
      </Card>
    </PageHeaderLayout>
  )
};

export default connect(({dispatch,faceParseSch,gisMap,loading}) => ({
  dispatch,
  faceParseSch,
  gisMap,
  loading,
}))(FaceParsingSch);
