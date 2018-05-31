import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';
/*
const controlTaskListQueryPageUrl='http://172.20.32.77:10001/server-control-alarm/controlTaskListQueryPage'
const createCarDispatchUrl='http://172.20.32.77:10001/server-control-alarm/insertVehicleControlTask'

const deleteCarDispatchUrl='http://172.20.32.77:10001/server-control-alarm/deleteVehicleControlTask'

const deleteFaceDispatchUrl='http://172.20.32.77:10001/server-control-alarm/deletePersonControlTask'

const carBlackUrl='http://172.20.32.77:10001/server-control-alarm/QueryVehiclesblacklibInfos'

const createAddDispatchUrl = 'http://172.20.32.77:10001/server-control-alarm/clothControl'

const cancelControllerUrl = 'http://172.20.32.77:10001/server-control-alarm/withdrawalControl'

const createFaceDispatchUrl = 'http://172.20.32.77:10001/server-control-alarm/insertPersonControlTask'
*/
const cancelControllerUrl = 'http://172.20.32.77:10001/server-control-alarm/withdrawalControl'
const carBlackUrl='http://172.20.32.77:10001/server-control-alarm/QueryVehiclesblacklibInfos'
const {api} = config
/**
 * 查询布控管理的数据
 * @param params
 * @returns {Promise.<Object>}
 */
export async function query(params) {
  console.log(params)
  return request(api.controlTaskListQueryPageUrl, {
    method: 'PUT',
    body: params,
  });
  //return putUtil(controlTaskListQueryPageUrl,params);
}

/**
 * 新增车辆布控
 * @param params
 * @returns {Promise.<void>}
 */
export async function createDispatch(params) {
  console.log(params);
  //return postUtil(createCarDispatchUrl,payload);
  return request(api.createCarDispatchUrl,{
    method: 'POST',
    body: params,
  });
}

export async function createFaceDispatch(params) {
  console.log(params);
  //return postUtil(createCarDispatchUrl,payload);
  return request(api.createFaceDispatchUrl,{
    method: 'POST',
    body: params,
  });
}

/**
 * 删除车辆布控
 * @param params
 * @returns {Promise.<Object>}
 */
export async function deleteCarDispatch(params) {
  console.log(params);
  return request(api.deleteCarDispatchUrl,{
    method: 'POST',
    body: params,
  });
}

/**
 * 删除人脸布控
 * @param params
 * @returns {Promise.<Object>}
 */
export async function deleteFaceDispatch(params) {
  console.log(params);
  return request(api.deleteFaceDispatchUrl,{
    method: 'POST',
    body: params,
  });
}

export async function blacklist(params) {
  console.log(params)
  return request(api.queryVehiclesblacklibInfosUrl, {
    method: 'PUT',
    body: params,
  });
}

/**
 * 布控
 * @param params
 * @returns {Promise.<Object>}
 */
export async function createAddDispatch(params) {
  console.log(params);
  return request(api.createAddDispatchUrl,{
    method: 'POST',
    body: params,
  });
}

/**
 * 撤控方法
 * @param params
 * @returns {Promise.<Object>}
 */
export async function cancelController(params) {
  console.log(params);
  return request(api.cancelControllerUrl,{
    method: 'POST',
    body: params,
  });
}

/**
 * 查询单个黑名单库
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryCarBlack(params) {
  console.log(params);
  return request(api.queryCarBlackUrl, {
    method: 'PUT',
    body: params,
  });
}

/**
 * 查询单个黑名单人脸信息
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryFaceBlack(params) {
  console.log(params);
  return request(api.queryFaceBlackUrl, {
    method: 'PUT',
    body: params,
  });
}

