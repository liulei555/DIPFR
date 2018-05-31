import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';
import config from '../utils/config';
const {api}=config;
export async function queryPatrol(payload) {
	return putUtil(api.queryPatrol,payload);
}


export async function queryPlanGrepPlan(payload) {
	return putUtil(api.queryPlanGrepPlan,payload);
}

export async function queryCamera(payload) {
	return putUtil(api.queryCameraUrl,payload);
}

export async function queryAreaVidByParentId(payload) {
	return putUtil(api.queryAreaVid,payload);
}

export async function create(payload) {
	return postUtil(api.addPatrol,payload);
}

export async function update(payload) {
	return putUtil(api.updatePatrol,payload);
}

export async function removePatrol(payload) {
	return deleteUtil(api.removePatrol,payload);
}

export async function queryPatrolByYABH(payload) {
	return putUtil(api.queryPatrolByYABH,payload);
}

export async function insertPlanRelation(payload) {
	return postUtil(api.insertPlanRelation,payload);
}

export async function deletePlanRelation(payload) {
	return deleteUtil(api.deleteModalSceneUrl,payload);
}

export async function updatePlanRelationOrder(payload) {
	return putUtil(api.updatePlanRelationOrder,payload);
}

export async function insertCamera(payload) {
  console.log(payload);
	return postUtil(api.insertCamera,payload);
}

export async function deleteCamera(payload) {
  console.log(payload);
  return deleteUtil(api.deleteCamera,payload);
}

export async function queryMyDevice(payload) {
	return putUtil(api.queryDeviceList,payload);
}

export async function updateCameraOrder(payload) {
  return putUtil(api.updateCameraOrder, payload);
}
