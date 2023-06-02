import { action, thunk } from 'easy-peasy'

export const roomSettingModel = {
  // 当前正在操纵聊天室的用户
  loginUserNickname: '',
  loginUserEmail: '',
  roomID: "",
  roomName: '',
  roomMemberNum: 0,
  // mail:''
  // name:''
  roomMemberInfo: [],
  roomOwner: {},
  // 控制是否显示'check more'按钮的flag变量
  checkMoreFlag: true,
  pinChatLoading: true,
  muteLoading: true,
  // 是否显示搜索名字时的搜索框
  serchFlag: false,
  // 展示所有的群成员
  displayAll: true,
  // 搜索群成员时输入框内容
  searchNameValue: '',
  nickName: '',
  // roomMemberInfoHandled: [],

  // 定义一些action函数，state有点像this的作用，调用本类
  // 定义一些action函数，state有点像this的作用，调用本类
  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),
};

