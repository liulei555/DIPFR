import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';
const { api } = config

export async function queryCarBlackLib(params) {
  return request(api.carBlackLibUrl, {
    method: 'PUT',
    body: params,
  });
}
export async function queryCarBlackList(payload) {
  return putUtil(api.carBlackUrl,payload);
}
//add
export async function saveBlackLib(payload) {
  return postUtil(api.saveCarBlackUrl,payload);
}
//库
export async function deleteItem(payload) {
  return deleteUtil(api.delCarBlackUrl,payload);
}
//明细
export async function deleteItemList(payload) {
  return deleteUtil(api.delCarBlackListUrl,payload);
}
//保存黑名单信息
export async function saveBlackList(payload) {
  return postUtil(api.saveBlackListUrl,payload);
}
//更新黑名单
export async function updateBlackList(payload) {
  return putUtil(api.updateBlackListUrl,payload);
}

/**
 * 通过Id 查询
 * @param payload
 */
export async function queryInfoById(payload) {
  console.log(api.queryInfoByIdUrl+"/"+payload)
  return putUtil(api.queryInfoByIdUrl+"/"+payload);
}

/**
 * 批量导入数据
 * @param payload
 */
export async function batchImportData(payload) {
  return postUtil(api.batchImportDataUrl,payload);
}

//导出
export async function exportList(payload) {
  return postUtil(api.exportListUrl,payload);
}

