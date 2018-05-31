import ipConfig from '../config'

const {
  hasHeader,
  mapUrl,
  ip,
  sip2Ip,
  systemRouter
} = ipConfig


const pageUrl = `http://${ip }:8000`;
const sysmanager = `http://${ip + '/server-sysmanager' }`;
const common = `http://${ip + '/server-common' }`;
const video = `http://${ip + '/server-video' }`;
const alarm = `http://${ip + '/server-control-alarm' }`;
const caseIncident = `/server-case-incident`;
const portraitJudgment = `/server-portrait-judgment`;
// const systemOperation = `/server-system-operation/`; //2014
const systemOperation = `http://172.20.36.36:2014/`; //2014
const gis = `http://${ip + '/server-gis/' }`;
const vehicleJudgment = `/server-vehicle-judgment`;
const fileUpload = `http://${ip + '/zuul/Sys-Operation' }`;

const sip2 = `http://${sip2Ip}/sip2/`

const systemOperationApi = {
  //卡口过车总量
  queryBayonetVehicleCount: `${systemOperation}queryBayonetVehicleCount`,
  //查询卡口过车列表信息
  queryBayonetVehicleList: `${systemOperation}queryBayonetVehicleList`,
  //查询卡口车流量统计信息
  queryVehicleTotalStatistics: `${systemOperation}queryVehicleTotalStatistics`,
}

const gisApi = {
  //根据登录用户所属区域查询该区域下的地图设备数据
  queryMapDevice: `${gis}queryMapDevice`,
}

export default {
  hasHeader:hasHeader,
  pageUrl,
  systemRouter,
  mapUrl,
  Minute: 30,
  api: {
    ...systemOperationApi,
    queryMapDevice: `${gis}queryMapDevice`,
    queryLog: `${common}/queryLogInfo`,
    queryDeviceList: `${sysmanager}/queryMyDevice`,
    updateDeviceList: `${sysmanager}/updateDeviceInfo`,
    // 查询属于自己的设备信息
    queryDevice: `${sysmanager}/queryMyDevice`,
    //查询整棵区域及卡口树，用户系统管理的区域树维护分配设备
    queryAreaAndDev: `${sysmanager}/queryAreaBayByParentId`,
    //查询整棵区域及视频树，用户系统管理的区域树维护分配设备
    queryAreaVid: `${sysmanager}/queryAreaVidByParentId`,
    //根据areaId及用户查询下级区域及卡口设备列表信息
    queryAreaAndBayByParentIdUserId: `${sysmanager}/queryAreaAndBayByParentIdUserId`,
    //根据areaId及用户查询下级区域及视频设备列表信息（包含设备数统计）
    queryAreaAndDevVid: `${sysmanager}/queryAreaAndVidByParentIdUserId`,
    createAreaAndDev: `${sysmanager}/insertAreaInfo`,
    deleteAreaAndDev: `${sysmanager}/deleteAreaInfo`,
    bindingAreaAndDev: `${sysmanager}/areaBindingVideoInfo`,
    bindingBayonetInfo: `${sysmanager}/areaBindingBayonetInfo`,
    unbindingBayonetInfo: `${sysmanager}/areaUnBindingBayonetInfo`,
    unbindingVidonetInfo: `${sysmanager}/areaUnBindingVideoInfo`,
    deviceBindingRoleUrl: `${sysmanager}/deviceBindingRole`,
    //巡逻配置
    queryPatrol: `${sysmanager}/queryPatrolAndScene`,
    addPatrol: `${sysmanager}/insertPatrolAndScene`,
    updatePatrol: `${sysmanager}/updatePatrolAndScene`,
    removePatrol: `${sysmanager}/deletePatrolAndScene`,
    insertCamera: `${sysmanager}/insertCamera`,
    deleteCamera: `${sysmanager}/deleteCamera`,
    updateCameraOrder : `${sysmanager}/updateCameraOrder`,
    //巡逻组和子巡逻配置
    queryPatrolByYABH: `${sysmanager}/queryPatrolAndSceneChildrenByYABH`,
    queryPlanGrepPlan: `${sysmanager}/queryPlanGrepPlan`,
    insertPlanRelation: `${sysmanager}/insertPlanRelation`,
    updatePlanRelationOrder: `${sysmanager}/updatePlanRelationOrder`,
    login: `${sip2}ajaxLogin`,
    logout: `${sip2}ajaxLogout`,
    //获取用户所属的子系统
    findMainOrg: `${sip2}findMainOrg`,
    //查询当前用户登陆信息
    queryUserInfo: `${sip2}findUserOp`,
    //查询用户列表
    queryUserList: `${sip2}user/userAuthList`,
    getAllPower: `${sip2}findResourcePower`,

    //下载控件
    downOcx: `/图侦联网作战平台客户端V1.0--20180321-1.0.1.11.EXE`,

    'addRoleUrl': `${sysmanager}/insertRole`,
    'queryRole': `${sysmanager}/queryRoleInfo`,
    'deleteRoleUrl': `${sysmanager}/deleteRole`,
    'updateRoleUrl': `${sysmanager}/updateRoleInfo`,
    'userBindingRoleUrl': `${sysmanager}/roleBindingUser`,

    //查询智能追踪任务
    queryTrackingTask: `${video}/queryIntelligentTrackingTask`,
    //删除智能追踪任务
    deleteTrackingTask: `${video}/deleteIntelligentTrackingTask`,
    //创建智能追踪任务
    insertTrackingTask: `${video}/insertIntelligentTrackingTask`,
    //查询设备点位信息
    queryPointInfo: `${video}/queryTrackingDeviceInfo`,
    //查询视频分析任务
    queryVideoSearchTask: `${video}/queryVideoSearchTask`,
    //修改视频状态
    updateVideoSearchTask: `${video}/updateVideoSearchTask`,
    //创建视频检索任务
    insertVideoSearchTask: `${video}/insertVideoSearchTask`,
    //布控告警
    queryFaceBlackList: `${alarm}/queryFaceBlackList`,
    insertFaceBlackList: `${alarm}/insertFaceBlackList`,
    deleteFaceBlackList: `${alarm}/deleteFaceBlackList`,
    uploadOneFile: `${fileUpload}/upload`,
    deleteFaceBlackLib: `${alarm}/deleteFaceBlackLib`,
    queryFaceBlackLib: `${alarm}/queryFaceBlackLib`,
    insertFaceBlackLib: `${alarm}/insertFaceBlackLib`,
    exportFaceBlackList: `${alarm}/exportFaceBlackList`,
    batchInsertFaceBlackList: `${alarm}/batchInsertFaceBlackList`,

    //场景配置
    configurationSceneUrl: `${sysmanager}/queryPatrolAndScene`,
    queryCameraUrl: `${sysmanager}/queryCamera`,
    addSceneUrl: `${sysmanager}/insertPatrolAndScene`,
    updateSceneUrl: `${sysmanager}/updatePatrolAndScene`,
    deleteSceneUrl: `${sysmanager}/deletePatrolAndScene`,
    queryTreeCameraUrl: `${sysmanager}/queryAreaAndVidByParentIdUserId`,
    //场景组配置得子配置项
    addModalSceneUrl: `${sysmanager}/insertPlanRelation`,
    deleteModalSceneUrl: `${sysmanager}/deletePlanRelation`,

    //手机串号告警检索
    queryMobileMac: `${alarm}/queryPhoneMac`,
    queryPhoneMacInfo: `${alarm}/queryPhoneMacInfo`,
    updatePhoneMacInfo: `${alarm}/updatePhoneMacInfo`,
    exportPhoneMacList: `${alarm}/exportPhoneMacList`,

    //组织机构
    queryAreaUserByParentIdUrl: `${sysmanager}/queryAreaUserByParentId`,
    userBindingDeviceUrl: `${sysmanager}/areaBindingUserInfo`,
    carBlackLibUrl: `${alarm}/QueryVehiclesblacklibInfos`,
    carBlackUrl: `${alarm}/QueryVehiclesblacklibDetailedInfos`,
    saveCarBlackUrl: `${alarm}/AddVehiclesblacklibInfo`,
    delCarBlackUrl: `${alarm}/DelVehiclesblacklibInfo`,
    saveBlackListUrl: `${alarm}/AddVehiclesblacklibDetailedInfo`,
    delCarBlackListUrl: `${alarm}/DelVehiclesblacklibDetailedInfo`,
    updateBlackListUrl: `${alarm}/UpdateVehiclesblacklibDetailedInfo`,
    queryInfoByIdUrl: `${alarm}/QueryVehiclesblacklibDetailedInfo`,
    batchImportDataUrl: `${alarm}/BatchVehiclesblacklibDetailedInfo`,
    exportListUrl: `${alarm}/exportVehiclesInfo`,
    getVehicleAlarmList: `${alarm}/VIID/DispositionNotifications`,

    queryFaceSchedulingAnalysisDevice: `${sysmanager}/queryFaceSchedulingAnalysisDevice`,
    startFaceSchedulingAnalysis: `${sysmanager}/startFaceSchedulingAnalysis`,
    stopFaceSchedulingAnalysis: `${sysmanager}/stopFaceSchedulingAnalysis`,
    alarmListQuery: `${alarm}/alarmListQuery`,
    alarmListQueryDetail: `${alarm}/alarmListQueryDetail`,

    //布控任务管理
    controlTaskListQueryPageUrl: `${alarm}/controlTaskListQueryPage`,
    createCarDispatchUrl: `${alarm}/insertVehicleControlTask`,
    deleteCarDispatchUrl: `${alarm}/deleteVehicleControlTask`,
    deleteFaceDispatchUrl: `${alarm}/deletePersonControlTask`,
    queryVehiclesblacklibInfosUrl: `${alarm}/QueryVehiclesblacklibInfos`,
    createAddDispatchUrl: `${alarm}/clothControl`,
    cancelControllerUrl: `${alarm}/withdrawalControl`,
    createFaceDispatchUrl: `${alarm}/insertPersonControlTask`,

    //创建区域节点
    createAddTreeUrl: `${sysmanager}/insertAreaInfo`,
    deleteAddTreeUrl: `${sysmanager}/deleteAreaInfo`,

    //视频解析调度
    queryVideoSchedulingAnalysisDevice: `${sysmanager}/queryVideoSchedulingAnalysisDevice
`,
    queryDeviceAreaUrl:`${sysmanager}/queryUnBindingDevice`,

    //查询布控管理的单个黑名单库
    queryCarBlackUrl:`${alarm}/QueryVehiclesblacklibDetailedInfos`,
    queryFaceBlackUrl:`${alarm}/queryFaceBlackList`
  },

}

