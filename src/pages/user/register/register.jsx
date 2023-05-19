import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
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
    mail,
    password,
    checkPassword,
    verifyCode,
    checkFlag,
    verifyCodeFlag,
    nameFlag,
    passwordFlag,
    mailFlag,
    errorMsg,
    errorNameMsg,
    errorVerifyCodeMsg,
    showPassword,
    showCheckPassword,
  } = useStoreState((state) => state.user)
  const {
    setState,
    sendMail,
    onMailChange,
    onPasswordChange,
    onCheckPasswordChange,
    onNameChange,
    onVerifyCodeChange,
    register,
  } = useStoreActions((actions) => actions.user)
  const navigate = useNavigate()

  function submitMail() {
    if(mail===''){
      alert('please enter email')
      return
    }
    console.log({
      mail:mail,
    })
    setState({
      mail: mail,
      type: 1,
    })
    if (!mailFlag) {
      alert('Email address format invalid.')
      return
    }
    sendMail()
  }

  function submitRegister() {
    console.log(mail, password, checkPassword, verifyCode, nameFlag, verifyCodeFlag, mailFlag, checkFlag, passwordFlag)
    if (
      mail === '' ||
      password === '' ||
      checkPassword === '' ||
      verifyCode === '' ||
      !verifyCodeFlag ||
      !mailFlag ||
      !checkFlag ||
      !passwordFlag
    ) {
      alert('The information you have entered is invalid.')
      return
    }
    register().then((response) => {
      // 请求成功的处理
      if (response.status !== 200) {
        alert(response.data)
      } else {
        alert("You have successfully registered.")
        navigate('/login')
      }
    })
  }
  return (
    <center>
      <br />
      <Container maxWidth="sm" sx = {{ mt : 1 }}>
        <Paper elevation={4}>
        <br/>
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
              label={mailFlag ? 'Email address' : 'Invalid email'}
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
              label={verifyCodeFlag ? 'Verification code' : errorVerifyCodeMsg}
              variant="standard"
              onChange={(e) => onVerifyCodeChange(e.target.value)}
              error={!verifyCodeFlag}
            />
            <br></br>
            <TextField
              label={nameFlag ? '* Nickname' : errorNameMsg}
              variant="standard"
              onChange={(e) => setState({
                nickname:e.target.value,
              })}
              error={!nameFlag}
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
                {passwordFlag ? 'Password' : errorMsg}
              </InputLabel>
              <Input
                label="password"
                variant="standard"
                onChange={(e) => onPasswordChange(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
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
              error={!checkFlag}>
              <InputLabel
                htmlFor="outlined-adornment-password"
                variant="standard"
                error={!checkFlag}>
                {checkFlag ? 'Confirm password' : 'Passwords do not match'}
              </InputLabel>
              <Input
                variant="standard"
                onChange={(e) => onCheckPasswordChange(e.target.value)}
                type={showCheckPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
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
        </Paper>
      </Container>
    </center>
  )
}

export default Register