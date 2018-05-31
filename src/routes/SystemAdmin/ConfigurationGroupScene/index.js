import React from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import { Row, Col, Card, message } from 'antd';
import SceneList from './SceneList';
import SceneGroupList from './List';
import SceneGroupModal from './SceneGroupModal';
import ModalScene from './Modal';
import patrolGroupConf from '../../../models/patrolGroupConf';

const ConGroupScene = ({ dispatch, configurationGroupScene, loading }) => {
  const { pagination1, selectedRowKeys, pagination, selectedRowKeys1, modalType, dataSourceScene, modalVisible, dataSource, key, sceneGroup, modalSceneVisible, dataSourceModal, pagination2, childSelectedRowKeys, dataUuu, editable, value } = configurationGroupScene;

  const pageHeaderProps = {
    menuList: headhildMenu.systemAdmin,
  };

  const listProps = {
    dataSource: dataSource,
    pagination,
    onChange(page) {
      console.log(page);
      dispatch({
        type: 'configurationGroupScene/query',
        payload: {
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
          yalx: '5',
        },
      });
    },
    rowSelection: {
      selectedRowKeys: selectedRowKeys,
      onChange: (keys, data) => {
        dispatch({
          type: 'configurationGroupScene/updateState',
          payload: {
            sceneGroup: data[0],
            selectedRowKeys: keys,
            key: keys.join(','),

          },
        });
      },
    },
    onRow(record) {
      return {
        onClick: () => {
          dispatch({
            type: 'configurationGroupScene/updateState',
            payload: {
              selectedRowKeys: [record.xh],
              key: record.xh,
              sceneGroup: record,
            },
          });
          dispatch({
            type: 'configurationGroupScene/queryGroupScene',
            payload: {
              yabh: record.yabh,
              pageNum: '1',
              pageSize: '10',
            },
          });
        },
      };
    },

    refresh() {
      dispatch({
        type: 'configurationGroupScene/query',
        payload: {
          pageNum: '1',
          pageSize: '10',
          yalx: '5',
        },
      });
    },
    add() {
      dispatch({
        type: 'configurationGroupScene/updateState',
        payload: {
          modalType: 'create',
          modalVisible: true,
        },
      });
    },
    update() {
      if (selectedRowKeys && selectedRowKeys.length) {
        if (selectedRowKeys.length === 1) {
          dispatch({
            type: 'configurationGroupScene/updateState',
            payload: {
              modalType: 'update',
              modalVisible: true,
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
          type: 'configurationGroupScene/remove',
          payload: {
            selectedRowKeys: selectedRowKeys,
          },
        });
      } else {
        message.warning('请选择要删除的数据!');
      }
    },
  };

  const modalProps = {
    title: <div style={{ fontSize: 24 }}>{modalType === 'create' ? '新增' : '修改'}</div>,
    modalType,
    dispatch,
    visible: modalVisible,
    sceneGroup,
    destroyOnClose: true,
    commitData(value) {
      if (value) {
        dispatch({
          type: `configurationGroupScene/${modalType}`,
          payload: {
            yamc: value.yamc ? value.yamc : '',
            yhz: value.yhz ? value.yhz : '310118',
            yh: sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : '',
            yalx: '5',
            mrbj: value.mrbj ? value.mrbj : '',
            yafblx: value.yafblx ? value.yafblx : '',
            jgsj: value.jgsj ? value.jgsj : '',
            zdqdsj: value.zdqdsj ? value.zdqdsj : '',
          },
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'configurationGroupScene/updateState',
        payload: {
          modalVisible: false,
        },
      });
    },

  };
  const sceneListProps = {
    dataSource: dataSourceScene,
    pagination: pagination1,
    editable,
    dispatch,
    value,
    rowSelection: {
      selectedRowKeys: selectedRowKeys1,
      onChange: (keys, data) => {
        console.log(data);
        dispatch({
          type: 'configurationGroupScene/updateState',
          payload: {
            patrol: data[0],
            selectedRowKeys1: keys,
            dataUuu: data,
          },
        });
      },
    },
    onRow() {
      return {
        onDoubleClick: () => {
          dispatch({
            type : 'configurationGroupScene/updateState',
            payload : {
              editable : true
            }
          })
      }
      }
    },

    updateSceneOrder(params) {
        dispatch({
          type : 'configurationGroupScene/updatePlanRelationOrder',
          payload : {
            params1 : {
              params : params
            },
            yabh : key
          }
        })
    },

    deleteGroupScene() {
      if (selectedRowKeys1 && selectedRowKeys1.length) {
        dispatch({
          type: 'configurationGroupScene/deleteGroupScene',
          payload: {
            serialNumber: selectedRowKeys1.join(','),
            yabh: key,
          },
        });
      } else {
        message.warning('请选择要删除的数据!');
      }
    },

    insertScene() {
      if (selectedRowKeys && selectedRowKeys.length > 0) {
        if (selectedRowKeys && selectedRowKeys.length === 1) {
          dispatch({
            type: 'configurationGroupScene/queryScene',
            payload: {
              pageNum: '1',
              pageSize: '10',
              planNumber: sceneGroup.yabh ? sceneGroup.yabh : '',
              user: sceneGroup.yh ? sceneGroup.yh : '',
              unitInsideCode: sceneGroup.innerLocationCode ? sceneGroup.innerLocationCode : 1,
              planType: '4',
            },
          });
          dispatch({
            type: 'configurationGroupScene/updateState',
            payload: {
              modalSceneVisible: true,
            },
          });
        } else {
          message.warning('只能选择一条记录！');
        }
      } else {
        message.warning('请至少选择一条');
      }
    },
  };

  const modalSceneProps = {
    visible: modalSceneVisible,
    dataSource: dataSourceModal,
    pagination: pagination2,
    childSelectedRowKeys,
    destroyOnClose: true,
    onOk() {
      let arr = [];
      let data = {};
      let mainPlanNumber = '';
      let sonPlanNumber = '';
      if (key && childSelectedRowKeys) {
        childSelectedRowKeys.map((item) => {
          data = {
            mainPlanNumber: key,
            sonPlanNumber: item,
          };
          arr.push(data);
        });
      }
      dispatch({
        type: 'configurationGroupScene/addScene',
        payload: {
          params: arr,
        },
      });
    },
    wrapClassName: 'vertical-center-modal',
    onChange(page) {
      dispatch({
        type: 'configurationGroupScene/queryScene',
        payload: {
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
          planNumber: sceneGroup.yabh ? sceneGroup.yabh : '',
          user: sceneGroup.yh ? sceneGroup.yh : '',
          unitInsideCode: sceneGroup.innerLocationCode ? sceneGroup.innerLocationCode : '',
          planType: '4',
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'configurationGroupScene/updateState',
        payload: {
          modalSceneVisible: false,
        },
      });
    },

    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type: 'configurationGroupScene/updateState',
          payload: {
            childSelectedRowKeys: selectedRowKeys,

          },
        });
      },
    },
  };


  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemAdmin-configurationGroupScene">
      <Card>
        <Row>
          <Col span={12}>
            <Card>
              <SceneGroupList {...listProps}/>
              <SceneGroupModal {...modalProps}/>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <SceneList {...sceneListProps}/>
              <ModalScene {...modalSceneProps}/>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, configurationGroupScene, loading }) => ({
  dispatch,
  configurationGroupScene,
  loading,
}))(ConGroupScene);
