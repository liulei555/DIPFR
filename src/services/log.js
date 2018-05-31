import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'

const { api } = config

export async function query(params) {
  return request(api.queryLog, {
    method: 'PUT',
    body: params,
  });
}
