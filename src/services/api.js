import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
});

// 登录
export const login = (data) => instance.post('/user/login', data);