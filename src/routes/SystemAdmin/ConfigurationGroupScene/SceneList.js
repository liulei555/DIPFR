import React from 'react';
import { Table, Button, Input } from 'antd';

const SceneList = ({ childSelectedRowKeys, value, dispatch, editable, updateSceneOrder, deleteGroupScene, insertScene, ...sceneListProps }) => {
  let map = new Map();
  const onValueChange = (value, record) => {
    const obj = {"order":value.target.value, "serialNumber":record.xh};
    map.set(record.xh, obj);
  };

  const updateSceneOrderFN = () => {
    const params = [...map.values()];
    if (params.length !==0 ) {
      updateSceneOrder(params);
    }
  };

  const columns = [
    {
      title: '场景名称',
      dataIndex: 'yamc',
      key: 'yamc',
      width : '60%'
    },
    {
      title: '顺序',
      dataIndex: 'sx',
      key: 'sx',
      align : 'center',
      width : '40%',
      render: (text, record) => <div>{editable ? <Input style={{textAlign : 'center'}} defaultValue={text} onChange={(value) => onValueChange(value, record)}/> : text}</div>
    }
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>场景配置</h1>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button type='primary' onClick={insertScene}>添加场景</Button>
        <Button type='danger' style={{ marginLeft: 15 }} onClick={deleteGroupScene}>删除场景</Button>
        <Button type='primary' style={{ marginLeft: 15 }} onClick={updateSceneOrderFN}>更改场景顺序</Button>
      </div>
      <Table columns={columns} bordered {...sceneListProps} rowKey={record => record.xh}/>
    </div>
  );
};
export default SceneList;
