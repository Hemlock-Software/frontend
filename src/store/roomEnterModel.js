import { action, thunk } from 'easy-peasy';
import { RoomEnter} from '../services/api';
import CryptoJS from 'crypto-js'
export const roomEnterModel = {
  roomID: "",
  idFlag:true,

  password: "",
  errorIdMsg: "",
  errorPasswordMsg: "",
  
  showPassword: false,
  passwordFlag: true,
  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),
  
  Enter: thunk(async(actions, payload, { getState }) => {
    const {roomID, password} = getState()
    const sha256Password = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const response = await RoomEnter(
      {
        roomID: roomID,
        password: sha256Password,
      }
    )
    return response
  }),

  onRoomIdChange: action((state, payload) => {
    state.roomID = payload
    state.idFlag =  true
    if (payload.length !== 8 ) {
        state.idFlag = false;
        state.errorIdMsg = 'RoomID length must be 8 figures';
    }
    else if (/^[0-9]/.test(payload) === false) {
        state.nameFlag = false;
        state.errorIdMsg = 'Can only contain 0-9 Char';
    }
  }),

  onPasswordChange: action((state, payload) => {
    state.password = payload
    state.passwordFlag =  true
    const regex = /^[a-zA-Z0-9.]{6,16}$/;
    
    if (payload.length < 8 || payload.length > 16) {
        state.passwordFlag = false;
        state.errorPasswordMsg = 'Password length must be 6-16';
    }
    
    else if (!regex.test(payload))  {
        state.passwordFlag = false;
        state.errorPasswordMsg = 'Can only contain 0-9,a-z,A-Z,and .';
    }
  }),

  submitEnter: action((state, payload) => {
    state.password = payload;
  }),
};

