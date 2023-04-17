import request from './request'

export const UserLogin = (info) => request({
  url: '/user/login',
  data: info,
  method: 'post'
});

export const SendMail = (info) =>request({
  url: '/user/sendMail',
  data: info,
  method: 'post'
});

export const RetrievePassword = (info) =>request({
  url: '/user/retrievePassword',
  data: info,
  method: 'post'
});

export const UserRegister = ({ info, token }) => request({
  url: '/user/join',
  data: info,
  method: 'post',
  token: token,
});
