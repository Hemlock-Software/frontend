import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useCookies } from 'react-cookie';
import { Label } from '@mui/icons-material';

export default function MyAppBar() {

  const navigate = useNavigate();
  const [Cookie] = useCookies(['E-mail']);

  function JumpLogin() {
    navigate('/login');
  }

  function Jumpregister() {
    navigate('/register');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {Cookie['E-mail'] ? (<Label>{JSON.parse(Cookie['E-mail'])}.nickname</Label>) : (
            <React.Fragment>
              <Button color="inherit" onClick={JumpLogin}>Login</Button>
              <Button color="inherit" onClick={Jumpregister}>Register</Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

