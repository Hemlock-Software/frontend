import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import { useStoreActions, useStoreState} from 'easy-peasy';
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'


function Login(){
  const {
    passwordFlag, mailFlag, errorMsg, showPassword
  } = useStoreState((state) => state.user)
  const { setState, login, onMailChange, onPasswordChange} = useStoreActions((actions) => actions.user)
  
  const navigate = useNavigate()

  function submitLogin() {

    login().then((response) => {
      // 请求成功的处理
      if (response.status !== 200) {
        console.log(response)
        alert(response.data)
      } else {
        console.log("LOGIN SUCCESS")
      }
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
          label={mailFlag ? 'E-mail address' : 'invalid e-mail'}
          variant="standard"
          onChange={(e) => onMailChange(e.target.value)}
          error={!mailFlag}
        />
        
        <br />
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          error={!passwordFlag}>
          <InputLabel
            htmlFor="outlined-adornment-password"
            variant="standard"
            error={!passwordFlag}>
            {passwordFlag ? 'valid password' : errorMsg}
          </InputLabel>
          <Input
            label="password"
            variant="standard"
            onChange={(e) => onPasswordChange(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setState({showPassword: !showPassword})
                  }
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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