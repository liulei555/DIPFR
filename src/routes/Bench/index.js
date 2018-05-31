import React from 'react';
import {connect} from 'dva';
import config from '../../config';

const Index = ({dispatch, loading, bench}) => {
  let way = JSON.parse(sessionStorage.getItem('displayWay'));
  if (way) {
    window.open(
      config.pageUrl + '/#/bench/benchMap',
      '_blank',
      'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes,channelmode=yes,fullscreen=yes,height=500,width=700,top=0,right=1366'
    );
  }
  return (
    <h4>我的工作台</h4>
  )
};

export default connect(({dispatch, bench, loading}) => ({
  dispatch,
  bench,
  loading,
}))(Index);
