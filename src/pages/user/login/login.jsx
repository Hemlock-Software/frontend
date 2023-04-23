import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { UserLogin } from '../../../services/api';
import { useStoreActions, useStoreState } from 'easy-peasy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/*
已完成：密码隐式显示
目前需要做内容：输入不存在的账号：提示账户不存在
输入存在账号但密码错误，提示密码错误
*/
function Login(){
  
  const {mail, password} = useStoreState((state) => state.user);
  const {setState} = useStoreActions((actions) => actions.user);
  const [showPassword, setShowPassword] = useState(false);
  
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
  const handleShowPasswordClick = () => {
    setShowPassword((prevState) => !prevState);
  };

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
          type={showPassword?'text':'password'}
          variant="standard"
          onChange={(e) => setState({password: e.target.value})}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                <IconButton onClick={handleShowPasswordClick} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </React.Fragment> 
            ),
          }}
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
