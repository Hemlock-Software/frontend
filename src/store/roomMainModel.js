import { action, thunk } from 'easy-peasy';
import { RoomGetInfo, RoomGetList} from '../services/api';

export const roomMainModel = {
  hasEnterRoom: false,
  roomInfor: {
    id: 123,
    name: 'Chatting room 1',
    owner: {
      mail: "",
      nickname: "",
    },
    maxUsers: 1,
    members: [
      {
        mail: "",
        nickname: "",
      },
    ]
  },
  roomList: [
    {
      ID: 1,
      name: "123",
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
    if (response.status !== 200) {
      alert(response.data);
    } else {
      actions.setState({roomList: response.data});
    }
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
      response.data.id = payload;
      actions.setState({roomInfor: response.data})
      actions.setState({hasEnterRoom: true})
    }
    else{
      alert(response.data)
    }
  }),

};
