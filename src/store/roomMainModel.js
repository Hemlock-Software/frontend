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
  tempList: [],
  appendIntervalId: null,
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
        actions.setState({ messages: temp_data })
        if(needWSChange){
          actions.setState({ ws_socket: new WebSocket('ws' + config.baseURL.replace("http", "") + 'websocket?roomid=' + getState().roomInfor.id + '&username=' + payload.cookie + '&token=' + localStorage.getItem('token')) })
        }
        getState().ws_socket.onmessage = (event) => {
          let temp = JSON.parse(event.data);
          let tempList = getState().tempList || []; // 获取已存在的暂时列表，如果不存在则创建一个空数组
          tempList.push(temp); // 将temp追加到暂时列表中
          actions.setState({ tempList }); // 更新暂时列表的状态
          
          if (!getState().appendIntervalId) {
            // 如果全局计时器不存在，则创建一个定时任务
            getState().appendIntervalId = setInterval(() => {
              const { tempList, messages } = getState();
              if (tempList.length > 0) {
                // 如果暂时列表不为空，则将其中的数据追加到messages后面
                actions.setState({ 
                  messages: [...messages, ...tempList], // 将暂时列表的数据追加到messages后面
                  tempList: [] // 清空暂时列表
                });
              } else {
                // 如果暂时列表为空，则取消全局计时器并重置引用
                clearInterval(getState().appendIntervalId);
                getState().appendIntervalId = null;
              }
            }, 200);
          }
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
    console.log(payload.type)
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/ico", "image/bmp", "image/webp"]; // 允许的图片类型
    if(!allowedTypes.includes(payload.type)){
      alert("This is not a image file!")
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
