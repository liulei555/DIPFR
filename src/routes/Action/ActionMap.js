import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Button, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import config from '../../config';

// const socket = io(config.scocketUrl, {
//   //指定后台的url地址
//   //如果需要的话添加 path 路径以及其他可选项
// });
let flag = false;
const ActionMap = ({ dispatch, actionMap }) => {
  let { mapInfo } = actionMap;
  let index = 0;
  if (!flag) {
    // socket.on('lnglat', msg => {
    //   //监听事件
    //   console.log(111, msg, index++);
    //   emitLocation(msg);
    // });
    flag = !flag;
  }
  const emitLocation = msg => {
    dispatch({
      type: 'actionMap/update',
      payload: {
        mapInfo: {
          ...msg.lnglat,
        },
      },
    });
  };
  console.log(mapInfo, 'mapInfo');

  const setCenter = () => {
    console.log(mapInfo);
    // socket.emit('center', mapInfo); //发射事件
  };

  return (
    <PageHeaderLayout>
      <Card title={'效果'}>
        <p>经度：{mapInfo.lng}</p>
        <p>纬度：{mapInfo.lat}</p>
      </Card>
      <Button type="primary" onClick={setCenter}>
        更新地图中心点
      </Button>
    </PageHeaderLayout>
  );
};

export default connect(({ actionMap }) => ({ actionMap }))(ActionMap);
