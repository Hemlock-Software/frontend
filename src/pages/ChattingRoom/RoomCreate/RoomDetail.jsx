import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function RoomDetail() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom ml={6}>
        Room information
      </Typography>
      <Grid container spacing={3} ml={3}>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            id="roomName"
            name="roomName"
            label="Room name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="password"
            name="password"
            label="Password"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="maxusers"
            name="maxusers"
            label="Maximum number of users"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
