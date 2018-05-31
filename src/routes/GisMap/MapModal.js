/**
 * 地图弹框
 */
import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import MapViewContainer from '../../components/Map/MapViewContainer';
import config from '../../utils/config';
import style from './mapModel.less';


const index = ({ dispatch,gisMap, loading }) => {
  const { showMapModel,selectCameraData,clickFinish} = gisMap;

  const modalProps = {
    visible: showMapModel,
    maskClosable: false,
    width: '90%',
    height: '400px',
    className: 'map-model',
    keyboard: true,
    onCancel(){
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          showMapModel: false,
        },
      });
    },
    onOk(){
      if(selectCameraData.length){
        dispatch({
          type: 'gisMap/updateState',
          payload: {
            mapSelectCameraData: selectCameraData,
            selectCameraData:[],
            showMapModel: false,
            clickFinish:true,
          },
        });
      } else {
        alert(11)
      }
    },
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
            selectCameraData: data
          },
        });
      }
    },
  }



  return (
    <Modal {...modalProps}>
      <div style={{height:modalProps.height}}>
        <MapViewContainer
          {...mapProps}
        />
      </div>

    </Modal>
  );
};

export default connect(({ dispatch, gisMap, loading }) => ({
  dispatch,
  gisMap,
  loading,
}))(index);
