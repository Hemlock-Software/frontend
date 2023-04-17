import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { UserSendMail, UserRegister } from '../../../services/api'
import { useNavigate } from 'react-router'
function Register() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [verifyCode, setVerifiedCode] = useState('')
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  function onMail(e) {
    //console.log(e.target.value)
    setMail(e.target.value)
  }
  function onPassword(e) {
    //console.log(e.target.value)
    setPassword(e.target.value)
  }
  function onNickname(e) {
    //console.log(e.target.value)
    setNickname(e.target.value)
  }
  function onVerify(e) {
    setVerifiedCode(e.target.value)
  }

  function submitMail() {
    const postData = {
      mail: mail,
      type: 1,
    }
    console.log(postData)
    UserSendMail(postData)
      .then((response) => {
        // 请求成功的处理
        if (response.code != '200') {
          console.error(response.msg)
        }
        console.log(response.data)
        setToken(response.data)
      })
      .catch((error) => {
        // 请求失败的处理
        console.error(error)
      })
  }

  function submitRegister() {
    const postData = {
      mail: mail,
      password: password,
      nickname: nickname,
      isManager: false,
      verifyCode: verifyCode,
    }
    console.log(postData)
    UserRegister({ info: postData, token: token })
      .then((response) => {
        // 请求成功的处理
        if (response.code != '200') {
          console.error(response.msg)
        } else {
          navigate('/login')
        }
        console.log(response.data)
      })
      .catch((error) => {
        // 请求失败的处理
        console.error(error)
      })
  }
  return (
    <center>
      <br />
      <Typography variant="h3" gutterBottom color={'#1976d2'}>
        Register
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
        <Button size="small" onClick={submitMail}>
          Get Verified code
        </Button>
        <br />
        <TextField
          id="standard-basic"
          label="verify code"
          variant="standard"
          onChange={onVerify}
        />
        <br></br>
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          onChange={onPassword}
        />
        <br />
        <TextField
          id="standard-basic"
          label="nickname"
          variant="standard"
          onChange={onNickname}
        />
        <br />
        <Button onClick={submitRegister}>Submit</Button>
      </Box>
    </center>
  )
}

export default Register
