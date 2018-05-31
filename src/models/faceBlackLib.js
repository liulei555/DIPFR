/**
 * 功能描述：人脸黑名单库
 * 2018.05.09
 * 作者：xiongmeng
 */
import {
  queryFaceBlackList,
  deleteFaceBlackList,
  insertFaceBlackList,
  queryFaceBlackLib,
  deleteFaceBlackLib,
  insertFaceBlackLib,
  exportFaceBlackList,
  batchInsertFaceBlackList,
} from '../services/faceBlackLib';
import config from '../config';
import { message } from 'antd';

export default {
  namespace: 'faceBlackLib',

  state: {
    blackLibTitle: '',
    blackLibList: [],
    selectedLib: [],
    blackLibVisible: false,
    singleBlackVisible: false,
    batchBlackVisible: false,
    blackList: [],
    searchForm: {},
    pagination: {
      showTotal: total => `共 ${total} 条结果`,
      current: 1,
      pageSize: 12,
      total: 0,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/dispatched/faceBlackLib') {
          dispatch({
            type: 'queryBlackLib',
            payload: { pageNum: '1', pageSize: '9999' },
          });
        }
      });
    },
  },

  effects: {

    * queryBlackLib({ payload }, { call, put }) {
      const res = yield call(queryFaceBlackLib, payload);

      if (res.status === '1' && res.data.length > 0) {
        yield put({
          type: 'updateState',
          payload: {
            blackLibList: res.data,
            blackLibVisible: false,
            blackLibTitle: '',
            selectedLib: [],
            blackList: [],
          },
        });
      }
    },

    * insertBlackLib({ payload }, { call, put }) {
      const res = yield call(insertFaceBlackLib, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryBlackLib',
          payload: { pageNum: '1', pageSize: '9999' },
        });
      } else {
        message.error( (res && res.message) || '添加失败');
      }
    },

    * deleteBlackLib({ payload }, { call, put }) {
      const res = yield call(deleteFaceBlackLib, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryBlackLib',
          payload: { pageNum: '1', pageSize: '9999' },
        });
      } else {
        message.error( (res && res.message) || '删除失败');
      }
    },

    * queryBlackList({ payload }, { call, put, select }) {

      const { pagination, searchForm, selectedLib } = yield select(_ => _.faceBlackLib);
      const res = yield call(queryFaceBlackList, payload);

      const { personName, personSex, personCertificateNum } = payload;

      let form = payload.personId === selectedLib[0] ? {
        ...searchForm,
        personName,
        personSex,
        personCertificateNum,
      } : {};

      if (res && res.status === '1') {
        yield put({
          type: 'updateState',
          payload: {
            blackList: res.data.map((o) => ({ ...o, check: false })),
            selectedLib: [payload.personId],
            blackLibTitle: payload.title,
            pagination: {
              ...pagination,
              current: Number(payload.pageNum) || 1,
              total: res.total,
            },
            searchForm: form,
            singleBlackVisible: false,
            batchBlackVisible: false,
          },
        });
      }
    },

    * insertBlackList({ payload }, { call, put, select }) {

      const { selectedLib, blackLibTitle } = yield select(_ => _.faceBlackLib);
      const res = yield call(insertFaceBlackList, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryBlackList',
          payload: {
            personId: selectedLib[0],
            title: blackLibTitle,
            pageNum: '1',
            pageSize: '12',
          },
        });
      } else {
        message.error( (res && res.message) || '添加失败');
      }
    },

    * deleteBlackList({ payload }, { call, put, select }) {

      const { selectedLib, blackLibTitle } = yield select(_ => _.faceBlackLib);
      const res = yield call(deleteFaceBlackList, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryBlackList',
          payload: {
            personId: selectedLib[0],
            title: blackLibTitle,
            pageNum: '1',
            pageSize: '12',
          },
        });
      } else {
        message.error( (res && res.message) || '删除失败');
      }
    },

    * exportBlackList({ payload }, { call, put }) {

      const res = yield call(exportFaceBlackList, payload);

      if (res && res.status === '1') {
        let url = config.imgIp + res.data.replace('/home','');
        let $form = document.createElement('form');
        $form.setAttribute('method', 'GET');
        $form.setAttribute('action', url);
        document.body.appendChild($form);
        $form.submit();
      }
    },

    * batchInsertBlackList({ payload }, { call, put, select }) {

      const { selectedLib, blackLibTitle } = yield select(_ => _.faceBlackLib);
      const res = yield call(batchInsertFaceBlackList, payload);

      if (res && res.data === 1) {
        yield put({
          type: 'queryBlackList',
          payload: {
            personId: selectedLib[0],
            title: blackLibTitle,
            pageNum: '1',
            pageSize: '12',
          },
        });
      } else {
        message.error( (res && res.message) || '导入失败');
      }
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
