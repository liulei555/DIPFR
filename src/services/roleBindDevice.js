import { stringify } from 'qs';
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';
import config from '../utils/config';

const {api}=config;

export async function queryRoleList(payload) {
  return putUtil(api.queryRole, payload)
}

export async function addRole(payload) {
  return postUtil(api.addRoleUrl,payload);
}

export async function deleteRole(payload) {
  return deleteUtil(api.deleteRoleUrl,payload);
}

export async function updateRole(payload) {
  console.log(payload)
  return putUtil(api.updateRoleUrl,payload);
}

export async function bindingRole(payload) {
  return putUtil(api.deviceBindingRoleUrl,payload);
}
