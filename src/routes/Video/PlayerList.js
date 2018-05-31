// 播放列表
import React from 'react';
import {connect} from 'dva';
import {Button, Card, Col, Row, Input, Tabs, Table} from 'antd';
import Tab from './Tab';
import style from './less/PlayerList.less';
import Patrol from './Patrol';
import ScenesGroup from './ScenesGroup';
import HistoryVideo from './HistoryVideo';

const TabPane = Tabs.TabPane;

const PlayerList = ({...tabProps}) => {
  const {dispatch} = tabProps;
  const onChange = (key) => {
    switch (key) {
      case 'playerKey-2':
        sendFun(2);
        break;
      case 'playerKey-3':
        sendFun(4);
        break;
    }
  };
  const sendFun = (val) => {
    dispatch({
      type: 'video/queryPatrol', payload: {
        yalx: val,
      },
    });
  };
  const queryBayonet = () => {

  };
  const patrolProps = {
    dispatch,
  };
  return (
    <div className={'playerList'}>
      <Tabs onChange={onChange} type={`card`}>
        <TabPane className={style.activeBar} key={`playerKey-1`} tab={<span className={style.tabStyle}>视</span>}>
          <Tab {...tabProps} />
        </TabPane>
        <TabPane key={`playerKey-2`} tab={<span className={style.tabStyle}>巡</span>}>
          <Patrol {...patrolProps}/>
        </TabPane>
        <TabPane key={`playerKey-3`} tab={<span className={style.tabStyle}>场</span>}>
          <ScenesGroup/>
        </TabPane>
        <TabPane key={`playerKey-4`} tab={<span className={style.tabStyle}>检</span>}>
          <HistoryVideo/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PlayerList;
