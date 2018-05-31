/**
 * 千视通插件
 */
import React from 'react';
import { Row, Message } from 'antd';
import style from './video.less';
import config from '../../config';

const { ocxServerIP, bakServerIP } = config;

const Video = ({ dispatch, loading, ...videoProps }) => {
  /*const { pageTurning, toPlayInfo, bannerVideo, controlFlag, goToVideo } = videoProps;

  let videoControl = document.getElementById('HisVideo');

  // 注册客户端
  const regClient = () => {
    // debugger;
    dispatch({
      type: 'video/updateState',
      payload: {
        controlFlag: !controlFlag,
      },
    });
    let videoCtrl = document.getElementById('HisVideo');
    let result = videoCtrl.MS_StartClient('SUPPER_NONEED_USER', '');
    if (result !== 0) {
      return Message.info('MS_StartClient接口错误！错误码' + result);
    } else {
      // debugger
      videoCtrl.MS_SetLayoutMode(2);//设置布局类型（1）支持的布局模式有三种，参数为0(1,4,6,8,9)、1(1,2,4,6,8,9)、2(1,4,6,8,9,13,16)；
      videoCtrl.MS_SetCurrentLayout(4);//设置布局
      console.log('set layout');
    }
  };*/

  return (
    <div className={style.videoPlay}>
      <Row className={`pubHeight`}>
        <object id="HisVideo" classID="CLSID:B0F9AA50-FB5E-4DB8-A33F-273834EBDBAE" width="100%" height="100%">
          <param name="MainServerIP" value={ocxServerIP}/>
          <param name="HasBakServer" value="0"/>
          <param name="BakServerIP" value={bakServerIP}/>
          <param name="ShowCtrlPane" value="0"/>
          <param name="ShowMenu" value="0"/>
          <param name="SaveLastLayout" value="0"/>
        </object>
      </Row>
    </div>
  );
};

export default Video;
