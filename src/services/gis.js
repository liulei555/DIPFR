import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'

const { api } = config

export async function queryMapDevice(params) {
  return request(api.queryMapDevice, {
    method: 'PUT',
    body: params,
  });
}

