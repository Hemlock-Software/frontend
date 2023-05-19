import { action, thunk } from 'easy-peasy';

export const roomMainModel = {
  roomInfor: {
    roomId: 1,
    roomName: 'Chatting room 1',
    roomOwner: {
      mail: "",
      nickname: "",
    },
    roomMaxUsers: 1,
    roomMemberList: [
      {
        mail: "",
        nickname: "",
      },
    ]
  },
  roomList: [
    {
      roomId: 1,
      roomName: "123",
    },
    {
      roomId: 2,
      roomName: "234",
    },
    {
      roomId: 3,
      roomName: "456",
    },
  ],
  messages: [
    {
      user: 'Alice',
      text: 'Hello, Bob!',
    },
    {
      user: 'Bob',
      text: 'Hi, Alice!',
    },
  ],

  roomCreateOpen: false,
  roomSettingOpen: false,

// 定义一些action函数，state有点像this的作用，调用本类
  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),

};
