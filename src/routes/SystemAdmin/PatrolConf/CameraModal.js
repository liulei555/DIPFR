import React from 'react';
import { Table, Button, Modal, Tree, Tabs, Input, Row, Col, Card, Icon, Badge } from 'antd';
import styles from './model.less';

const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const CameraModal = ({
                       onLoadData,
                       changeHandle,
                       dispatch,
                       search,
                       pagination3,
                       deviceList,
                       pageChange,
                       rowSelection,
                       ...cameraModalProps
                     }) => {
  const { treeData, devices } = cameraModalProps;

  const deleteSelected = (e) => {
    if (devices) {
      let dateList = devices.filter((item) => item.cameraBumber !== e.cameraBumber);
      console.log(dateList);
      dispatch({
        type: 'patrolConf/updateState',
        payload: {
          devices: dateList,
        },
      });
    }

  };

  let arr = [];
  const onCheck = (checkedKeys, e) => {
    debugger;
    let data;
    console.log(e.checkedNodes);
    if (e.checkedNodes.length > 0) {
      e.checkedNodes.map((item) => {
        if (!item.props.dataRef.children) {
          data = {
            cameraBumber: item.props.dataRef.deviceNumber,
            displayScreen: '',
            nodeName: item.props.dataRef.nodeName,
          };
          let ret1 = devices.find((value, index, arr) => {
            return value.cameraBumber === data.cameraBumber;
          });
          if (!ret1) {
            devices.push(data);
          }
        }
      });
      dispatch({
        type: 'patrolConf/updateState',
        payload: {
          devices: devices,
        },
      });
    }
  };

    const renderTreeNodes = (data) => {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode
              title={item.nodeName}
              key={item.nodeId}
              dataRef={item}
              icon={item.deviceNumber ? <Icon type="video-camera"/> : <Icon type="folder"/>}
            >
              {renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode
          title={item.nodeName}
          key={item.nodeId}
          dataRef={item}
          icon={item.deviceNumber ? <Icon type="video-camera"/> : <Icon type="folder"/>}
        />;
      });
    };

    const columns = [
      {
        title: '编号',
        dataIndex: 'deviceNumber',
        key: 'deviceNumber',
      },
      {
        title: '名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
      },
      {
        title: '隶属单位',
        dataIndex: 'manufacturerName',
        key: 'manufacturerName',
      },
    ];

    const columns1 = [
      {
        title: '编号',
        dataIndex: 'cameraBumber',
        key: 'cameraBumber',
      },
      {
        title: '名称',
        dataIndex: 'nodeName',
        key: 'nodeName',
      },
      {
        title: '操作',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) => (
          <span style={{ cursor: 'pointer' }} onClick={(e) => deleteSelected(record, e)}>删除</span>
        ),
      },
    ];
    return (
      <Modal {...cameraModalProps} width={1000}>
        <Row>
          <Col span={12}>
            <Card bordered={false}>
              <h2 style={{ textAlign: 'center' }}>待选摄像头列表</h2>
              <Tabs defaultActiveKey="1">
                <TabPane tab="行政分组" key="1">
                  <Tree
                    showIcon
                    checkable
                    loadData={onLoadData}
                    onCheck={onCheck}
                  >
                    {renderTreeNodes(treeData)}
                  </Tree>
                </TabPane>
                <TabPane tab="摄像头检索" key="2">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                    <Input onChange={e => changeHandle(e.target.value)}/>
                    <Button type="primary" style={{ marginLeft: 8 }} onClick={search}>摄像头检索</Button>
                  </div>
                  <div className={styles.deviceTable}>
                    <Table
                      columns={columns}
                      bordered dataSource={deviceList}
                      rowSelection={rowSelection}
                      pagination={pagination3}
                      onChange={page => pageChange(page)}
                      rowKey={record => record.deviceNumber}
                    />
                  </div>
                </TabPane>
              </Tabs>

            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <h2 style={{ textAlign: 'center' }}>已选摄像头列表</h2>
              <Table
                columns={columns1}
                bordered
                dataSource={cameraModalProps.devices}
                rowKey={record => record.cameraBumber}
              />
            </Card>
          </Col>
        </Row>
      </Modal>
    );
  };
export default CameraModal;
