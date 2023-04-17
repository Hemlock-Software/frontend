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
    const token = localStorage.getItem('token')
    if (token) {
      configItem.headers['Authorization'] = `Bearer ${token}`
    }
    configItem.headers['Access-Control-Allow-Origin'] = 'http://10.214.241.121:15100/';
    return configItem;
  },
  (error) => Promise.reject(error)
)

// response interceptor

instance.interceptors.response.use(
  (response) => {
    const res = response
    return res
  },
)

export default instance;








