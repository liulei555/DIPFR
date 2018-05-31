import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';

const {api} = config

/*const addRoleUrl =  'http://172.20.32.77:10001/server-sysmanager/insertRole'
const updateRoleUrl =  'http://172.20.32.77:10001/server-sysmanager/updateRoleInfo'*/

export async function findMainOrg(params) {
  return request(`${api.findMainOrg}?${stringify(params)}`);
}

export async function queryUserList(params) {
  return request(`${api.queryUserList}?${stringify(params)}`);
}


export async function addRole(payload) {
  //return postUtil(api.addRole,payload);
  return postUtil(api.addRoleUrl,payload);
}

export async function deleteRole(payload) {
  return deleteUtil(api.deleteRoleUrl,payload);
}

export async function updateRole(payload) {
  /*return putUtil(api.updateRoleUrl,payload);*/
  return putUtil(api.updateRoleUrl,payload);
}

export async function bindingRole(payload) {
  console.log(payload);
  return putUtil(api.userBindingRoleUrl,payload);
}
