import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Button, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Amap, Map, Marker, Markers } from 'react-amap';
import config from '../../config';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};

const amapkey = 'Tech@xinty.com.cnToYouDev_2016';
const randomPosition = () => ({
  longitude: 100 + Math.random() * 20,
  latitude: 30 + Math.random() * 20,
});
const randomMarker = len =>
  Array(len)
    .fill(true)
    .map((e, idx) => ({
      position: randomPosition(),
    }));

// const socket = io(config.scocketUrl, {
//   //指定后台的url地址
//   //如果需要的话添加 path 路径以及其他可选项
// });
let index = 0;
let flag = false;
const markersEvents = {
  created: allMarkers => {
    // console.log('All Markers Instance Are Below');
    // console.log(allMarkers);
  },
  click: (MapsOption, marker) => {
    // console.log(MapsOption,'MapsOptions');
    window.open(
      config.pageUrl + '/#/actionMap',
      '_blank',
      'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes,channelmode=yes,fullscreen=yes,height=500,width=700,top=0,left=1366'
    );
    let msg = {
      ...MapsOption.lnglat,
      order: index++,
    };
    // socket.emit('lnglat', msg); //发射事件
  },
  dragend: (MapsOption, marker) => {
    /* ... */
  },
};
const { TextArea } = Input;

@connect(({ action }) => ({
  action,
}))
export default class Action extends Component {
  render() {
    const { dispatch, action } = this.props;
    let { mapInfo } = action;

    if (!flag) {
      // socket.on('center', msg => {
      //   console.log(msg);
      //   dispatch({
      //     type: 'action/update',
      //     payload: {
      //       mapInfo: {
      //         ...msg,
      //       },
      //     },
      //   });
      // });
      flag = !flag;
    }

    return (
      <PageHeaderLayout>
        <div
          style={{
            width: '100%',
            height: '450px',
            margin: '0 auto',
            backgroundColor: '#607D8B',
            overflow: 'hidden',
          }}
        >
          <Map
            key="map"
            center={mapInfo}
            amapkey={amapkey}
            plugins={[
              'MapType',
              'Scale',
              'OverView',
              'ControlBar', // v1.1.0 新增
              {
                name: 'ToolBar',
                options: {
                  visible: true, // 不设置该属性默认就是 true
                  onCreated(ins) {
                    // console.log(ins);
                  },
                },
              },
            ]}
          >
            <Markers
              markers={randomMarker(100)}
              useCluster={false}
              render={mapInfo}
              events={markersEvents}
            />
          </Map>
        </div>
      </PageHeaderLayout>
    );
  }
}
