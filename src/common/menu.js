import {isUrl} from '../utils/utils';

const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let {path} = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);

export const headMenu = [
  {
    key: 0,
    path: '/index',
    name: '首页',
  },
  {
    key: 1,
    path: '/video/geographicInfo',
    name: '视频综合应用',
  }, {
    key: 2,
    path: '',
    name: '车辆研判',
  }, {
    key: 3,
    path: '',
    name: '人像研判',
  }, {
    key: 4,
    path: '/case/link',
    name: '案件线索研判',
  }, {
    key: 5,
    path: '/systemOperation/log',
    name: '系统运维',
  }, {
    key: 6,
    path: '/systemAdmin/roleManage',
    name: '系统管理',
  },{
	key: 7,
	path:'/videoLibrary/acc',
	name: '视图库',
	},
  {
 key: 8,
	path:'/dispatched/vehicleAlarm',
	name: '布控告警',
	},
	{
		key: 9,
		path:'/spaceTime/oneToNIdentification',
		name: '时空分析',
	},
	{
		key: 10,
		path:'/dataStatistic/caseStatistic',
		name: '数据统计',
	}
]

export const headhildMenu = {
  video: [
    {
      key: '/video/geographicInfo',
      path:'/video/geographicInfo',
      name: '地理信息',
    },
    {
      key: '0',
      path: '/video/surveillanceVideo',
      name: '实时监控',
    },
    {
      key: '1',
      path: '/video/surveillanceVideo',
      name: '单点监控',
    }, {
      key: '2',
      path: '/video/guard',
      name: '警卫监控',
    }, {
      key: '3',
      path: '/video/history',
      name: '历史回放',
    }, {
      key: '41',
      path: '/video/trackingTool',
      name: '接力追踪工具',
    },{
      key: '5',
      path:'/video/videoRetrieval',
      name: '视频浓缩摘要',
    },{
      key: '6',
      path:'/video/taskMonitor',
      name: '任务监控',
    },
  ],
  car: [],
  people: [
    {
      key: '1',
      path: '',
      name: '人脸建库管理',
    }, {
      key: '2',
      path: '',
      name: '动态人脸',
    }, {
      key: '3',
      path: '',
      name: '静态人脸',
    }, {
      key: '4',
      path: '',
      name: '行人检索',
    },
  ],
  case: [
    {
      key: '1',
      path: '',
      name: '案件库',
    }, {
      key: '2',
      path: '',
      name: '线索库',
    }, {
      key: '3',
      path: '',
      name: '视频缓冲库',
    }, {
      key: '4',
      path: '',
      name: '我的案件',
    },
  ],
  systemOperation: [
    {
      key: '/systemOperation/log',
      path: '/systemOperation/log',
      name: '日志管理',
    }, {
      key: '/systemOperation/deviceInfo',
      path: '/systemOperation/deviceInfo',
      name: '设备在线编辑',
    }, {
      key: '/systemOperation/areaDevice',
      path: '/systemOperation/areaDevice',
      name: '行政区域设备管理',
    }, {
      key: '/systemOperation/areaBayonet',
      path: '/systemOperation/areaBayonet',
      name: '行政区域卡口管理',
    }, {
      key: '3',
      path: '',
      name: '视频卡口统计',
    }, {
      key: '/systemOperation/areaEquipment',
      path: '/systemOperation/areaEquipment',
      name: '设备授权',
    },
  ],
  systemAdmin: [
    {
      key: '1',
      path: '',
      name: '业务配置',
    },
    {
      key: '2',
      path: '',
      name: '系统配置',
    }, {
      key: '3',
      path: '',
      name: '信息推送配置',
    }, {
      key: '/systemAdmin/roleManagement',
      path: '/systemAdmin/roleManagement',
      name: '用户配置',
    }, {
      key: '/systemAdmin/roleManage',
      path: '/systemAdmin/roleManage',
      name: '角色配置',
    }, {
      key: '/systemAdmin/orgConfiguration',
      path: '/systemAdmin/orgConfiguration',
      name: '区域绑定用户',
    }, {
      key: '/systemAdmin/roleBindDevice',
      path: '/systemAdmin/roleBindDevice',
      name: '角色绑定设备',
    },
	  {
		  key: '/systemAdmin/patrolConf',
		  path:'/systemAdmin/patrolConf',
		  name: '巡逻配置',
	  },
	  {
		  key: '/systemAdmin/patrolGroupConf',
		  path:'/systemAdmin/patrolGroupConf',
		  name: '巡逻组配置',
	  },
	  {
		  key: '/systemAdmin/configurationScene',
		  path: '/systemAdmin/configurationScene',
		  name: '场景配置',
	  },
    {
      key: '/systemAdmin/configurationGroupScene',
      path: '/systemAdmin/configurationGroupScene',
      name: '场景组配置',
    },
  ],
  videoLibrary:[
	{
		key: '1',
		path:'/videoLibrary/acc',
		name: 'acc',
	},
	  {
		  key: '2',
		  path:'/videoLibrary/person',
		  name: '人员库',
	  },
	  {
		  key: '3',
		  path:'/videoLibrary/vehicle',
		  name: '机动车辆库',
	  },
	  {
		  key: '4',
		  path:'/videoLibrary/face',
		  name: '人脸库',
	  },
  ],
  dispatchedAlarm:[
    {
    key: '/dispatched/vehicleAlarm',
    path:'/dispatched/vehicleAlarm',
    name: '车辆告警',
    },
	  {
		  key: '/dispatched/mobileMac',
		  path:'/dispatched/mobileMac',
		  name: '手机串号报警检索',
	  },{
      key: '/dispatched/faceBlackLib',
      path:'/dispatched/faceBlackLib',
      name: '人脸黑名单库',
    },{
      key: '/dispatched/carBlackLib',
      path:'/dispatched/carBlackLib',
      name: '车辆黑名单库',
    },
    {
      key: '/dispatched/disManagement',
      path:'/dispatched/disManagement',
      name: '布控任务管理',
    },
    {
      key: '/dispatched/faceAlarm',
      path:'/dispatched/faceAlarm',
      name: '人脸告警',
    },
    {
      key: '/dispatched/alarmCenter',
      path:'/dispatched/alarmCenter',
      name: '告警中心',
    }
  ],
	spaceTime:[
		{
			key: '/spaceTime/oneToNIdentification',
			path:'/spaceTime/oneToNIdentification',
			name: '1:N身份识别',
		},
		{
			key: '/spaceTime/personFrequency',
			path:'/spaceTime/personFrequency',
			name: '人员频次',
		},
		{
			key: '/spaceTime/personTrajectory',
			path:'/spaceTime/personTrajectory',
			name: '人员轨迹',
		},
		{
			key: '/spaceTime/alarmQuery',
			path:'/spaceTime/alarmQuery',
			name: '人脸报警查询',
		},
		{
			key: '/spaceTime/captureQuery',
			path:'/spaceTime/captureQuery',
			name: '人脸抓拍查询',
		},
		{
			key: '/spaceTime/faceCapture',
			path:'/spaceTime/faceCapture',
			name: '人脸实时抓拍',
		},
		{
			key: '/spaceTime/faceBuildTask',
			path:'/spaceTime/faceBuildTask',
			name: '布控任务创建',
		},
		{
			key: '/spaceTime/faceLib',
			path:'/spaceTime/faceLib',
			name: '人像库创建',
		},
		{
			key: '/spaceTime/faceSearchDependPic',
			path:'/spaceTime/faceSearchDependPic',
			name: '智能搜脸',
		},
    {
      key: '/FaceParsingSch',
      path:'/FaceParsingSch',
      name: '人脸动态调度',
    },
    {
      key: '/videoAnalyticsSch',
      path:'/videoAnalyticsSch',
      name: '视频解析调度',
    },
	],
  dataStatistic: [
    {
      key: '/dataStatistic/caseStatistic',
      path:'/dataStatistic/caseStatistic',
      name: '案事件线索数量统计',
    },
    {
      key: '/dataStatistic/carStatistic',
      path:'/dataStatistic/carStatistic',
      name: '车辆统计',
    }
  ]
}
