import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import CryptoJS from 'crypto-js';
import { UserLogin } from '../../../services/api'
import { useStoreActions, useStoreState } from 'easy-peasy';

function Login(){
  
  const {mail, password} = useStoreState((state) => state.user);
  const {setState} = useStoreActions((actions) => actions.user);
  
  const navigate = useNavigate()

  async function submitLogin() {
    const sha256Password = CryptoJS.SHA256(password);
    const response = await UserLogin(
      {
        mail: mail,
        password: password,
      }
    )
    if (response.status === 200) {
      // navigate('../')
      console.log("LOGIN SUCCESS")
    }
    else{
      // 报错
      console.log(response.data)
    }
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
          onChange={(e) => setState({mail: e.target.value})}
        />
        <br />
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          onChange={(e) => setState({password: e.target.value})}
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
