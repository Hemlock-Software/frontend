import React from 'react';
import CryptoJS from 'crypto-js';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router'

export default function Retrivepassword() {

  const {setState, sendMail} = useStoreActions((actions) => actions.user);
  const {retrievePassword} = useStoreActions((actions) => actions.user);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorType, setPasswordErrorType] = React.useState('');
  const [repeatError, setRepeatError] = React.useState(false);
  var password;

  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

  const handleEmailChange = (e) => {
    setState({mail: e.target.value})
    setEmailError(!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(e.target.value))
  };


  const handlePasswordChange = (e) => {
    setState({password: e.target.value})
    password = e.target.value
    setPasswordError(!/^\w{6,15}$/.test(e.target.value))
    if(!/^\w{6,15}$/.test(e.target.value)) {
      if(/\W/.test(e.target.value)) {
        setPasswordErrorType('Only number and latter allowes')
      }else if(/^[0-9A-Za-z]{0,5}$/.test(e.target.value)) {
        setPasswordErrorType('Too short')
      }else{
        setPasswordErrorType('Too long')
      }
    }
  };

  const handleRepeatChange = (e) => {
    setRepeatError(!(password === e.target.value))
  };

  function submitMail(){
    setState({type: 2})
    sendMail()
  }

  const submit = async () => {
    retrievePassword().then(res=>{
      if(res.code !== 200){
        console.error(res.msg)
        alert("Retrieve fail")
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
              label="E-mail address"
              variant="standard"
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? 'Invalid email' : ''}
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
              <InputLabel htmlFor="password" error={passwordError}>
                New password
              </InputLabel>
              <Input
              id="New password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
              error={passwordError}
              helpertext={passwordError ? passwordErrorType : ''}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              />
            </FormControl>

            <br/>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="password" error={repeatError}> 
                Repeat password
              </InputLabel>
              <Input
              id="Repeat password"
              type={showRepeatPassword ? 'text' : 'password'}
              onChange={handleRepeatChange}
              error={repeatError}
              helpertext={repeatError ? 'Password doesn\'t match' : ''}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRepeatPassword}
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
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