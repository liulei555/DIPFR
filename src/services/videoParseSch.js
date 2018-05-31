import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';
const { api } = config
//查询视频解析调度的设备列表
export async function query(payload) {
  console.log(payload)
  return putUtil(api.queryVideoSchedulingAnalysisDevice,payload);
}
//分析
export async function startAnalysis(payload) {
  return postUtil(api.startFaceSchedulingAnalysis,payload);
}
//停止
export async function endAnalysis(payload) {
  return postUtil(api.stopFaceSchedulingAnalysis,payload);
}

