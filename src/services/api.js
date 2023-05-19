import request from './request'

export const UserLogin = (info) => request({
  url: '/user/login',
  data: info,
  method: 'post'
})

export const SendMail = (info) => request({
  url: '/user/send-mail',
  data: info,
  method: 'post'
})

export const RetrievePassword = (info) => request({
  url: '/user/findPassword',
  data: info,
  method: 'post'
})

export const UserRegister = (info) => request({
  url: '/user/join',
  data: info,
  method: 'post',
})

export const RoomCreate = (info) => request({
  url: '/room/create',
  data: info,
  method: 'post',
})

export const RoomEnter = (info) => request({
  url: '/room/enter',
  data: info,
  method: 'post',
})

export const RoomGetInfo = (info) => request({
  url: '/room/getRoomInfo',
  data: info,
  method: 'post',
})

export const RoomGetList = (info) => request({
  url: '/room/getList',
  data: info,
  method: 'post',
})

export const RoomSetting = (info) => request({
  url: '/room/setting',
  data: info,
  method: 'post',
})
