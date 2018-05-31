import axios from 'axios';
import qs from 'qs';
import pathToRegexp from 'path-to-regexp';
import lodash from 'lodash';
import { message } from 'antd';
import session from '../saveStorage/sessionStorage';

let AUTH_TOKEN_TEST = '';
const getToken = () => {
  axios.defaults.headers.common[`authorization`] = session.getSession('token');
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.headers['Accept'] = 'application/json';
};


// axios.defaults.baseURL = 'http://172.20.36.2:10001/server-api/list';

// axios.defaults.headers.post['content-Type'] = 'application/json; charset=utf-8';

const getUtil = (url, params) => {
  // getToken()
  let statusCode;
  //  console.log('getUtil', url)
  const result = axios({
    url,
    method: 'get',
    params,
  }).then((res) => {
    //  console.log(res,'getUtil')
    const { statusText, status } = res;
    let data = res.data;
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    });
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error';
    }
    return Promise.reject({ success: false, statusCode, message: msg });
  });
  return result;
};
const postUtil = (url, data, params) => {
  getToken();
  // const cloneParams = lodash.cloneDeep(params)
  // const cloneData = lodash.cloneDeep(data)
  //  console.log('params', params)
  let statusCode;
  let success;
  //  console.log('postUtil')
  const result = axios({
    url,
    method: 'post',
    data,
    params,
    contentType: 'x-www-form-urlencoded',
  }).then((res) => {
    //  console.log('res', res)
    const { statusText, status } = res;
    let data = res.data;
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    });
  }).catch((error) => {
    //  console.log('error', error)
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message ? error.message : 'Network Error';
    }
    message.error(msg);
    return Promise.reject({ success: false, statusCode, message: msg });
  });
  return result;
};

const putUtil = (url, data, params) => {
  let statusCode;
  let success;
  getToken();
  const result = axios({
    url,
    method: 'put',
    data,
    params,
    contentType: 'application/json',
  }).then((res) => {
    console.log('res', res);
    const { statusText, status } = res;
    let data = res.data;
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    });
  }).catch((error) => {
    console.log('error', error);
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message ? error.message : c;
    }
    message.error(msg);
    return Promise.reject({ success: false, statusCode, message: msg });
  });
  return result;
};

const deleteUtil = (url, data) => {
  let statusCode;
  const result = axios({
    url,
    method: 'delete',
    data,
  }).then((res) => {
    const { statusText, status } = res;
    let data = res.data;
    console.log(res, 'delete res');
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    });
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error';
    }
    return Promise.reject({ success: false, statusCode, message: msg });
  });
  return result;
};
export { getUtil, postUtil, putUtil, deleteUtil };
