/**
 * 行政设备关系
 */
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Card, Col, Row, Input, Tabs, Message, Icon} from 'antd';
import style from '../../routes/Video/less/video.less';
import config from '../../config';

const {ocxServerIP, bakServerIP} = config;
console.log('ocxServerIP', ocxServerIP)
console.log('ocxServerIP', bakServerIP)

const TabPane = Tabs.TabPane;
const Video = ({dispatch, loading, ...videoProps}) => {
  const {pageTurning, toPlayInfo, bannerVideo, controlFlag, goToVideo} = videoProps;
  let currentIndex;
  let currentLayout;
  let pageSize;
  let currentPage = 1;
  let totalPage;
  let videoControl = document.getElementById("HisVideo");

  // 注册客户端
  const regClient = () => {
    // debugger;
    dispatch({
      type: 'video/updateState',
      payload: {
        controlFlag: !controlFlag,
      }
    });
    let videoCtrl = document.getElementById("HisVideo");
    let result = videoCtrl.MS_StartClient('SUPPER_NONEED_USER', '');
    if (result !== 0) {
      return Message.info("MS_StartClient接口错误！错误码" + result);
    } else {
      // debugger
      videoCtrl.MS_SetLayoutMode(2);//设置布局类型（1）支持的布局模式有三种，参数为0(1,4,6,8,9)、1(1,2,4,6,8,9)、2(1,4,6,8,9,13,16)；
      videoCtrl.MS_SetCurrentLayout(4);//设置布局
      console.log('set layout')
    }
  };
  // 上一页
  const previousPage = () => {
    currentPage--;
    if (currentPage === 0) {
      currentPage = totalPage;
    }
    let flag = isPageTurn();
    let begin = (currentPage - 1) * pageSize;
    let end = currentPage * pageSize;
    if (flag) {
      // 需要播放的视频集合
      let newPlayInfo = toPlayInfo.slice(begin, end);
      startTurn(newPlayInfo);
    }
  };
  // 下一页
  const nextPage = () => {
    currentPage++;
    if (currentPage > totalPage) {
      currentPage = 1
    }
    ;
    let flag = isPageTurn();
    let begin = (currentPage - 1) * pageSize;
    let end = currentPage * pageSize;
    if (flag) {
      // 需要播放的视频集合
      let newPlayInfo = toPlayInfo.slice(begin, end);
      startTurn(newPlayInfo);
    }
  };
  // 是否跳转
  const isPageTurn = () => {
    let turnFlag = false;
    currentIndex = videoControl.MS_GetCurrentWindow();  //当前播放窗体索引数;
    currentLayout = videoControl.MS_GetLayoutState();  //获取当前分屏布局数;
    pageSize = currentLayout;
    totalPage = Math.ceil(parseInt(toPlayInfo.length) / parseInt(currentLayout));   // 根据播放视频数目/当前分屏布局数 得到总页数
    if (currentIndex) {
      if (toPlayInfo && toPlayInfo.length > currentLayout) {
        turnFlag = true;
      }
    } else {
      return turnFlag = false;
    }
    return turnFlag;
  };
  // 开始跳转
  const startTurn = (newPlayInfo) => {
    // 停止当前所有窗口播放
    videoControl.MS_DisConnectAllCamera();
    // 开启新一轮播放;
    // // // debugger
    for (let i = 0; i < newPlayInfo.length; i++) {
      goToVideo(newPlayInfo[i], i);
    }
  };
  // 注册视频控件
  if (videoControl && !controlFlag) {
    setTimeout(() => {
      regClient();
    }, 100)
  }
  // 播放视频
  const beginPlay = (toPlayInfo, currentLayout) => {
    videoControl.MS_SetCurrentLayout(currentLayout || 4);
    // 获取当前播放窗口索引
    let newPlayerList = [];
    for (let i = 0; i < toPlayInfo.length; i++) {
      if (i < currentLayout) {
        setTimeout(() => {
          goToVideo(toPlayInfo[i], i);
        }, 500)

      } else {
        videoControl.MS_DisConnectAllCamera();
        let arr = toPlayInfo.splice(i, toPlayInfo.length - 1);
        beginPlay(arr, currentLayout)
      }
    }
  };
  // 是否开启轮播;
  if (bannerVideo) {
    setTimeout(() => {
      startTurn(toPlayInfo);
    }, 10)
  }
  if (toPlayInfo.length > 0) {
    //  let currentIndex = videoControl.MS_GetCurrentWindow() || 0;  //当前播放窗体索引数;
    let currentLayout = videoControl.MS_GetLayoutState();  //获取当前分屏布局数;
    console.log(toPlayInfo, currentLayout, 'toplayinfo')
    beginPlay(toPlayInfo, currentLayout);
  }
  let playIndex = -1;
  return (
    <div className={`videoPlay`}>
      <Row className={`pubHeight`}>
        <div className="leftPage">
          {pageTurning && <Icon type="left-
" onClick={previousPage}/>}
        </div>
        <div className="rightPage">
          {pageTurning && <Icon type="right-square" onClick={nextPage}/>}
        </div>
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

export default Video
