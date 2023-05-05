import { action, thunk } from 'easy-peasy'

export const roomSettingModel = {
  roomID: "",
  roomMemberNum: 8,
  roomMemberInfo: [
    {
      name: '1',
      src: '',
    },
    {
      name: '2',
      src: '',
    },
    {
      name: '3',
      src: '',
    },
    {
      name: '4',
      src: '',
    },
    {
      name: '5',
      src: '',
    },
    {
      name: '6',
      src: '',
    },
    {
      name: '7',
      src: '',
    },
    {
      name: '8',
      src: '',
    },
  ],
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
  // roomMemberInfoHandled: [],

  // 定义一些action函数，state有点像this的作用，调用本类
  // 定义一些action函数，state有点像this的作用，调用本类
  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),
};

