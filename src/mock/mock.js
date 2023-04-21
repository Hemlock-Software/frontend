import Mock from 'mockjs'

// 模拟登录接口
Mock.mock('/mock/user/login', 'post', (options) => {
  const { mail, password } = JSON.parse(options.body)
  if (mail === 'IEeya' && password === '123456') {
    return {
      code: 200,
      msg: '登录成功',
      data: true
    }
  } else {
    return {
      code: 400,
      msg: '用户名或密码错误',
      data: false
    }
  }
})