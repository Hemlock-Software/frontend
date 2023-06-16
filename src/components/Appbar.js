import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useCookies } from 'react-cookie'

export default function MyAppBar() {

  const navigate = useNavigate()
  const [Cookie, setCookie] = useCookies(['E-mail'])

  function JumpLogin() {
    navigate('/login')
  }

  function Jumpregister() {
    navigate('/register')
  }

  const Logout = () => {
    setCookie('E-mail', '', { expires: new Date(0) });
    navigate('/login')
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
          {Cookie['E-mail'] ? (
            <React.Fragment>
              <Button color="inherit">{Cookie['E-mail'].nickname}</Button>
              <Button color="inherit" onClick={Logout}>Log out</Button>
            </React.Fragment>) : (
            <React.Fragment>
              <Button color="inherit" onClick={JumpLogin}>Log in</Button>
              <Button color="inherit" onClick={Jumpregister}>Register</Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
