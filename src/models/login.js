import { routerRedux } from 'dva/router';
import { login } from '../services/login';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import session from '../utils/saveStorage/sessionStorage';
import config from '../utils/config';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/login' || pathname === '/') {
          sessionStorage.clear();
          localStorage.clear();
        }
      })
    },
  },

  effects: {
    * login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      // Login sccessfully
      if (res.result) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'success',
            username: 'user',
          },
        });
        console.log(res.authorization);
        console.log(typeof res.authorization);
        session.setSession('displayWay', payload.displayWay);
        session.setSession('token', res.authorization);
        session.setSession('user', res.username);
        session.setSession('usertime', new Date().getTime());
        yield put({ type: 'app/query' });
        yield put(routerRedux.push('/index'));
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            username: null,
          },
        });
      }
    },

  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.username);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
