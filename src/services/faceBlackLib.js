import request from '../utils/request';
import config from '../utils/config';
const { api } = config;

export async function queryFaceBlackList(params) {
  return request(api.queryFaceBlackList, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteFaceBlackList(params) {
  return request(api.deleteFaceBlackList, {
    method: 'DELETE',
    body: params,
  });
}

export async function insertFaceBlackList(params) {
  return request(api.insertFaceBlackList, {
    method: 'POST',
    body: params,
  });
}

export async function queryFaceBlackLib(params) {
  return request(api.queryFaceBlackLib, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteFaceBlackLib(params) {
  return request(api.deleteFaceBlackLib, {
    method: 'DELETE',
    body: params,
  });
}

export async function insertFaceBlackLib(params) {
  return request(api.insertFaceBlackLib, {
    method: 'POST',
    body: params,
  });
}

export async function exportFaceBlackList(params) {
  return request(api.exportFaceBlackList, {
    method: 'POST',
    body: params,
  });
}

export async function batchInsertFaceBlackList(params) {
  return request(api.batchInsertFaceBlackList, {
    method: 'POST',
    body: params,
  });
}
