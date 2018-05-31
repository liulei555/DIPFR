import React from 'react';
import { connect } from 'dva'
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import Filter from './Filter'
import List from './List'
import {headhildMenu} from "../../common/menu";
import {Card} from 'antd'
import style from './index.less'
import MapModal from "../GisMap/MapModal";
const VideoAnalyticsSch=({dispatch,videoAnalyticsSch,gisMap})=>{
  const pageHeaderProps = {
    menuList: headhildMenu.spaceTime,
  };
  const {mapSelectCameraData} = gisMap
  const {treeData,list,pagination,selectedRowKeys}=videoAnalyticsSch
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
          type: 'videoAnalyticsSch/updateState',
          payload: {
            selectedRowKeys:selectedRowKeys
          },
        });
      }
    },

    onChange (page) {
      const { query, pathname } = location
      dispatch({
        type:'videoAnalyticsSch/query',
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
        type:'videoAnalyticsSch/startAnalysis',
        payload:{
         devices:[v.deviceNumber],
        }
      })
    },
    onStopItem(v){
      console.log(v)
      dispatch({
        type:'videoAnalyticsSch/endAnalysis',
        payload:{
          devices:[v.deviceNumber],
        }
      })
    },
    onAnalysis(v){
     // console.log(selectedRowKeys)
      dispatch({
        type:'videoAnalyticsSch/startAnalysis',
        payload:{
          devices:selectedRowKeys,
        }
      })
    },
    onStop(v){
      dispatch({
        type:'videoAnalyticsSch/endAnalysis',
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
          type: 'videoAnalyticsSch/queryTree',
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
            type:'videoAnalyticsSch/queryTree',
            payload:{
              treeData: [...treeData],
            },
          })
        }
      });
    },
    onSearch(values){
      dispatch({
        type:'videoAnalyticsSch/query',
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
    <PageHeaderLayout {...pageHeaderProps}>
      <Card classNames={style.videoAnalyticsSch}>
        <Card bordered={false} bodyStyle={{padding:0}}> <Filter {...filterProps}/></Card>
        <Card bordered={false}> <List {...listProps}/></Card>
        <MapModal />
      </Card>
    </PageHeaderLayout>
  )
};

export default connect(({dispatch,videoAnalyticsSch,gisMap,loading}) => ({
  dispatch,
  videoAnalyticsSch,
  gisMap,
  loading,
}))(VideoAnalyticsSch);
