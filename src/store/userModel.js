import { action, thunk } from 'easy-peasy';
import { SendMail, RetrievePassword, UserRegister, UserLogin} from '../services/api';
import CryptoJS from 'crypto-js'

export const userModel = {
// 定义一些变量
  mail: "",             //mail:用户邮箱，用于注册/登录和找回密码
  password: "",         //password:用户密码
  checkPassword: "",
  nickname: "",         //nickname:用户昵称
  type: 1,              //type:搜寻类别
  isManager: false,     //isManager: 用户是否为管理员
  verifyCode: 0,        //verifyCode: 邮箱验证的验证码

  checkFlag: true,
  passwordFlag: true,
  mailFlag: true,
  nameFlag: true, 
  verifyCodeFlag: true,

// 显示错误信息
  errorMsg: "",
  errorNameMsg: "",
  errorVerifyCodeMsg: "",
// 显示图标
  showPassword: false,
  showCheckPassword: false,

// 定义一些action函数，state有点像this的作用，调用本类
  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),

// 解释一下thunk，thunk是一个异步函数，其中调用async来声明异步
// 参数表：actions：利用actions.funcName调用函数，payload: 传输参数， getState：调用所有的state变量
  sendMail: thunk(async (actions, payload, { getState }) => {
    const { mail, type } = getState()
    const response = await SendMail(
      {
        mail: mail,
        type: type,
      }
    )
    if (response.status === 200) {
      // 注意，这里要更新一下token
      alert("Mail Send OK")
      localStorage.setItem('token', response.data)
    }
  }),

  login: thunk(async(actions, payload, { getState }) => {
    const {mail, password} = getState()
    const sha256Password = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const response = await UserLogin(
      {
        mail: mail,
        password: sha256Password,
      }
    )
    return response
  }),

  retrievePassword: thunk(async(actions, payload, { getState }) => {
    const {mail, password, verifyCode} = getState()
    const sha256Password = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const response = await RetrievePassword(
      {
        mail: mail,
        password: sha256Password,
        verifyCode: verifyCode,
      }
    )
    return response
  }),

  register: thunk(async(actions, payload, { getState }) => {
    const {mail, password, nickname, isManager, verifyCode} = getState()
    const sha256Password = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const response = await UserRegister(
      {
        mail: mail,
        password: sha256Password,
        nickname: nickname,
        isManager: isManager,
        verifyCode: verifyCode,
      }
    )
    return response
  }),

//  邮箱验证
  onMailChange: action((state, payload) => {
    state.mail = payload
    state.mailFlag = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,14}$/.test(payload)
  }),

// 密码验证
  onPasswordChange: action((state, payload) => {
    state.password = payload
    state.passwordFlag =  true
    if (payload.length < 6 || payload.length > 16) {
        state.passwordFlag = false;
        state.errorMsg = 'password length must be 6-16';
    }
    else if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(payload) === false) {
        state.passwordFlag = false;
        state.errorMsg = 'can only contain 0-9,a-z,A-Z,and .';
    }
  }),

// 密码验证
onNameChange: action((state, payload) => {
  state.name = payload
  state.nameFlag =  true
  if (payload.length < 2 || payload.length > 16) {
      state.nameFlag = false;
      state.errorNameMsg = 'name length must be 2-16';
  }
  else if (/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(payload) === false) {
      state.nameFlag = false;
      state.errorNameMsg = 'can only contain 0-9,a-z,A-Z,and Chinese Char';
  }
}),

// 验证码验证
onVerifyCodeChange: action((state, payload) => {
  state.verifyCode = payload
  state.verifyCodeFlag =  true
  if (payload.length !== 6) {
      state.verifyCodeFlag = false;
      state.errorVerifyCodeMsg = 'verify code length must be 6';
  }
  else if (!/^\d+$/.test(payload)) {
      state.verifyCodeFlag = false;
      state.errorVerifyCodeMsg = 'Only allows 0-9';
  }
}),

// 确认密码验证
  onCheckPasswordChange: action((state, payload) => {
    state.checkPassword = payload
    if (state.password === payload) {
        state.checkFlag = true
    }else {
        state.checkFlag = false
    }
  }),

// 表单空验证
  onCheckFill: action((state) => {
    if (state.mail === ""){
      alert("mail can not be empty")
    }
    else if (state.password === ""){
      alert("password can not be empty")
    }
    else if (state.verifyCode === ""){
      alert("verify code can not be empty")
    }
    else if (state.checkPassword === ""){
      alert("check password can not be empty")
    }
    else{
      action.register()
    }
  })
};
