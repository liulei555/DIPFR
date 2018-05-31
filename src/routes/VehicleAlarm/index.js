import React from 'react';
import { connect } from 'dva'
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import Filter from './Filter'
import List from './List'
import { headhildMenu } from "../../common/menu";
import { Row } from 'antd'
import Modal from "./Modal";
import MapModal from "../GisMap/MapModal";
const VehicleAlarm = ({ loading, dispatch, vehicleAlarms, gisMap }) => {
  const pageHeaderProps = {
    menuList: headhildMenu.dispatchedAlarm,
  }
  const { mapSelectCameraData } = gisMap
  console.log(gisMap)
  const { modalVisible, list, pagination, treeData, currentItem, currentItemVehicle } = vehicleAlarms
  const filterProps = {
    treeData: treeData,
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'vehicleAlarms/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '',
          },
        });
      }).then((res) => {
        if (res) {
          treeNode.props.dataRef.children = res
          dispatch({
            type: 'vehicleAlarms/queryTree',
            payload: {
              treeData: [...treeData],
            },
          })
        }
      });
    },
    onSearch(values) {
      console.log(values)
      dispatch({
        type: 'vehicleAlarms/query',
        payload: {
          pageNum: '1',
          pageSize: '10',
          dispositionPerson: values.dispositionPerson,
          dispositionCompany: values.dispositionCompany,
          dispositionTitle: values.dispositionTitle,
          deviceNumber: values.deviceNumber,
          alarmType: values.alarmType,
          alarmTimeStart: values.alarmTimeStart,
          alarmTimeEnd: values.alarmTimeEnd
        }
      })
    },
    showMap() {
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          showMapModel: true
        },
      });
    }
  };
  console.log(list)
  const listProps = {
    loading: loading.effects['vehicleAlarms/query'],
    dataSource: list,
    pagination,
    onChange(page) {
      dispatch({
        type: 'vehicleAlarms/query',
        payload: {
          pageNum: String(page.current),
          rows: String(page.pageSize),
        }
      })
    },
    detail(record) {
      dispatch({
        type: 'vehicleAlarms/detail',
        payload: {
          dispositionId: record.DispositionID
        }
      })
      dispatch({
        type: 'vehicleAlarms/updateState',
        payload: {
          currentItemVehicle: record
        }
      })

    }
  }
  const modalProps = {
    title: '车辆布控告警详细信息',
    visible: modalVisible,
    item: currentItem,
    itemVehicle: currentItemVehicle,
    onCancel() {
      dispatch({
        type: 'vehicleAlarms/hideModal'
      })
    }
  }
  return (
    <PageHeaderLayout {...pageHeaderProps} className="dispatched-vehicleAlarm">
      <Row style={{ backgroundColor: '#fff', padding: '20px' }}>
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps}></Modal>}
        <MapModal />
      </Row>
    </PageHeaderLayout>
  )
}
export default connect(({ loading, dispatch, vehicleAlarms, gisMap }) => ({
  dispatch,
  vehicleAlarms,
  gisMap,
  loading,
}))(VehicleAlarm);
