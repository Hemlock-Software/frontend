export default {
    //  axios 基础url地址
    baseURL: process.env.NODE_ENV === 'development' ? 'http://10.214.241.121:15100/' : '/api',
    // 操作正常返回的code,根据后端第一
    successCode: [200, 0],
    // 超时时间
    requestTimeout: 10 * 1000,
    // 请求content_type类型,根据后端配置定义
    contentType: 'application/json;charset=UTF-8',
    // 登录失效code
    invalidCode: -1
  };