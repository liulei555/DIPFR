import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Button, Card } from 'antd';
import { Amap, Map, Marker, Markers } from 'react-amap';
// import MapTools from './MapTools';
import config from '../../../config';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};

const amapkey = 'Tech@xinty.com.cnToYouDev_2016';


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
    console.log(marker.getExtData().extData);
    window.open(
      config.pageUrl + '/#/video/surveillanceVideo',
      '_blank',
      'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes,channelmode=yes,fullscreen=yes,height=500,width=700,top=0,left=1366'
    );
    let msg = {
      drviceId: 71000000001320000008
    };
    // socket.emit('drviceId', msg); //发射事件
  },
  dragend: (MapsOption, marker) => {
    /* ... */
  },
};
// 121.124178,31.150681
const randomMark = () =>({
  longitude: Math.floor((121.12*10 + Math.random())*100000)/1000000,
  latitude: Math.floor((31.15*10 + Math.random())*100000)/1000000,
})

const Mmap = ({ ...mapProps}) => {

  const {device, center, deviceGisData} = mapProps

  const setmarker = arr => {
    let markers = [];
    // device.forEach(item => {
    //   markers.push({position: randomMark(),extData:item})
    // })
    deviceGisData.forEach(item => {
      markers.push({
        position: {
          lng:item.PointX - 0.2065,
          lat:item.PointY - 0.1060,
        },extData:item})
    })
    return markers
  }

  return (
    <Map
      key={'Tech@xinty.com.cnToYouDev_2016'}
      version = {'1.4.6'}
      {...mapProps}
    >
      {/*<Markers*/}
        {/*markers={setmarker(device)}*/}
        {/*useCluster={false}*/}
        {/*render={center}*/}
        {/*events={markersEvents}*/}
      {/*/>*/}
      {/*<MapTools*/}
        {/*deviceGisData = {deviceGisData}*/}
      {/*/>*/}
    </Map>
  )
}

Mmap.propTypes = {
};
export default Mmap;
