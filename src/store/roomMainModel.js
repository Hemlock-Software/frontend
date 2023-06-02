import { action, thunk } from 'easy-peasy'
import { RoomGetInfo, RoomGetList, RoomGetMessageTest } from '../services/api'
import config from '../constant/config'

export const roomMainModel = {
  hasEnterRoom: false,
  roomInfor: {
    id: "123",
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
      name: "00000009",
    },
  ],
  messages: [
  ],

  roomCreateOpen: false,
  roomEnterOpen: false,
  roomSettingOpen: false,
  ws_socket: null,
  inputMessage: "",

  // 定义一些action函数，state有点像this的作用，调用本类
  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),

  // 请求room_list
  getRoomList: thunk(async (actions, payload, { getState }) => {
    const response = await RoomGetList()
    if (response.status !== 200) {
      alert(response.data)
    } else {
      actions.setState({ roomList: response.data })
    }
  }),

  // 请求room_info
  getRoomInfo: thunk(async (actions, payload, { getState }) => {
    // 关闭之前的ws_socket
    if (getState().ws_socket != null && getState().ws_socket.readyState === WebSocket.OPEN) {
      getState().ws_socket.close()
    }
    const response = await RoomGetInfo(
      {
        roomID: payload.id
      }
    )
    if (response.status === 200) {
      // 更新Infor
      response.data.id = payload.id
      actions.setState({ roomInfor: response.data })
      actions.setState({ hasEnterRoom: true })

      const responseMessage = await RoomGetMessageTest(
        {
          id: payload.id
        }
      )
      if (responseMessage.status === 200) {
        // 更新Infor
        let temp_data = responseMessage.data
        if (temp_data.length > 0) temp_data.reverse()
        actions.setState({ messages: temp_data })
        actions.setState({ ws_socket: new WebSocket('ws' + config.baseURL.replace("http", "") + '/websocket/' + getState().roomInfor.id + '/' + payload.cookie) })
        getState().ws_socket.onmessage = (event) => {
          let temp = JSON.parse(event.data)
          console.log(getState().ws_socket)
          actions.setState({ messages: [...getState().messages, temp] })
        }
      }
      else {
        alert(responseMessage.data)
      }
    }
    else {
      alert(response.data)
    }
  }),
}
