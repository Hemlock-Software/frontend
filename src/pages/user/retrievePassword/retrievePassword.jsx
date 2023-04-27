import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router'

export default function Retrivepassword() {

  const {
    mail,
    password,
    checkPassword,
    checkFlag,
    passwordFlag,
    mailFlag,
    errorMsg,
    showPassword,
    showCheckPassword,
  } = useStoreState((state) => state.user)
  const {
    setState,
    sendMail,
    onMailChange,
    onPasswordChange,
    onCheckPasswordChange,
    retrievePassword,
  } = useStoreActions((actions) => actions.user)

  const navigate = useNavigate()

  function submitMail(){
    if (!mailFlag) {
      alert('E-mail format invalid!')
      return
    }
    setState({type: 2})
    sendMail()
  }

  const submit = async () => {
    if (
      mail == '' ||
      password == '' ||
      checkPassword == '' ||
      !mailFlag ||
      !checkFlag ||
      !passwordFlag
    ) {
      alert('Please enter the valid information!')
      return
    }
    retrievePassword().then(res=>{
      if(res.status !== 200){
        alert(res.data)
      }else{
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
            Retrive Password
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '20ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label={mailFlag ? 'E-mail address' : 'Invalid e-mail'}
              variant="standard"
              onChange={(e) => onMailChange(e.target.value)}
              error={!mailFlag}
            />

            <br/>
            <Button size='small' onClick={submitMail}>
              Get code
            </Button>

            <br/>
            <TextField
              id="standard-basic"
              label="Varification code"
              variant="standard"
              onChange={(e) => setState({verifyCode:e.target.value})}
            />

            <br/>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="password" error={!passwordFlag}>
                {passwordFlag ? 'New password' : errorMsg}
              </InputLabel>
              <Input
              id="New password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => onPasswordChange(e.target.value)}
              error={!passwordFlag}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setState({ showPassword: !showPassword })}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              />
            </FormControl>

            <br/>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="password" error={!checkFlag}> 
                {checkFlag ? 'Repeat password' : 'Password not matched'}
              </InputLabel>
              <Input
              id="Repeat password"
              type={showCheckPassword ? 'text' : 'password'}
              onChange={(e) => onCheckPasswordChange(e.target.value)}
              error={!checkFlag}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setState({ showCheckPassword: !showCheckPassword })}
                  >
                    {showCheckPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              />
            </FormControl>

            <br/>
            <Button onClick={submit}>
              Submit
            </Button>
          </Box>
          <br/>
        </Paper>
      </Container>
    </center>
  );
}