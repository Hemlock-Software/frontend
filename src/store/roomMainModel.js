import { action, thunk } from 'easy-peasy'
import { RoomGetInfo, RoomGetList, RoomGetMessageTest } from '../services/api'
import config from '../constant/config'
import axios from 'axios'

export const roomMainModel = {
  hasEnterRoom: false,
  roomInfor: {
    id: null,
    name: null,
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
  roomList: [],
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

  setExtraState: action((state, payload) => {
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
    const needWSChange = payload.flag
    if (getState().ws_socket != null && getState().ws_socket.readyState === WebSocket.OPEN && needWSChange) {
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
        if(needWSChange){
          actions.setState({ ws_socket: new WebSocket('ws' + config.baseURL.replace("http", "") + '/websocket/' + getState().roomInfor.id + '/' + payload.cookie) })
        }
        getState().ws_socket.onmessage = (event) => {
          let temp = JSON.parse(event.data)
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

  storeImage: thunk(async (actions, payload, { getState }) => {
    const formData = new FormData();
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]; // 允许的图片类型
    if(!allowedTypes.includes(payload.type)){
      alert("This is not a jpg/png/jpeg file!")
      return
    }

    formData.append('file', payload);
  
    const response = await axios.post(config.imageURL + 'api/v1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    if (response.status !== 200) {
      alert(response.data);
    } else {
      if (getState().ws_socket && getState().ws_socket.readyState === WebSocket.OPEN) {
        getState().ws_socket.send(response.data.file_url);
      }
    }
  }),

}
