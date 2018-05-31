import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'

const {api} = config

//创建节点
/*const createAddTreeUrl = 'http://172.20.32.77:10001/server-sysmanager/insertAreaInfo'
const deleteAddTreeUrl = 'http://172.20.32.77:10001/server-sysmanager/deleteAreaInfo'*/

export async function queryDevice(params) {
  return request(api.queryDevice, {
    method: 'PUT',
    body: params,
  });
}

export async function queryTree(params) {
  return request(`/api/tree?${stringify(params)}`);
}

//查询整棵区域及视频树，用户系统管理的区域树维护分配设备
export async function queryAreaVid(params) {
    return request(api.queryAreaVid, {
      method: 'PUT',
      body: params,
    });
}
//根据areaId及用户查询下级区域及视频设备列表信息（包含设备数统计）
export async function queryAreaAndDevVid(params) {
  return request(api.queryAreaAndDevVid, {
    method: 'PUT',
    body: params,
  });
}

//根据areaId及用户查询下级区域及卡口设备列表信息
export async function queryAreaAndDevBay(params) {
  return request(api.queryAreaAndDevBay, {
    method: 'PUT',
    body: params,
  });
}

//查询整棵区域及卡口树，用户系统管理的区域树维护分配设备
export async function queryAreaAndDev(params) {
  return request(api.queryAreaAndDev, {
    method: 'PUT',
    body: params,
  });
}

export async function create(params) {//创建节点
  console.log(params);
  /*return request(api.createAreaAndDev, {
    method: 'POST',
    body: params,
  });*/
  return request(api.createAddTreeUrl, {
    method: 'POST',
    body: params,
  });
}

export async function deleteNode(params) {//删除区域节点
  /*return request(api.deleteAreaAndDev, {
    method: 'DELETE',
    body: params,
  });*/
  console.log(params)
  return request(api.deleteAddTreeUrl, {
    method: 'DELETE',
    body: params,
  });
}

export async function bindingVideo(params) {//绑定视频设备
  console.log(3333);
  console.log(params);
  return request(api.bindingAreaAndDev, {
    method: 'PUT',
    body: params,
  });
}
export async function bindingBayonet(params) {//绑定卡口设备
  return request(api.bindingBayonetInfo, {
    method: 'PUT',
    body: params,
  });
}

export async function unbindingBayonet(params) {//解绑卡口设备
  return request(api.unbindingBayonetInfo, {
    method: 'DELETE',
    body: params,
  });
}

export async function unbindingVidnet(params) {//解绑视频设备
  console.log(params);
  return request(api.unbindingVidonetInfo, {
    method: 'DELETE',
    body: params,
  });
}
