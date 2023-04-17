/**
 * @description axios请求封装
 */

import axios from 'axios'
import config from '../constant/config'

const { baseURL, requestTimeout, contentType } = config

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  }
})

// request interceptor
instance.interceptors.request.use(
  (configItem) => {
    configItem.headers['Access-Control-Allow-Origin'] = 'http://10.214.241.121:15100/';
    return configItem;

  },
  (error) =>
    Promise.reject(error)
)

// response interceptor
instance.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    console.error('请求出错啦！')
    return Promise.reject(error)
  }
)

export default instance;








