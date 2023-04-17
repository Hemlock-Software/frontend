import React, { useState } from 'react'
import { UserLogin } from '../../../services/api'
import CryptoJS from 'crypto-js';

function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const postData = {
    mail: name,
    password: password,
  }

  const handleLogin = async () => {
    const sha256Password = CryptoJS.SHA256(password);
    console.log("sha256加密后的结果:"+sha256Password.toString(CryptoJS.enc.Hex));
    UserLogin(postData).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>登录</button>
    </div>
  )
}

export default Login
