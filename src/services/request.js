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
    "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDg1NDMiLCJpYXQiOjE2ODE0NTgyODYsImJvZHkiOiJ7XCJlbWFpbFwiOlwiOTI4NjA2NzE1QHFxLmNvbVwiLFwidXNhZ2VcIjowLFwidmVyaWZ5Q29kZVwiOlwiNDQzODAwXCJ9IiwiZXhwIjoxNjgxNDU4ODg2fQ.Xc1x4WWuhxcuBagn3nzPygLwvRghrLXjSs3phRaH1no" + ""
  }
})

// request interceptor
instance.interceptors.request.use(
  (configItem) => {
    configItem.headers['Access-Control-Allow-Origin'] = 'http://10.214.241.121:15100/';
    return configItem;

  },
  (error) =>
    // do something with request error
    Promise.reject(error)
)

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  (response) => {
    const res = response.data
    // 请求出错处理
    // -1 超时、token过期或者没有获得授权
    // if (res.code === invalidCode && tokenLose) {
    //   tokenLose = false;
    //   // 根据自己业务需求调整代码
    // }

    // if (successCode.indexOf(res.code) === -1) {
    //   console.error(res.msg);
    //   return Promise.reject(res);
    // }
    return res
  },
  (error) => {
    console.error('请求出错啦！')
    return Promise.reject(error)
  }
)

export default instance;








