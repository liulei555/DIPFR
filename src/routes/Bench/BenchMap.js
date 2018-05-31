import React from 'react';
import {connect} from 'dva';
import {Amap, Map, Marker, Markers} from 'react-amap';

const KEY = 'Tech@xinty.com.cnToYouDev_2016'
const BenchMap = () => {
  const mapProps = {
    key: 'map1',
    zoom: 12,
    center: [121.124178, 31.150681],
  };
  return (
    <div  style={{
      width: '100%',
      height: '700px',
      margin: '0 auto',
      backgroundColor: '#607D8B',
      overflow: 'hidden',
    }}>
      <Map
        key={KEY}
        {...mapProps}
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
      </Map>
    </div>
  )
};

export default BenchMap;
