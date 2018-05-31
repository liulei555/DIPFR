import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'


const { api } = config

export async function query(params) {
  return request(api.queryDeviceList, {
    method: 'PUT',
    body: params,
  });
}
export async function create (params) {
  console.log(params);
  return request(api.updateDeviceList, {
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body:params.data
  });
}
