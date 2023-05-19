import { action, thunk } from 'easy-peasy';
import { RoomGetInfo, RoomGetList} from '../services/api';

export const roomMainModel = {
  hasEnterRoom: false,
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
  roomEnterOpen: false,
  roomSettingOpen: false,

// 定义一些action函数，state有点像this的作用，调用本类
  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),

// 请求room_list
  getRoomList: thunk(async(actions, payload, { getState }) => {
    const response = await RoomGetList()
    return response
  }),

// 请求room_info
  getRoomInfo: thunk(async(actions, payload, { getState }) => {
    const response = await RoomGetInfo(
      {
        roomID: payload
      }
    )
    if(response.status === 200){
      // 更新Infor
      getState.roomInfor = response.data
      getState.hasEnterRoom = true
      console.log(getState.roomInfor)
    }
    else{
      alert(response.data)
    }
  }),

};
