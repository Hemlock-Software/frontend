import { action, thunk } from 'easy-peasy';
import {RoomCreate} from '../services/api';
import CryptoJS from 'crypto-js'

export const roomCreateModel = {
  roomID: "",

  name: "",
  nameFlag: true,
  errorNameMsg: "",

  password: "",
  showPassword: false,
  passwordFlag: true,
  errorPasswordMsg: "",

  maxUserNumber: 50,
  maxUserNumberFlag: true,
  errorMaxUserNumberMsg: "",

  fillFlag: true,

  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),

  // Form validation

  onNameChange: action((state, payload) => {
    state.name = payload
    state.nameFlag =  true
    if (payload.length < 2 || payload.length > 16) {
        state.nameFlag = false;
        state.errorNameMsg = 'Name length must be 2-16';
    }
    else if (!/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(payload)) {
        state.nameFlag = false;
        state.errorNameMsg = 'Can only contain 0-9,a-z,A-Z,and Chinese Char';
    }
  }),

  onPasswordChange: action((state, payload) => {
    state.password = payload
    state.passwordFlag =  true
    if(payload !== ""){
      if (payload.length < 6 || payload.length > 16) {
          state.passwordFlag = false;
          state.errorPasswordMsg = 'Password length must be 6-16';
      }
      else if ((/[^A-Za-z0-9.]/.test(payload))) {
          state.passwordFlag = false;
          state.errorPasswordMsg = 'Can only contain 0-9,a-z,A-Z,and .';
      }
    }
  }),

  onMaxUserNumberChange: action((state, payload) => {
    state.maxUserNumber = payload
    state.maxUserNumberFlag = true
    if(payload !== ""){
      var num = parseInt(payload)
      if(/[^0-9]/.test(payload) || isNaN(num)){
        state.maxUserNumberFlag = false
        state.errorMaxUserNumberMsg = 'Can only contain a integer'
      }else if(num < 1 || num > 100000){
        state.maxUserNumberFlag = false
        state.errorMaxUserNumberMsg = 'Maximum number of users must be 1-100000'
      }
    }
  }),

  onCheckFill: action((state) => {
    state.fillFlag = true
    if (state.name === ""){
      state.fillFlag = false
      // alert("Room name can not be empty")
    }
  }),

  create: thunk(async(actions, payload, { getState }) => {
    const {name, password, maxUserNumber} = getState()
    const sha256Password = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const response = await RoomCreate(
      {
        name: name,
        password: sha256Password,
        maxUsers: maxUserNumber,
      }
    )
    return response
  }),
};
