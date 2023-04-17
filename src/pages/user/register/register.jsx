import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { UserRegister } from '../../../services/api'
import { useNavigate } from 'react-router'
import { useStoreActions, useStoreState } from 'easy-peasy';

function Register() {

  const {mail, password, nickname, isManager, verifyCode} = useStoreState((state) => state.user);
  const {setState, sendMail} = useStoreActions((actions) => actions.user);

  const navigate = useNavigate()

  function submitMail(){
    sendMail()
  }

  function submitRegister() {
    UserRegister({
      mail: mail,
      password: password,
      nickname: nickname,
      isManager: isManager,
      verifyCode: verifyCode,
    })
    .then((response) => {
      // 请求成功的处理
      if (response.code !== 200) {
        console.error(response.msg)
      }else {
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
          label="E-mail address"
          variant="standard"
          onChange={(e) => setState({mail: e.target.value})}
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
          onChange={(e) => setState({verifyCode: e.target.value})}
        />
        <br></br>
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          onChange={(e) => setState({password: e.target.value})}
        />
        <br />
        <TextField
          id="standard-basic"
          label="nickname"
          variant="standard"
          onChange={(e) => setState({nickname: e.target.value})}
        />
        <br />
        <Button onClick={submitRegister}>Submit</Button>
      </Box>
    </center>
  )
}

export default Register
