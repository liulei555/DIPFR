import { stringify } from 'qs';
import request from '../utils/request';
import config from '../utils/config'
import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';
const { api } = config
//查询
export async function query(payload) {
  return putUtil(api.queryFaceSchedulingAnalysisDevice,payload);
}
//分析
export async function startAnalysis(payload) {
  return postUtil(api.startFaceSchedulingAnalysis,payload);
}
//停止
export async function endAnalysis(payload) {
  return postUtil(api.stopFaceSchedulingAnalysis,payload);
}

