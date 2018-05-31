import request from '../utils/request';
import config from '../utils/config';
const { api } = config;

export async function queryTrackingTask(params) {
  return request(api.queryTrackingTask, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteTrackingTask(params) {
  return request(api.deleteTrackingTask, {
    method: 'DELETE',
    body: params,
  });
}

export async function queryPointInfo(params) {
  return request(api.queryPointInfo, {
    method: 'PUT',
    body: params,
  });
}

export async function updateVideoSearchTask(params) {
  return request(api.updateVideoSearchTask, {
    method: 'PUT',
    body: params,
  });
}

export async function insertTrackingTask(params) {
  return request(api.insertTrackingTask, {
    method: 'POST',
    body: params,
  });
}
