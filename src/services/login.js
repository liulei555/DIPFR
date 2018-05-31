import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'

const {api} = config

export async function login(params) {
  return request(`${api.login}?${stringify(params)}`, {
    method: 'POST',
    body: params,
  });
}
