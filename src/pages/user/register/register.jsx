import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'

function Register() {
  const {
    mail, checkFlag, passwordFlag, mailFlag, errorMsg, showPassword, showCheckPassword
  } = useStoreState((state) => state.user)
  const { setState, sendMail, onMailChange, onPasswordChange, onCheckPasswordChange, register} = useStoreActions((actions) => actions.user)
  const navigate = useNavigate()

  function submitMail() {
    setState({
      mail: mail,
      type: 1,
    })
    sendMail()
  }

  function submitRegister() {
    if (
      mail === '' ||
      password === '' ||
      checkPassword === '' ||
      verifyCode === 0 ||
      !mailFlag ||
      !checkFlag ||
      !passwordFlag
    ) {
      alert('please enter the valid information!')
      return
    }
    register().then((response) => {
      // 请求成功的处理
      if (response.status !== 200) {
        alert(response.data)
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
          label={mailFlag ? 'E-mail address' : 'invalid e-mail'}
          variant="standard"
          onChange={(e) => onMailChange(e.target.value)}
          error={!mailFlag}
        />
        <br />
        <Button size="small" onClick={submitMail}>
          Get Verified code
        </Button>
        <br />

        <TextField
          label="verify code"
          variant="standard"
          onChange={(e) => setState({ verifyCode: e.target.value })}
        />
        <br></br>
        <TextField
          label="*nickname"
          variant="standard"
          onChange={(e) => setState({ nickname: e.target.value })}
        />
        <br></br>
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
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          error={!checkFlag}>
          <InputLabel
            htmlFor="outlined-adornment-password"
            variant="standard"
            error={!checkFlag}>
            {checkFlag ? 'password matched' : 'password not checked'}
          </InputLabel>
          <Input
            variant="standard"
            onChange={(e) => onCheckPasswordChange(e.target.value)}
            type={showCheckPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setState({showCheckPassword: !showCheckPassword})
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
