import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';

const {api} = config


export async function queryAreaByUser(params) {
  return request(api.queryAreaUserByParentIdUrl, {
    method: 'PUT',
    body: params,
  });
}

/**
 * 给区域树绑定设备
 * @param payload
 * @returns {Promise.<void>}
 */
export async function bindingUser(payload) {
  return putUtil(api.userBindingDeviceUrl,payload);
}
