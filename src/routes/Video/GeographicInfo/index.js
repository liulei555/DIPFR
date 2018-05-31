/**
 * 地图
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Card, Col, Row, Input,Icon,Checkbox } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import MapViewContainer from '../../../components/Map/MapViewContainer'
import config from '../../../utils/config'
import MapModal from '../../GisMap/MapModal'




const index = ({ dispatch, geographicInfo,gisMap, loading }) => {

  const {mapSelectCameraData} = gisMap

  const pageHeaderProps  = {
    menuList: headhildMenu.video,
  }

  const showMap = () =>{
    dispatch({
      type: 'gisMap/updateState',
      payload: {
        showMapModel: true
      },
    });
  }

  const mapProps = {
    src: config.mapUrl,
    data: {
      type: "locate",
      payload: [{sbbh: "0001", sbmc: "test", jd: "121,1234", wd: "31.4567"}]
    },
    callback: {
      select: data => {
        console.log(data)
        dispatch({
          type: 'gisMap/updateState',
          payload: {
            videoCameraData: data
          },
        });
      }
    },
  }

  return (
    <PageHeaderLayout {...pageHeaderProps} style={{ height: '100%',margin: 0, }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: '0 auto',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <MapViewContainer
          {...mapProps}
        />
        {/*<button onClick={showMap}>地图选点</button>*/}
        {/*<div>{JSON.stringify(mapSelectCameraData)}</div>*/}
        <MapModal />
        <MapModal />
      </div>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, geographicInfo, gisMap, loading }) => ({
  dispatch,
  geographicInfo,
  gisMap,
  loading,
}))(index);
