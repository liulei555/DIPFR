import {getCurPowers}from '../utils/index'
import config from '../utils/config'
//const {systemRouter} = config
export default {
  namespace: 'sample',
  state: {
    list: [],
    currentUser: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log(location)
      history.listen(location => {

        if(location.pathname === '/test'){
          //查找当前菜单的权限有哪些
          let curPowers = getCurPowers(config.systemRouter+location.pathname)
          console.log(curPowers)
          if(curPowers){
            dispatch({ type: 'updateState', payload: { curPowers } })
          }
        }
      })

    },
  },
  effects: {
  },
  reducers: {
    updateState(state,action){
      return {...state,...action.payload}
    }
  },
};
