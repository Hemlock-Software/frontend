import Mock from 'mockjs';

// 模拟登录接口
Mock.mock('/user/login', 'post', (options) => {
  const { name, password } = JSON.parse(options.body);
  if (name === 'IEeya' && password === '123456') {
    return {
      code: 200,
      msg: '登录成功',
      data: true
    };
  } else {
    return {
      code: 400,
      msg: '用户名或密码错误',
      data: false
    };
  }
});