import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'

const {api} = config

export async function queryDevice(params) {
  return request(api.queryDevice, {
    method: 'PUT',
    body: params,
  });
}

export async function queryTree(params) {
  return request(`/api/tree?${stringify(params)}`);
}

export async function queryAreaAndDev(params) {
  return request(api.queryAreaAndDev, {
    method: 'PUT',
    body: params,
  });
}
