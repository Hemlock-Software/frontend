import request from './request'

export const UserLogin = (info) => request({
  url: '/user/login',
  data: info,
  method: 'post'
})

export const UserSendMail = (info) => request({
  url: '/user/sendMail',
  data: info,
  method: 'post'
})

export const UserRegister = ({ info, token }) => request({
  url: '/user/join',
  data: info,
  method: 'post',
  token: token,
})