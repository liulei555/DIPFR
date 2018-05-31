import React from 'react';
import { Form, Table, Modal,Select,DatePicker  } from 'antd';

const modal = ({
  ...modalSceneProps,


}) => {

  const columns = [
    {
      title: '预案编号',
      dataIndex: 'planNumber',
      key: 'planNumber',
    },
    {
      title: '预案名称',
      dataIndex: 'planName',
      key: 'planName',
    },
  ];
  return (
    <Modal {...modalSceneProps} title={<div style={{fontSize:24}}>新增场景配置</div>}>
      <Table columns={columns} {...modalSceneProps}  bordered  rowKey={record => record.serialNumber}/>
    </Modal>
  );
};
export default modal;
