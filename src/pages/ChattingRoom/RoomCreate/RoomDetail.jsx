import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useStoreActions, useStoreState } from 'easy-peasy';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function RoomDetail() {

  const {
    nameFlag,
    errorNameMsg,
    showPassword,
    passwordFlag,
    errorPasswordMsg,
    maxUserNumberFlag,
    errorMaxUserNumberMsg,
  } = useStoreState((state) => state.roomCreateModel)
  const {
    setState,
    onNameChange,
    onPasswordChange,
    onMaxUserNumberChange,
  } = useStoreActions((actions) => actions.roomCreateModel)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom ml={6}>
        Room information
      </Typography>
      <Grid container spacing={3} ml={3}>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            fullWidth
            id="roomName"
            label={nameFlag ? 'Room name' : errorNameMsg}
            variant="standard"
            onChange={(e) => onNameChange(e.target.value)}
            error={!nameFlag}
          />
        </Grid>
        <Grid item xs={7}>
          <FormControl sx={{ m: 0 }} fullWidth variant="standard">
            <InputLabel htmlFor="password" error={!passwordFlag}>
              {passwordFlag ? 'Password' : errorPasswordMsg}
            </InputLabel>
            <Input
            id="password"
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
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="maxusers"
            name="maxusers"
            label={ maxUserNumberFlag ? "Maximum number of users" : errorMaxUserNumberMsg}
            fullWidth
            variant="standard"
            error={!maxUserNumberFlag}
            onChange={(e) => onMaxUserNumberChange(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
