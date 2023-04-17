import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { UserLogin } from '../../../services/api'
import { useNavigate } from 'react-router'
import CryptoJS from 'crypto-js';

function Login() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function onMail(e) {
    //console.log(e.target.value)
    setMail(e.target.value)
  }
  function onPassword(e) {
    //console.log(e.target.value)
    setPassword(e.target.value)
  }

  function submitLogin() {
    const postData = {
      mail: mail,
      password: password,
    }
    console.log(postData)
    const sha256Password = CryptoJS.SHA256(password);
    console.log("sha256加密后的结果:"+sha256Password.toString(CryptoJS.enc.Hex));
    UserLogin(postData)
      .then((response) => {
        // 请求成功的处理
        if (response.code != 200) {
          console.error(response.msg)
        } else {
          navigate('../')
        }
        console.log(response)
      })
      .catch((error) => {
        // 请求失败的处理
        console.error(error)
      })
  }
  
  function submitRegister(){
    navigate('/register')
  }
  function submitRetrievePassword(){
    navigate('/retrievePassword')
  }
  return (
    <center>
      <br />
      <Typography variant="h3" gutterBottom color={'#1976d2'}>
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          id="standard-basic"
          label="E-mail address"
          variant="standard"
          onChange={onMail}
        />
        <br />
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          onChange={onPassword}
        />
        <br />
        <Button onClick={submitLogin}>Login</Button>
        <br />
        <Button onClick={submitRegister}>register</Button>
        <br />
        <Button onClick={submitRetrievePassword}>retrieve Password</Button>
      </Box>
    </center>
  )
}

export default Login
