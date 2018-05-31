import { stringify } from 'qs';
import config from '../utils/config'
import {getUtil,postUtil,putUtil,putUtil1,deleteUtil} from '../utils/request/request';
import request from "../utils/request";
const { api } = config

export async function query(params) {
  //return putUtil1(api.alarmListQuery,params);
  return request(api.alarmListQuery, {
    method: 'PUT',
    body: params,
  });
}
export async function queryDetail(payload) {
  return putUtil(api.alarmListQueryDetail,payload);
}
