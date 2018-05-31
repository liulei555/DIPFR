import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';

const {api} = config

/**
 * 查询场景配置的数据
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryScene(params) {
  console.log(params);
  return request(api.configurationSceneUrl, {
    method: 'PUT',
    body: params,
  });
}
/**
 * 查询摄像头
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryCamera(params) {
  return putUtil(api.queryCameraUrl, params);
}
/**
 * 新增场景配置
 * @param params
 * @returns {Promise.<Object>}
 */
export async function create(payload) {
  return postUtil(api.addSceneUrl,payload.data);
}

/**
 * 新增场景组
 * @param payload
 * @returns {Promise.<void>}
 */
export async function createGroup(payload) {
  return postUtil(api.addSceneUrl,payload);
}

/**
 * 更新场景配置
 * @param params
 * @returns {Promise.<Object>}
 */
export async function update(params) {
  return request(api.updateSceneUrl, {
    method: 'PUT',
    body: params,
  });
}

/**
 * 修改场景组
 * @param params
 * @returns {Promise.<Object>}
 */
export async function updateGroup(params) {
  return request(api.updateSceneUrl, {
    method: 'PUT',
    body: params,
  });
}

/**
 * 删除场景配置
 * @param params
 * @returns {Promise.<Object>}
 */
export async function deleteScene(params) {
  console.log(params)
  return deleteUtil(api.deleteSceneUrl,params)
}

/**
 * 区域树的查询
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryTreeCamera(params) {
  return request(api.queryTreeCameraUrl, {
    method: 'PUT',
    body: params,
  });
}

/**
 * 添加配置组得子配置项
 * @param params
 * @returns {Promise.<Object>}
 */
export async function addModalScene(params) {
  console.log(params)
  return postUtil(api.addModalSceneUrl,params);
}



export async function deleteModalScene(params) {
  console.log(params)
  return deleteUtil(api.deleteModalSceneUrl,params);
}


export async function insertCamera(params) {
  console.log(params)
  return postUtil(api.insertCamera,params);
}

export async function updatePlanRelationOrder(params) {
  return putUtil(api.updatePlanRelationOrder,params);
}

