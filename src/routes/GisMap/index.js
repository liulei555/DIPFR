/**
 * 行政设备关系
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, Col, Row, Input,Icon,Checkbox } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../common/menu';
import MapViewContainer from '../../components/Map/MapViewContainer'
import config from '../../utils/config'
import style from './index.less';


let pageObj = {
  current: 1,
  pageSize: 10
};

let flag = false;
//连接socket服务
// const socket = io(config.scocketUrl)

const index = ({ dispatch, geographicInfo, loading }) => {
  const { dataSource, pagination, treeData,device, childData ,synctime, modalVisible,deviceGisData} = geographicInfo;

  let { mapInfo } = geographicInfo;

  const pageHeaderProps  = {
    // tabList: headhildMenu.systemOperation,
    menuList: headhildMenu.video,
  }

  const mapProps = {
    src: config.mapUrl,
    data: {
      type: "locate",
      payload: [{sbbh: "0001", sbmc: "test", jd: "121,1234", wd: "31.4567"}]
    },
    callback: {
      select: data => {
        // socket.emit('drviceId', data[0].sbbh); //发射事件
        console.log(data)
        // dispatch({type: 'xxx', payload: {data}})
      }
    },
  }



  const listProps = {
    dataSource,
    pagination,
    onChange (page) {
      pageObj = page
      dispatch({
        type:'geographicInfo/query',
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
        type:'geographicInfo/query',
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
          type:'geographicInfo/updateState',
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

    onSelect(node,e){
      dispatch({
        type:'geographicInfo/updateState',
        payload:{
          device: e.node.props.dataRef.children || [],
        },
      })
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
          type: 'geographicInfo/queryTree',
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
            type:'geographicInfo/updateState',
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
        type:'geographicInfo/updateState',
        payload:{
          modalVisible: false
        }
      })
    },
  };

  const addNode = () => {
    console.log('add')
    dispatch({
      type:'geographicInfo/updateState',
      payload:{
        modalVisible: true
      }
    })
  }

  const videList = Array(6).fill(1)


  return (
    <PageHeaderLayout {...pageHeaderProps} style={{ height: '100%',margin: 0, }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: '0 auto',
          backgroundColor: '#607D8B',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <MapViewContainer
          {...mapProps}
        />

        <div className="map-overlay" style={{display:'none'}}>
          <div className="map-search">
            {<Input.Search

              addonBefore={<Icon type="bars" />}
              placeholder="搜索行政区域"
              onSearch={value => console.log(value)}
              style={{ width: '100%',height: '100%' }}
            />}
          </div>
          <div className="map-video-box">
            <ul className="map-video-list">
              {
                videList.map((v, k) => (
                    <li className="map-video-item" key={k}>
                      <div className="map-video-wapper">
                        <div className="map-video-content">
                          <img src={videoImg} width="104%" alt=""/>
                        </div>
                        <span className="map-video-top">
                           <span>{k+1}</span>
                        </span>
                        <div className="map-video-bottom">
                          <Checkbox style={{position: 'relative', top: '-1px'}}></Checkbox>
                          <span>3526498</span>
                          <span style={{float: 'right'}}>宝杨派出所</span>
                        </div>
                      </div>
                    </li>
                  )
                )
              }
            </ul>
            <div className="map-video-box-bottom">
              <Checkbox style={{position: 'relative', top: '-1px'}}></Checkbox>
              <div>
                <Button className="on">实时视频播放</Button>
                <Button>实时视频追加</Button>
                <Button>历史视频回放</Button>
                <Button>周边实时视频</Button>
              </div>
            </div>
          </div>
        </div>

        {/*<Map {...mapProps}></Map>*/}
        <Card title={<Input.Search
          placeholder="搜索行政区域"
          onSearch={value => console.log(value)}
          style={{ width: '100%' }}
        />} className={'map-card'} style={{ display:'none' }}>
          <AreaDeviceTree {...treeProps} />
        </Card>
      </div>
      <Modal {...modalProps}  />
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, geographicInfo, loading }) => ({
  dispatch,
  geographicInfo,
  loading,
}))(index);
