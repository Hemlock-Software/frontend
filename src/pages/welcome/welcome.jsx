import React from 'react';
import{ useEffect } from 'react';
import { Grid } from '@mui/material';
import logo from '../../assets/logo.png';
import background from '../../assets/background.jpg';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Welcome() {

  const navigate = useNavigate();

  function submitLogin() {
    navigate('/login')
  }

  function submitRegister(){
    navigate('/register')
  }

  useEffect(() => {
    const hasCookie = document.cookie.includes('E-mail');
    if (hasCookie) {
      navigate('/room/main')
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', textAlign: 'center', 
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid>
        <img src={logo} alt="My Logo" style={{ width: '150px', height: '150px'}} />
      </Grid>
      <Grid>
        <h1 style={{ fontFamily: '"Segoe UI Emoji"' , fontSize: '48px', fontColor: '#66CCFF'}}>
          Welcome to HemLock Chat!
        </h1>
      </Grid>
      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '20px'}}>© 2023 The Website designed by G01</Typography>
      <Grid>
        <Button variant="contained" color="primary" onClick={submitLogin}>
          Login
        </Button>
        <span style={{ margin: '0 10px' }}></span>
        <Button variant="outlined" color="primary" onClick={submitRegister}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
}
export default Welcome