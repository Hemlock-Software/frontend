import React, { useState } from 'react';

import axios from 'axios';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const postData = {
    name: name,
    password: password,
  };

  const handleLogin = async () => {
    axios.post('/user/login', postData)
      .then(response => {
        // 请求成功的处理
        console.log(response.data);
      })
      .catch(error => {
        // 请求失败的处理
        console.error(error);
      });
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>登录</button>
    </div>
  );

}

export default Login;