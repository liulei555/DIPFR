import request from '../utils/request';
import config from '../utils/config';
const { api } = config;

export async function queryVideoTask(params) {
  return request(api.queryVideoSearchTask, {
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

export async function insertVideoSearchTask(params) {
  return request(api.insertVideoSearchTask, {
    method: 'POST',
    body: params,
  });
}
