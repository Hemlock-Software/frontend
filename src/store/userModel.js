import { action, thunk } from 'easy-peasy'
import { SendMail } from '../services/api'

export const userModel = {
  // 定义一些变量
  mail: "",             //mail:用户邮箱，用于注册/登录和找回密码
  password: "",         //password:
  nickname: "",
  type: 1,
  isManager: false,
  verifyCode: 0,


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
      localStorage.setItem('token', response.data)
      console.log(response)
    }
  })

}
