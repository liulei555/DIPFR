/**
 * 行政设备关系
 */
import {message} from 'antd';
import * as videoSerice from '../services/video';
import {queryAreaVid} from '../services/areaDevice';
import {routerRedux} from 'dva/router';
// import {} from '../utils'

export default {
  namespace: 'video',
  state: {
    treeData: [],
    deviceList1: [],
    confirmLoading:
      false,
    patrolList:
      [],
    patrolGroup:
      [],
    seceneList:
      [],
    seceneGroup:
      [],
    controlFlag: false, // 是否注册ocx客户端
    treeVal: [],   // 选中设备数据
    tagsFromServer:
      [{
        label: '人群密集', checked: false,
      }, {
        label: '人群卡口',
        checked: false,
      }, {
        label: '学校', checked: false,
      }, {
        label: '医院', checked: false,
      }, {
        label: '商场', checked: true,
      }, {
        label: '车辆卡口',
        checked: true,
      }],
    checkedList1:
      [],
    indeterminate1:
      false,
    checkAll1:
      false,
    checkedList2:
      [],
    indeterminate2:
      false,
    checkAll2:
      false,
    videoFlag: false,
    deviceList: [],
    treeFlag: true,   // 设备树开关
    mapFlag: false,   // 电子地图开关
    pageTurning: false, // 视频整体翻页,是否启用轮播
    toPlayInfo: [],  // 待播放设备集合
    userPatrolDevice: [],   //用户所有巡逻设备
    bannerVideo: false,
    dataSource: [],
    selectedRowKeys: [3],   // 列表table当前选中信息
    screenLayout: 4
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/video/surveillanceVideo' || location.pathname === '/video/history') {
          const payload = location.query || {current: 1, pageSize: 10};
          dispatch({
            type: 'query', payload: {
              areaId: 'root',
            },
          });
        }
      });
    }
    ,
  }
  ,

  effects: {
    // 查询区域设备信息
    * query({payload}, {call, put, select}) {
      const {resolve} = payload;
      let data = yield call(videoSerice.queryAreaAndDevVid, {areaId: payload.areaId});
      if (data.data) {
        if (payload.areaId === 'root') {
          yield put({
            type: 'updateState',
            payload: {
              treeData: [...data.data.area, ...data.data.device],
              // treeData: groupBy(data,'pid'),
              onSelect: (selectedKeys, info) => {
                console.log('onSelect', info);
              },
            },
          });
        } else {
          let _data = [...data.data.area, ...data.data.device];
          _data.forEach(item => {
            if (!item.countTotal) {
              item['isLeaf'] = true;
            }
          });
          !!resolve && resolve(_data);
        }
      } else {
        message.error(data.message);
      }
    }
    ,
    // 查询巡逻&场景
    * queryPatrol({payload}, {call, put, select}) {
      const res = yield call(videoSerice.queryPatrol, payload);
      if (res.success) {
        switch (payload.yalx) {
          case 2:
            yield put({
              type: 'updateState', payload: {
                patrolList: res.data,
              },
            });
          case 3:
            yield put({
              type: 'updateState', payload: {
                patrolGroup: res.data,
              },
            });
          case 4:
            yield put({
              type: 'updateState', payload: {
                seceneList: res.data,
              },
            });
          case 5:
            yield put({
              type: 'updateState', payload: {
                seceneGroup: res.data,
              },
            });
        }
      }
    }
    ,
    // 查询巡逻&场景下的设备
    * queryCamera({payload}, {call, put, select}) {
      const {resolve} = payload;
      const {patrolList} = yield select(_ => _.video);
      console.log(patrolList, 'treeData');
      const res = yield call(videoSerice.queryCamera, payload);
      if (res.data) {
        !!resolve && resolve(res.data);
      } else {
        message.warning(res.message);
      }
    }
    ,
    // 查询卡口信息
    * queryBayonet({payload}, {call, put, select}) {
      const {resolve} = payload;
      let res = yield  call(videoSerice.queryBayoent, payload);
      if (res.data) {
        if (payload.areaId === 'root') {
          yield put({
            type: 'updateState',
            payload: {
              deviceList1: [...res.data.area, ...res.data.device],
              // treeData: groupBy(data,'pid'),
              onSelect: (selectedKeys, info) => {
                console.log('onSelect', info);
              },
            },
          });
        } else {
          let _data = [...res.data.area, ...res.data.device];
          _data.forEach(item => {
            if (!_data.length) {
              item['isLeaf'] = true;
            }
          });
          !!resolve && resolve(_data);
        }
      } else {
        // // debugger;
        message.warning(res.message);
      }
    }
    ,
    // 搜索设备
    * queryMyDevice({payload}, {call, put, select}) {
      const res = yield call(videoSerice.queryDevice, payload);
      if (res.status) {
        if (payload.areaId === 'root') {
          yield put({
            type: 'updateState',
            payload: {
              treeData: [...res.data.area, ...res.data.device],
              // treeData: groupBy(data,'pid'),
              onSelect: (selectedKeys, info) => {
                console.log('onSelect', info);
              },
            },
          });
        } else {
          let _data = [...res.data.device];
          _data.forEach(item => {
            if (!item.countTotal) {
              item['isLeaf'] = true;
            }
          });
          !!resolve && resolve(_data);
        }
        yield put({
          type: 'updateState',
          treeFlag: false,
        });
      } else {
        message.warning(message);
      }
    }
    ,
  }
  ,

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    }
    ,
    onlineInfo(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
    ,
    offlineInfo(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    toPlayInfo(state, {payload}) {
      debugger
      return {
        ...state,
        ...payload
      }
    }
  }
  ,
}
;
