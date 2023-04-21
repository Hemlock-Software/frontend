import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { UserRegister } from '../../../services/api'
import { useNavigate } from 'react-router'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import CryptoJS from 'crypto-js'
function Register() {
  const {
    password,
    nickname,
    isManager,
    verifyCode,
    checkFlag,
    passwordFlag,
    errorMsg,
    checkPassword,
    showPassword,
    showCheckPassword,
    mailFlag,
    mail,
  } = useStoreState((state) => state.user)
  const { setState, sendMail } = useStoreActions((actions) => actions.user)

  const navigate = useNavigate()
  // 页面初始化时，默认为正确（更好看）
  useEffect(() => {
    setState({
      passwordFlag: true,
      checkFlag: true,
      mailFlag: true,
    })
  }, [])
  function submitMail() {
    console.log(mail)
    setState({
      mail: mail,
      type: 1,
    })
    sendMail()
  }
  function onMail(e) {
    setState({
      mail: e.target.value,
    })
    if (e.target.value.length == 0 || e.target.value.indexOf('@') == -1) {
      setState({
        mailFlag: false,
      })
    } else {
      setState({
        mailFlag: true,
      })
    }
  }
  function onPassword(e) {
    // 这里如果直接用password,password会少更改一位（延迟）
    setState({
      password: e.target.value,
    })
    if (e.target.value.length < 6 || e.target.value.length > 16) {
      setState({
        passwordFlag: false,
        errorMsg: 'password length must be 6-16',
      })
    } else if (/^[0-9a-zA-Z(\d+(\.\d+)]*$/.test(e.target.value) == false) {
      setState({
        passwordFlag: false,
        errorMsg: 'can only contain 0-9,a-z,A-Z,and .',
      })
    } else {
      setState({
        passwordFlag: true,
      })
    }
  }
  function onCheckPassword(e) {
    // 这里如果直接用checkPassword,checkPassword会少更改一位（延迟）
    setState({
      checkPassword: e.target.value,
    })
    if (password == e.target.value) {
      setState({ checkFlag: true })
    } else {
      setState({ checkFlag: false })
    }
  }
  function submitRegister() {
    const sha256Password = CryptoJS.SHA256(password)
    console.log({
      mail: mail,
      password: password,
      nickname: nickname,
      isManager: isManager,
      verifyCode: verifyCode,
      sha256Password: sha256Password,
    })
    UserRegister({
      mail: mail,
      password: password,
      nickname: nickname,
      isManager: isManager,
      verifyCode: verifyCode,
    }).then((response) => {
      // 请求成功的处理
      if (response.status !== 200) {
        console.log(response.data)
      } else {
        navigate('/login')
      }
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
          label={mailFlag ? 'E-mail address' : 'invalid e-mail'}
          variant="standard"
          onChange={onMail}
          error={mailFlag ? '' : '1'}
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
          onChange={(e) => setState({ verifyCode: e.target.value })}
        />
        <br></br>
        <TextField
          id="standard-basic"
          label="nickname"
          variant="standard"
          onChange={(e) => setState({ nickname: e.target.value })}
        />
        <br></br>
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          error={passwordFlag ? '' : '1'}>
          <InputLabel
            htmlFor="outlined-adornment-password"
            variant="standard"
            error={passwordFlag ? '' : '1'}>
            {passwordFlag ? 'valid password' : errorMsg}
          </InputLabel>
          <Input
            id="standard-basic"
            label="password"
            variant="standard"
            onChange={onPassword}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setState({ showPassword: !showPassword })}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          error={checkFlag ? '' : '1'}>
          <InputLabel
            htmlFor="outlined-adornment-password"
            variant="standard"
            error={checkFlag ? '' : '1'}>
            {checkFlag ? 'password matched' : 'password not checked'}
          </InputLabel>
          <Input
            variant="standard"
            onChange={onCheckPassword}
            type={showCheckPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setState({ showCheckPassword: !showCheckPassword })
                  }
                  edge="end">
                  {showCheckPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <Button onClick={submitRegister}>Submit</Button>
      </Box>
    </center>
  )
}

export default Register
