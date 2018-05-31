import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'

const { api } = config

//卡口过车总量
export async function queryBayonetVehicleCount(params) {
	console.log(11)
  return request(api.queryBayonetVehicleCount, {
    method: 'GET'
  });
}

//查询卡口过车列表信息
export async function queryBayonetVehicleList(params) {
  return request(api.queryBayonetVehicleList, {
    method: 'PUT',
    body: params,
  });
}

//查询卡口车流量统计信息
export async function queryVehicleTotalStatistics(params) {
  return request(api.queryVehicleTotalStatistics, {
    method: 'GET'
  });
}
