import React from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import { Row, Col, Card, message } from 'antd';
import List from './List';
import Camera from './Camera';
import PatrolModal from './PatrolModal';
import CameraModal from './CameraModal';
import MapModal from '../../GisMap/MapModal';

const ConfigurationScene = ({ dispatch, configurationScene, loading, gisMap }) => {
  const { list, modalType, modalVisible, pagination1, selectedRowKeys, patrol, cameraModalVisible, cameras, pagination2, treeData, devices, keyWord, pagination3, deviceList, selectedRowKeys2, device, serialNumber, editable } = configurationScene;
  const pageHeaderProps = {
    menuList: headhildMenu.systemAdmin,
  };

  const { mapSelectCameraData, clickFinish, showMapModel } = gisMap;

  if (clickFinish) {
    let gisList = [];
    let gisData;
    if (mapSelectCameraData.lengcameraModalPropsth > 0) {
      mapSelectCameraData.map((item) => {
        gisData = {
          cameraBumber: item.SBBH,
          displayScreen: '',
          planNumber: patrol.yabh,
        };
        gisList.push(gisData);
      });
      dispatch({
        type: 'configurationScene/insertCamera',
        payload: {
          params: gisList,
        },
      });
      dispatch({
        type: 'gisMap/updateState',
        payload: {
          mapSelectCameraData: [],
        },
      });
    }
  }
  const listProps = {
    dataSource: list,
    pagination: pagination1,
    rowSelection: {
      selectedRowKeys: selectedRowKeys,
      onChange: (keys, data) => {
        dispatch({
          type: 'configurationScene/updateState',
          payload: {
            patrol: data[0],
            selectedRowKeys: keys,
          },
        });
      },
    },
    onChange(page) {
      dispatch({
        type: 'configurationScene/query',
        payload: {
          pageNum: page.current + '',
          pageSize: page.pageSize + '',
          yalx: '4',
        },
      });
    },
    onRow(record) {
      return {
        onClick: () => {
          dispatch({
            type: 'configurationScene/updateState',
            payload: {
              selectedRowKeys: [Number(record.yabh)],
              patrol: record,
            },
          });
          dispatch({
            type: 'configurationScene/queryCamera',
            payload: {
              planNumber: record.yabh,
              pageNum: '1',
              pageSize: '10',
            },
          });
        },
      };
    },
    refresh() {
      dispatch({
        type: 'configurationScene/query',
        payload: {
          pageNum: '1',
          pageSize: '10',
          yalx: '4',
        },
      });
    },
    add() {
      dispatch({
        type: 'configurationScene/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
    update() {
      if (selectedRowKeys && selectedRowKeys.length) {
        if (selectedRowKeys.length === 1) {
          dispatch({
            type: 'configurationScene/showModal',
            payload: {
              modalType: 'update',
            },
          });
        } else {
          message.warning('修改时只能选择一条数据!');
        }
      } else {
        message.warning('请先选择一条数据!');
      }
    },
    remove() {
      if (selectedRowKeys && selectedRowKeys.length) {
        dispatch({
          type: 'configurationScene/remove',
          payload: selectedRowKeys,
        });
      } else {
        message.warning('请选择要删除的数据!');
      }
    },
  };
  const cameraProps = {
    dataSource: cameras,
    pagination: pagination2,
    editable,
    rowSelection: {
      onChange: (selectedCameraListRowKeys) => {
        dispatch({
          type: 'configurationScene/updateState',
          payload: {
            serialNumber: selectedCameraListRowKeys.join(','),
          },
        });
      },
    },

    onSelectMap() {//地图选点
      if (selectedRowKeys && selectedRowKeys.length === 1) {
        dispatch({
          type: 'gisMap/updateState',
          payload: {
            showMapModel: true,
            mapSelectCameraData: [],
          },
        });
      } else {
        message.warning('请选择一条记录！');
      }
    },


    showCameraModal() {
      if (selectedRowKeys && selectedRowKeys.length) {
        if (selectedRowKeys.length === 1) {
          dispatch({
            type: 'configurationScene/showCameraModal',
          });
          dispatch({
            type: 'configurationScene/queryTree',
            payload: {
              areaId: 'root',
              userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '',
            },
          });
        } else {
          message.warning('新增摄像头时只能选择一个巡逻!');
        }
      } else {
        message.warning('请先选择一条巡逻数据!');
      }
    },

    deleteCamera() {
      dispatch({
        type: 'configurationScene/deleteCamera',
        payload: {
          serialNumber: serialNumber,
          planNumber: configurationScene.yabh,

        },
      });
    },

    onRow() {
      return {
        onDoubleClick: () => {
          dispatch({
            type : 'configurationScene/updateState',
            payload : {
              editable : true
            }
          })
        }
      }
    },

    changeCameraOrder(params) {
        dispatch({
          type : 'configurationScene/updateCameraOrder',
          payload : {
            params1 : {
              params : params
            },
            planNumber : patrol.yabh
          }
        })
    },
  };

  const modalProps = {
    title: <div style={{ fontSize: 24 }}>{modalType === 'create' ? '新增' : '修改'}</div>,
    modalType,
    patrol,
    visible: modalVisible,
    destroyOnClose: true,
    commitData(value) {
      if (value) {
        dispatch({
          type: `configurationScene/${modalType}`,
          payload: {
            yamc: value.yamc ? value.yamc : '',
            yalx: 4,
            mrbj: value.mrbj ? value.mrbj : '',
            yafblx: value.yafblx ? value.yafblx : '',
            zdqdsj: value.zdqdsj ? value.zdqdsj : '',
            jgsj: value.jgsj ? value.jgsj : '',
          },
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'configurationScene/hideModal',
      });
    },
  };
  const cameraModalProps = {
    title: '新增摄像头',
    visible: cameraModalVisible,
    treeData,
    patrol,
    keyWord,
    pagination3,
    deviceList,
    device,
    dispatch,
    devices: devices,
    rowSelection: {
      selectedRowKeys: selectedRowKeys2,
      onChange: (keys, data) => {
        dispatch({
          type: 'configurationScene/updateState',
          payload: {
            devices: data,
            device: data[0],
            selectedRowKeys2: keys,
          },
        });
      },
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'configurationScene/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '',
          },
        });
      }).then((res) => {
        if (res) {
          treeNode.props.dataRef.children = res;
          dispatch({
            type: 'configurationScene/updateState',
            payload: {
              treeData: [...treeData],
            },
          });
        }
      });
    },
    deleteSelected(record, e) {
      dispatch({
        type: 'configurationScene/updateState',
        payload: {
          devices: devices.filter(item => item !== record),
          selectedRowKeys2: selectedRowKeys2.filter(item => item !== record.deviceNumber),
        },
      });
    },
    changeHandle(e) {
      dispatch({
        type: 'configurationScene/updateState',
        payload: {
          keyWord: e,
        },
      });
    },
    search() {
      dispatch({
        type: 'configurationScene/queryMyDevice',
        payload: {
          pageNum: '1',
          pageSize: '10',
          deviceType: '5',
          departmentInternalCode: '',
          departmentNumber: '',
          deviceName: '',
          deviceNumber: '',
          deviceConditions: keyWord,
        },
      });
    },
    pageChange(page) {
      dispatch({
        type: 'configurationScene/queryMyDevice',
        payload: {
          pageNum: page.current + '',
          pageSize: page.pageSize + '',
          deviceType: '5',
          departmentInternalCode: '',
          departmentNumber: '',
          deviceName: '',
          deviceNumber: '',
          deviceConditions: keyWord,
        },
      });
    },
    onOk() {
      let params = [];
      for (let i = 0; i < devices.length; i++) {
        let param = {
          planNumber: patrol.yabh,
          cameraBumber: devices[i].cameraBumber,
          displayScreen: '',
        };
        params.push(param);
      }
      debugger;
      dispatch({
        type: 'configurationScene/insertCamera',
        payload: {
          params: params,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'configurationScene/hideCameraModal',
      });
    },
  };
  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemAdmin-patrolConf">
      <Card>
      <Row>
        <Col span={12}>
          <Card >
            <List {...listProps}/>
            <PatrolModal {...modalProps}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Camera {...cameraProps}/>
            {treeData && <CameraModal {...cameraModalProps}/>}
          </Card>
        </Col>
      </Row>
      </Card>
      <MapModal/>
    </PageHeaderLayout>
  );
};
export default connect(({ dispatch, configurationScene, loading, gisMap }) => ({
  dispatch,
  configurationScene,
  loading,
  gisMap,
}))(ConfigurationScene);

