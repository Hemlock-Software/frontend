import request from './request'

export const UserLogin = (info) => request({
  url: '/user/login',
  data: info,
  method: 'post'
})

export const SendMail = (info) => request({
  url: '/user/send_mail',
  data: info,
  method: 'post'
})

export const RetrievePassword = (info) => request({
  url: '/user/find_password',
  data: info,
  method: 'post'
})

export const UserRegister = (info) => request({
  url: '/user/join',
  data: info,
  method: 'post',
})

export const RoomCreate = (info) => request({
  url: '/room/create_room',
  data: info,
  method: 'post',
})

export const RoomEnter = (info) => request({
  url: '/room/enter_room',
  data: info,
  method: 'post',
})

export const RoomGetInfo = (info) => request({
  url: '/room/get_room_info',
  data: info,
  method: 'post',
})

export const RoomGetList = (info) => request({
  url: '/room/get_list',
  data: info,
  method: 'post',
})

export const RoomSetting = (info) => request({
  url: '/room/setting',
  data: info,
  method: 'post',
})

export const RoomGetMessageTest = (info) => request({
  url: '/room/get_message_test',
  data: info,
  method: 'post',
})

