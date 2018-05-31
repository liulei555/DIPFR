import { stringify } from 'qs';
import { getUtil, postUtil, putUtil } from '../utils/request/request';
import request from '../utils/request';
import config from '../utils/config';

const { api } = config;

export async function queryPatrolAndScene(payload) {
  return putUtil(api.queryTreeCameraUrl, payload);
}

export async function queryPatrol(payload) {
  return putUtil(api.queryPatrol, payload);
}

export async function queryAreaAndDevVid(payload) {
  return putUtil(api.queryAreaAndDevVid, payload);
}

export async function queryBayoent(payload) {
  return putUtil(api.queryAreaAndBayByParentIdUserId, payload);
}

export async function queryCamera(payload) {
  return putUtil(api.queryCameraUrl, payload);
}

export async function queryDevice(payload) {
  // debugger;
  return putUtil(api.queryMyDevice, payload);
}

