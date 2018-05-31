import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'

const {api} = config

export async function logout(params) {
  return request(`${api.logout}?${stringify(params)}`);
}
export async function getAllPower(params) {
  return request(`${api.getAllPower}?${stringify(params)}`);
}

export async function findMainOrg(params) {
  return request(`${api.findMainOrg}?${stringify(params)}`);
}

export async function queryUserInfo(params) {
  return request(`${api.queryUserInfo}?${stringify(params)}`);
}
