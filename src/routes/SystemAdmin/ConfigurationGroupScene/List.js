import React from 'react';
import { Table, Button, Popconfirm } from 'antd';

const SceneGroupList = ({
                          refresh,
                          pagination,
                          add,
                          update,
                          remove,
                          ...listProps
                        }) => {
  const columns = [
    {
      title: '场景组名称',
      dataIndex: 'yamc',
      key: 'yamc',
    },
    {
      title: '自动启动时间',
      dataIndex: 'zdqdsj',
      key: 'zdqdsj',
    },
    {
      title: '间隔时间(秒)',
      dataIndex: 'jgsj',
      key: 'jgsj',
    },
    {
      title: '默认布局',
      dataIndex: 'mrbj',
      key: 'mrbj',
    },
  ];

  const confirm = (e) => {
    remove();
  };
  const cancel = (e) => {
    console.log(e);
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>场景组配置</h1>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button type='primary'>刷新</Button>
        <Button type='primary' style={{ marginLeft: 15 }} onClick={add}>新增</Button>
        <Button type='primary' style={{ marginLeft: 15 }} onClick={update}>修改</Button>
        {/*<Popconfirm  title="确定删除所选记录吗？" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消">*/}
        {/*<Button type='danger' style={{marginLeft:15}}>删除</Button>*/}
        {/*</Popconfirm>*/}
        <Button type='danger' style={{ marginLeft: 15 }} onClick={remove}>删除</Button>
      </div>
      <Table columns={columns}
             bordered
             {...listProps}
             rowKey={record => record.xh}
             pagination={pagination}
      />
    </div>
  );
};
export default SceneGroupList;
