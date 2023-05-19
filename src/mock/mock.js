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

// 模拟登录接口
Mock.mock('/mock/room/getRoomInfo', 'post', (options) => {
  return {
    code: 200,
    data: {
      roomId: 114514,
      roomName: 'Chatting room',
      roomOwner: {
        mail: "123",
        nickname: "123",
      },
      roomMaxUsers: 50,
      roomMemberList: [
        {
          mail: "123",
          nickname: "123",
        },
        {
          mail: "123",
          nickname: "litiansuo",
        },
        {
          mail: "123",
          nickname: "田所浩二",
        },
        {
          mail: "123",
          nickname: "123",
        },
        {
          mail: "123",
          nickname: "litiansuo",
        },
        {
          mail: "123",
          nickname: "田所浩二",
        },
        {
          mail: "123",
          nickname: "123",
        },
        {
          mail: "123",
          nickname: "litiansuo",
        },
        {
          mail: "123",
          nickname: "田所浩二",
        },
        {
          mail: "123",
          nickname: "123",
        },
        {
          mail: "123",
          nickname: "litiansuo",
        },
        {
          mail: "123",
          nickname: "田所浩二",
        },
      ]
    },
  }
})

// 模拟登录接口
Mock.mock('/mock/room/getList', 'post', (options) => {
  return {
    code: 200,
    data: 
      [
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
    }
})

Mock.mock('/mock/room/create', 'post', (options) => {
  return {
    code: 200,
    data: null,
    }
})

// 模拟创建
Mock.mock('/mock/room/enter', 'post', (options) => {
  return {
    code: 200,
    data: null,
    }
})