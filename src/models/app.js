/* global window */
/* global document */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from '../utils/config'
import {isJSON} from '../utils/utils'
import { logout,getAllPower, findMainOrg, queryUserInfo } from '../services/app'
import *  as queryString from 'query-string'
import session from '../utils/saveStorage/sessionStorage'
import {logOutClean} from '../utils/clean'
import {message} from 'antd'
import { color } from '../utils/theme'
//connection socket
// const socket = io(config.scocketUrl, {
//   //指定后台的url地址
//   //如果需要的话添加 path 路径以及其他可选项
// });


export default {
  namespace: 'app',
  state: {
    user: {},
    menuPopoverVisible: false,
    locationPathname: '',
    locationQuery: {},
    locale:null,
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      //监听 在redux中存入 locationPathname，locationQuery
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup ({ dispatch }) {
      // /dispatch({type:'updateSocket',payload:{}})

      let obj={}
      let currentSystem={}
      typeof (JSON.parse(session.getSession("currentOrg")))==='object'?obj=JSON.parse(session.getSession("currentOrg")):{}
      typeof (JSON.parse(session.getSession("currentSystem")))==='object'?currentSystem=JSON.parse(session.getSession("currentSystem")):{}
      const payload={
        currentOrgItem:obj,
        currentSystemItem:currentSystem,}
      // console.log(payload,'currentSystemItem');

      window.addEventListener("message", function (ev) {
        if (!ev) return;
        if(!isJSON(ev.data)) return
        const data = JSON.parse(ev.data);
        if (!data) return;
        if(data.token){
          session.setSession('token',data.token)
          dispatch({ type: 'query',payload})
        }
        if(data.orgId){
          session.setSession('orgId',data.orgId)
        }
        if(data.user){
          session.setSession('user',data.user)
        }
        if(data.allPower){
          window.localStorage.setItem(`allPower`,data.allPower )
        }

      },false);
      let time = 6
      function doQuery() {
        setTimeout(()=>{
          if(session.getSession('token')) {
            dispatch({ type: 'query',payload})
            return
          } else {
            time--;
            if(!time){
              dispatch(routerRedux.push({pathname:`/user/login`}))
              return
            }
            doQuery()
          }
        },1000)
      }
      doQuery()
    },
  },
  effects: {
    * query ({
               payload,
             }, { call, put, select }) {
      let success = false;
      let user={};
      //判断token是否存在
      if(session.getSession('token')){
        user = {username:session.getSession('user')}
      //  alert(1)
        success = true
        yield put({
          type: 'updateState',
          payload: {
            user: user,
          },
        });
      }else{
        /*判断路径跳回首页*/
        console.log("NO tokrouterRedux.push({\n" +
          "            pathname: '/user/login',\n" +
          "         })en!!!")
        if (location.pathname !== '#/user/login') {
          return  yield put()
        }
      }
      const { locationPathname,locale} = yield select(_ => _.app)
      //登陆成功
      if (success) {
        // 查询当前登陆用户
        let userInfo =  yield call(queryUserInfo);
        session.setSession('userId',userInfo.USERID)
        session.setSession('userName',userInfo.LOGINNAME)
        if (location.pathname === '/user/login') {
          yield put(routerRedux.push({
            pathname: '/index',
          }))
        }
      } else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {//当路径不是菜单中的路径的时候，自动跳转到登录页面
        // yield put(routerRedux.push({
        //   pathname: '/login',
        //   search: queryString.stringify({
        //     from: locationPathname,
        //   }),
        // }))
      }
    },
    * logout ({
                payload,
              }, { call, put }) {
      /*删除session跳转登陆页*/
      logOutClean()
      //需要再次添加一个请求
      yield call(logout)
      yield put(routerRedux.push({
        pathname: '/user/login',
      }))
    },


  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    'infoCount'(state,{payload:{datas}}){
      state.numbers[0].number=datas['appCount']
      state.numbers[1].number=datas['roleCount']
      state.numbers[2].number=datas['userCount']
      state.numbers[3].number=datas['sysCount']
      return  Object.assign({}, state,state);
    },
    updateSocket(state,{payload}){
      window.addEventListener("allPower", function (ev) {
        if (!ev) return;
        window.localStorage.setItem(`allPower`, JSON.stringify(msg.data))
      });
      return{...state,...payload}
    }
  },
}
