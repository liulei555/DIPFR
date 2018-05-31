import React from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../../common/menu';
import { Row, Col, Card, message } from 'antd';
import PatrolList from './PatrolList';
import PatrolGroupList from './PatrolGroupList';
import PatrolGroupModal from './PatrolGroupModal';
import PatrolModal from './PatrolModal';

const PatrolGroupConf = ({ dispatch, patrolGroupConf }) => {
  const { list, pagination1, selectedRowKeys, patrolList, pagination2, selectedRowKeys1, modalType, patrolGroup, modalVisible, patrol, patrolModalVisible, pagination3, patrols, selectedRowKeys2, editable } = patrolGroupConf;
  const pageHeaderProps = {
    menuList: headhildMenu.systemAdmin,
  };

  const listProps = {
    dataSource: list,
    pagination: pagination1,
    rowSelection: {
      selectedRowKeys: selectedRowKeys,
      onChange: (keys, data) => {
        dispatch({
          type: 'patrolGroupConf/updateState',
          payload: {
            patrolGroup: data[0],
            selectedRowKeys: keys,
          },
        });
      },
    },
    onChange(page) {
      dispatch({
        type: 'patrolGroupConf/query',
        payload: {
          pageNum: page.current + '',
          pageSize: page.pageSize + '',
          yalx: '3',
        },
      });
    },
    onRow(record) {
      return {
        onClick: () => {
          dispatch({
            type: 'patrolGroupConf/updateState',
            payload: {
              selectedRowKeys: [record.xh],
              patrolGroup: record,
            },
          });
          dispatch({
            type: 'patrolGroupConf/queryPatrolByYABH',
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
        type: 'patrolGroupConf/query',
        payload: {
          pageNum: '1',
          pageSize: '10',
          yalx: '3',
        },
      });
    },
    add() {
      dispatch({
        type: 'patrolGroupConf/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
    update() {
      if (selectedRowKeys && selectedRowKeys.length) {
        if (selectedRowKeys.length === 1) {
          dispatch({
            type: 'patrolGroupConf/showModal',
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
          type: 'patrolGroupConf/remove',
          payload: selectedRowKeys,
        });
      } else {
        message.warning('请选择要删除的数据!');
      }
    },
  };
  const modalProps = {
    title: <div style={{ fontSize: 24 }}>{modalType === 'create' ? '新增' : '修改'}</div>,
    modalType,
    patrolGroup,
    visible: modalVisible,
    destroyOnClose: true,
    commitData(value) {
      if (value) {
        dispatch({
          type: `patrolGroupConf/${modalType}`,
          payload: {
            yamc: value.yamc ? value.yamc : '',
            yhz: '310118',
            yh: 'admin',
            yalx: '3',
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
        type: 'patrolGroupConf/hideModal',
      });
    },
  };
  const patrolListProps = {
    dataSource: patrolList,
    pagination: pagination2,
    editable,
    rowSelection: {
      selectedRowKeys: selectedRowKeys1,
      onChange: (keys, data) => {
        dispatch({
          type: 'patrolGroupConf/updateState',
          payload: {
            patrol: data[0],
            selectedRowKeys1: keys,
          },
        });
      },
    },
    showPatrolModal() {
      if (selectedRowKeys && selectedRowKeys.length) {
        if (selectedRowKeys.length === 1) {
          dispatch({
            type: 'patrolGroupConf/showPatrolModal',
          });
          dispatch({
            type: 'patrolGroupConf/queryPatrol',
            payload: {
              pageNum: '1',
              pageSize: '10',
              planNumber: patrolGroup.yabh ? patrolGroup.yabh : '',
              user: patrolGroup.yh ? patrolGroup.yh : '',
              //如何取值?
              unitInsideCode: 1,
              planType: '2',
            },
          });
        } else {
          message.warning('新增巡逻时只能在一个巡逻组下面添加数据!');
        }
      } else {
        message.warning('请先选择一个巡逻组!');
      }
    },
    deletePlanRelation() {
      dispatch({
        type: 'patrolGroupConf/deletePlanRelation',
        payload: {
          serialNumber: selectedRowKeys1.join(','),
        },
      });
    },

    onRow() {
      return {
        onDoubleClick: () => {
          dispatch({
            type : 'patrolGroupConf/updateState',
            payload : {
              editable : true
            }
          })
        }
      }
    },

    updatePlanRelationOrder(params) {
        dispatch({
          type: 'patrolGroupConf/updatePlanRelationOrder',
          payload: {
            params1: {
              params: params,
            },
            yabh: patrolGroup.yabh,
          },
        });
    },
  };
  const patrolModalProps = {
    visible: patrolModalVisible,
    closable: false,
    pagination: pagination3,
    dataSource: patrols,
    rowSelection: {
      selectedRowKeys: selectedRowKeys2,
      onChange: (keys, data) => {
        dispatch({
          type: 'patrolGroupConf/updateState',
          payload: {
            patrolSelected: data[0],
            selectedRowKeys2: keys,
          },
        });
      },
    },
    onOk() {
      let params = [];
      for (let i = 0; i < selectedRowKeys2.length; i++) {
        let param = {
          mainPlanNumber: selectedRowKeys[0],
          sonPlanNumber: selectedRowKeys2[i],
        };
        params.push(param);
      }
      dispatch({
        type: 'patrolGroupConf/insertPlanRelation',
        payload: {
          params: params,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'patrolGroupConf/hidePatrolModal',
        payload: {
          selectedRowKeys2: [],
        },
      });
    },
  };
  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemAdmin-patrolGroupConf">
      <Card>
        <Row>
          <Col span={12}>
            <Card>
              <PatrolGroupList {...listProps}/>
              <PatrolGroupModal {...modalProps}/>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <PatrolList {...patrolListProps}/>
              <PatrolModal {...patrolModalProps}/>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, patrolGroupConf, loading }) => ({
  dispatch,
  patrolGroupConf,
  loading,
}))(PatrolGroupConf);
