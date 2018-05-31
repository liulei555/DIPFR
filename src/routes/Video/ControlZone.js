import React from 'react';
import {Progress, Button, Icon, Slider} from 'antd';
import {Pie, yuan} from '../../components/Charts';
import style from './less/control.less';
import img from './src/cloud.jpg';

const ButtonGroup = Button.Group;
const ControlZone = () => {
  const mark = {
    50: ''
  };

  const salesPieData = [
    {
      x: '家用电器',
      y: 12.5,
    },
    {
      x: '食用酒水',
      y: 12.5,
    },
    {
      x: '个护健康',
      y: 12.5,
    },
    {
      x: '服饰箱包',
      y: 12.5,
    },
    {
      x: '母婴产品',
      y: 12.5,
    },
    {
      x: '其他',
      y: 12.5,
    },
    {
      x: '暂停',
      y: 12.5,
    },
    {
      x: '左',
      y: 12.5,
    },
  ];
  const PTZ=()=>{
    // debugger
    let videoCtrl =document.getElementById("HisVideo");
    // debugger
    result = videoCtrl.MS_CtrlCameraPTZ(2,3);
    if(result!=0)
    {
      alert("MS_CtrlCameraPTZ接口错误！错误码" + result);
      return;
    }
  };
  return (
    <div className="controlZone">
      <div className="cloud">
        <div className="pinOfStudent">
          <div id="tipZone">
            <div id="base1" className="part" >
              <div className="bing" >
                <span onClick={PTZ}>良好</span>
              </div>
            </div>
            <div id="base2" className="part" >
              <div className="bing">
                <span>优秀</span>
              </div>
            </div>
            <div id="base3" className="part">
              <div className="bing">
                <span>未提交</span>
              </div>
            </div>
            <div id="base4"className="part" >
              <div className="bing">
                <span>需努力</span>
              </div>
            </div>
            <div id="base5" className="part" >
              <div className="bing">
                <span>加油</span>
              </div>
            </div>
            <div id="base6" className="inner"  >
              <span>98%</span><br/>
              <span>得分率</span>
            </div>
            <div id="base7" className="part"  >
              <div className="bing">
                <span>left</span>
              </div>
            </div>
            <div id="base8" className="part"  >
              <div className="bing">
                <span>right</span>
              </div>
            </div>
            <div id="base9" className="part"  >
              <div className="bing">
                <span>top</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="controlFilter">
        <div className="lens marginBottom">
          <h4><Icon type="chrome" className="logoIcon"/>镜头</h4>
          <div className="clickBtn">
            <Icon type="minus" className="leftIcon"/>
            <Icon type="plus" className="rightIcon"/>
          </div>
          <Slider marks={mark} defaultValue={50}/>
        </div>
        <div className="aperture marginBottom">
          <h4><Icon type="chrome" className="logoIcon"/>光圈</h4>
          <div className="clickBtn">
            <Icon type="minus" className="leftIcon"/>
            <Icon type="plus" className="rightIcon"/>
          </div>
          <Slider marks={mark} defaultValue={50}/>
        </div>
        <div className="focal marginBottom">
          <h4><Icon type="chrome" className="logoIcon"/>焦距</h4>
          <div className="clickBtn">
            <Icon type="minus" className="leftIcon"/>
            <Icon type="plus" className="rightIcon"/>
          </div>
          <Slider marks={mark} defaultValue={50}/>
        </div>
        <div className="volume marginBottom">
          <h4><Icon type="chrome" className="logoIcon"/>音量</h4>
          <div className="clickBtn">
            <Icon type="minus" className="leftIcon"/>
            <Icon type="plus" className="rightIcon"/>
          </div>
          <Slider marks={mark} defaultValue={50}/>
        </div>
      </div>
    </div>
  )
};

export default ControlZone;
