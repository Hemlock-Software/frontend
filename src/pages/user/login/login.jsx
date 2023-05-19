import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import { useStoreActions, useStoreState} from 'easy-peasy';
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import { useCookies } from 'react-cookie';


function Login(){
  const  [ Cookie, setCookie ]  =  useCookies ( [ 'E-mail' ] ) ; // DO NOT DELETE 'COOKIES', OR IT WILL CRAPT
  const navigate = useNavigate()
  const {
    mail,
    password,
    passwordFlag, 
    mailFlag, 
    errorMsg, 
    showPassword
  } 
  = useStoreState((state) => state.user)
  const { 
    setState, 
    login, 
    onMailChange, 
    onPasswordChange
  } 
  = useStoreActions((actions) => actions.user)

  function submitLogin() {
    if (
      mail === '' ||
      password === '' ||
      !passwordFlag
    ) {
      alert('The information you have entered is invalid.')
      return
    }
    login().then((response) => {
      // 请求成功的处理
      if (response.status !== 200) {
        console.log(response)
        alert(response.data)
      } else {
        console.log("LOGIN SUCCESS")
        console.log(response.data)
        const nickname = JSON.parse(response.data).nickname
        setCookie('E-mail', '{ "E-mail":"'+ mail +'", "nickname":"'+ nickname +'"}', { path: '/' })
        navigate('/room/main')
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
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '40ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          label={mailFlag ? 'Email address' : 'Invalid e-mail'}
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
  <Grid item xs={12}>
    <Grid container spacing={4} justifyContent="space-between">
      <Grid item >
        <Link href="/retrievePassword" variant="standard">
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link href="/register" variant="standard">
          No account? Register
        </Link>
      </Grid>
    </Grid>
  </Grid>

        <br/>
      <Typography 
        variant="caption" 
        color="textSecondary" 
        style={{ marginBottom: '20px'}}
      >
        © 2023 Hemlock Software
      </Typography>
      </Box>
      <br/>
      </Paper>
      </Container>
    </center>
  )
}

export default Login