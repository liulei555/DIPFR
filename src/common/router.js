import {createElement} from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import {getMenuData} from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({namespace}) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = {...item};
      keys = {...keys, ...getFlatMenuData(item.children)};
    } else {
      keys[item.path] = {...item};
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/index': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/Home')
      ),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    '/map': {
      component: dynamicWrapper(app, ['action'], () => import('../routes/Action/Action')),
    },
    '/actionMap': {
      component: dynamicWrapper(app, ['actionMap'], () => import('../routes/Action/ActionMap')),
    },
    '/sheBei/xingZhengSheBei': {
      component: dynamicWrapper(app, ['xingZhengSheBei'], () =>
        import('../routes/SheBei/XingZhengSheBei')
      ),
    },
    //设备与角色绑定
    '/systemAdmin/roleBindDevice': {
      component: dynamicWrapper(app, ['roleBindDevice'], () => import('../routes/SystemAdmin/RoleBindDevice')),
    },
    '/video/surveillanceVideo': {
      component: dynamicWrapper(app, ['video', 'patrol'], () => import('../routes/Video')),
    },
    //角色管理
    '/systemAdmin/roleManage': {
      component: dynamicWrapper(app, ['roleManage'], () => import('../routes/SystemAdmin/RoleManage'))
    },
    //操作日志
    '/systemOperation/log': {
      component: dynamicWrapper(app, ['log'], () =>
        import('../routes/SystemOperation/Log')
      ),
    },
    //设备信息
    '/systemOperation/deviceInfo': {
      component: dynamicWrapper(app, ['deviceInfo'], () =>
        import('../routes/SystemOperation/DeviceInfo')
      ),
    },
    //行政区域设备
    '/systemOperation/areaDevice': {
      component: dynamicWrapper(app, ['areaDevice'], () =>
        import('../routes/SystemOperation/AreaDevice')
      ),
    },
    '/video/geographicInfo': {
      component: dynamicWrapper(app, ['geographicInfo'], () =>
        import('../routes/Video/GeographicInfo')
      ),
    },

    //行政区域卡口管理
    '/systemOperation/areaBayonet': {
      component: dynamicWrapper(app, ['bayonetDevice'], () =>
        import('../routes/SystemOperation/AreaBayonet')
      ),
    },
    //智能追踪任务
    '/video/trackingTool': {
      component: dynamicWrapper(app, ['trackingTool'], () =>
        import('../routes/Intelligent/TrackingTool')
      ),
    },
    //视频检索
    '/video/videoRetrieval': {
      component: dynamicWrapper(app, ['videoRetrieval'], () =>
        import('../routes/Intelligent/VideoRetrieval')
      ),
    },
    // 工作台 个人中心
    '/bench/myCenter': {
      component: dynamicWrapper(app, ['bench'], () => import('../routes/Bench'))
    },
    // 工作台  第二屏地图
    '/bench/benchMap': {
      component: dynamicWrapper(app, [], () => import('../routes/Bench/BenchMap'))
    },
    '/case/link': {
      component: dynamicWrapper(app, [], () => import('../routes/Case/Link'))
    },
    //视频库
    '/videoLibrary/acc': {
      component: dynamicWrapper(app, [], () => import('../routes/VideoLibrary/Acc'))
    },
	  //人员库查询
	  '/videoLibrary/person':{
		  component:dynamicWrapper(app,[],()=>import('../routes/VideoLibrary/Person'))
	  },
	  //机动车辆库
	  '/videoLibrary/vehicle':{
		  component:dynamicWrapper(app,[],()=>import('../routes/VideoLibrary/Vehicle'))
	  },
	  //人脸库
	  '/videoLibrary/face':{
		  component:dynamicWrapper(app,[],()=>import('../routes/VideoLibrary/Face'))
	  },
	  //巡逻配置
    '/systemAdmin/patrolConf':{
	  component:dynamicWrapper(app,['patrolConf'],()=>import('../routes/SystemAdmin/PatrolConf'))
    },
	  //巡逻组配置
	  '/systemAdmin/patrolGroupConf':{
		  component:dynamicWrapper(app,['patrolGroupConf'],()=>import('../routes/SystemAdmin/PatrolGroupConf'))
	  },
    '/systemAdmin/orgConfiguration':{
      component:dynamicWrapper(app,['orgConfiguration'],()=>import('../routes/SystemAdmin/OrgConfiguration'))
    },

    //场景配置
    '/systemAdmin/configurationScene':{
      component:dynamicWrapper(app,['configurationScene'],()=>import('../routes/SystemAdmin/ConfigurationScene'))
    },
    //权限 demo
    '/test':{
      component:dynamicWrapper(app,['sample'],()=>import('../routes/Test'))
    },
    //车辆布控
    '/dispatched/vehicleAlarm':{
      component:dynamicWrapper(app,['vehicleAlarms'],()=>import('../routes/VehicleAlarm'))
    },
	  //手机Mac布控报警检索
	  '/dispatched/mobileMac':{
		  component:dynamicWrapper(app,['mobileMac'],()=>import('../routes/MobileMac'))
	  },
    //人脸黑名单库
    '/dispatched/faceBlackLib': {
      component: dynamicWrapper(app, ['faceBlackLib','dispatchManagement'], () =>
        import('../routes/FaceBlackLib')
      ),
    },
    //人脸黑名单告警
    '/dispatched/faceAlarm': {
      component: dynamicWrapper(app, ['faceAlarm'], () =>
        import('../routes/FaceAlarm')
      ),
    },
    //人脸黑名单告警
    '/dispatched/alarmCenter': {
      component: dynamicWrapper(app, ['alarmCenter'], () =>
        import('../routes/AlarmCenter')
      ),
    },
    '/systemAdmin/configurationGroupScene': {
      component: dynamicWrapper(app, ['configurationGroupScene'], () => import('../routes/SystemAdmin/ConfigurationGroupScene'))
    },
    //车辆黑名单布控

    '/dispatched/carBlackLib':{
      component: dynamicWrapper(app, ['carBlackLib','dispatchManagement'], () => import('../routes/CarBlackLib'))
    },
    '/video/history': {
      component: dynamicWrapper(app, ['video', 'videoHistory'], () => import('../routes/Video/History'))
    },
    '/dispatched/disManagement': {
      component: dynamicWrapper(app, ['dispatchManagement'], () => import('../routes/DispatchManagement'))
    },
    '/video/taskMonitor': {
      component: dynamicWrapper(app, ['video', 'taskMonitor'], () => import('../routes/Video/TaskMonitor'))
    },
    '/kakou': {
      component: dynamicWrapper(app, [], () => import('../routes/Kakou'))
    },
    //时空分析
	  '/spaceTime/oneToNIdentification':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/OneToNIdentification'))
	  },
	  '/spaceTime/personFrequency':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/PersonFrequency'))
	  },
	  '/spaceTime/personTrajectory':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/PersonTrajectory'))
	  },
	  '/spaceTime/alarmQuery':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/AlarmQuery'))
	  },
	  '/spaceTime/captureQuery':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/CaptureQuery'))
	  },
	  '/spaceTime/faceCapture':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/FaceCapture'))
	  },
	  '/spaceTime/faceBuildTask':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/FaceBuildTask'))
	  },
	  '/spaceTime/faceLib':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/FaceLib'))
	  },
	  '/spaceTime/faceSearchDependPic':{
		  component: dynamicWrapper(app, [], () => import('../routes/SpaceTime/FaceSearchDependPic'))
	  },
    //人脸解析调度
    '/FaceParsingSch':{
      component: dynamicWrapper(app, ['faceParseSch'], () => import('../routes/FaceParsingSch'))
    },
    //Video analytics scheduling
    '/videoAnalyticsSch':{
      component: dynamicWrapper(app, ['videoAnalyticsSch'], () => import('../routes/VideoAnalyticsSch'))
    },
    //案事件线索数量统计
    '/dataStatistic/caseStatistic': {
      component: dynamicWrapper(app, ['caseStatistic'], () =>
        import('../routes/DataStatistic/CaseStatistic')
      ),
    },//案事件线索数量统计
    '/dataStatistic/carStatistic': {
      component: dynamicWrapper(app, ['carStatistic'], () =>
        import('../routes/DataStatistic/CarStatistic')
      ),
    },
  };

  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
