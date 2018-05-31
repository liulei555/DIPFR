/**
 * 告警中心
 */
import React from 'react';
import { connect } from 'dva';
import { Icon, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../common/menu';
import MapViewContainer from '../../components/Map/MapViewContainer';
import config from '../../utils/config';
import style from './index.less';
import AlarmList from './AlarmList';
import CarModal from './CarModal';
import FaceModal from './FaceModal';
import MobileModal from './MobileModal';
import Websocket from 'react-websocket';
import { isJSON } from '../../utils/utils';

const index = ({ dispatch, alarmCenter, loading }) => {

  const pageHeaderProps = {
    menuList: headhildMenu.dispatchedAlarm,
  };

  const { alarmData, carModalVisible, faceModalVisible, mobileModalVisible } = alarmCenter;

  const mapProps = {
    src: config.mapUrl,
    data: {
      type: 'locate',
      payload: [{ sbbh: '0001', sbmc: 'test', jd: '121,1234', wd: '31.4567' }],
    },
    callback: {
      // select: data => {
      //   socket.emit('drviceId', data[0].sbbh); //发射事件
      //   console.log(data)
      //   // dispatch({type: 'xxx', payload: {data}})
      // }
    },
  };

  const alarmListProps = {
    dataSource: alarmData,
    total: alarmData.length,
    loading: false,
    onClick: (item) => {
      if (item.alarmType === '车辆告警') {
        dispatch({
          type: 'alarmCenter/updateState',
          payload: {
            carModalVisible: true,
          },
        });
      } else if (item.alarmType === '人脸告警') {
        dispatch({
          type: 'alarmCenter/updateState',
          payload: {
            faceModalVisible: true,
          },
        });
      } else if (item.alarmType === '手机串号告警') {
        dispatch({
          type: 'alarmCenter/updateState',
          payload: {
            mobileModalVisible: true,
          },
        });
      }
    },
  };

  const carModalProps = {
    title: '车辆布控告警详细信息',
    visible: carModalVisible,
    width: '80%',
    onCancel() {
      dispatch({
        type: 'alarmCenter/updateState',
        payload: {
          carModalVisible: false,
        },
      });
    },
  };

  const faceModalProps = {
    title: '人脸布控告警详细信息',
    visible: faceModalVisible,
    width: '65%',
    onCancel() {
      dispatch({
        type: 'alarmCenter/updateState',
        payload: {
          faceModalVisible: false,
        },
      });
    },
  };

  const mobileModalProps = {
    title: '手机告警详细信息',
    visible: mobileModalVisible,
    width: '50%',
    onCancel() {
      dispatch({
        type: 'alarmCenter/updateState',
        payload: {
          mobileModalVisible: false,
        },
      });
    },
  };

  const handleData = (data) => {
    if (data && isJSON(data)) {
      dispatch({
        type: 'alarmCenter/updateState',
        payload: {
          alarmData: JSON.parse(data),
        },
      });
    } else {
      message.error('获取告警数据出现错误！')
    }
  };

  return (
    <PageHeaderLayout {...pageHeaderProps} style={{ height: '100%', margin: 0 }}>
      <CarModal {...carModalProps} />
      <FaceModal {...faceModalProps} />
      <MobileModal {...mobileModalProps} />
      <Websocket url='ws://172.20.32.77:9001/alarmWebSocketData'
                 onMessage={handleData} />
      <div className={style.alarmCenter}>
        <MapViewContainer
          {...mapProps}
        />
        <AlarmList {...alarmListProps} />
      </div>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, alarmCenter, loading }) => ({
  dispatch,
  alarmCenter,
  loading,
}))(index);
