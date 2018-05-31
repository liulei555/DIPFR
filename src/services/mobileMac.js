import {getUtil,postUtil,putUtil,deleteUtil} from '../utils/request/request';
import config from '../utils/config';
const {api}=config;
export async function query(payload) {
	return putUtil(api.queryMobileMac,payload);
}

export async function queryPhoneMacInfo(payload) {
	return putUtil(api.queryPhoneMacInfo+'/'+payload,payload);
}

export async function updatePhoneMacInfo(payload) {
	return putUtil(api.updatePhoneMacInfo,payload);
}

export async function exportPhoneMacList(payload) {
	return postUtil(api.exportPhoneMacList,payload);
}