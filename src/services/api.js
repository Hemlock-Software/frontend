import request from './request';

export const UserLogin = (info) =>request({
  url: '/user/login',
  data: info,
  method: 'post'
});
