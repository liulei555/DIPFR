import { stringify } from 'qs';
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';
import config from '../utils/config';

const {api}=config;
const {addRole,queryRole,deleteRoleUrl,editRoleUrl}=api;
export async function queryRoleInfo(payload) {
  return putUtil(queryRole, payload)
}

export async function addRoleReq(payload) {
  return postUtil(addRole,payload);
}

export async function deleteRole(payload) {
  return deleteUtil(deleteRoleUrl,payload);
}

export async function editRole(payload) {
  return putUtil(editRoleUrl,payload);
}
