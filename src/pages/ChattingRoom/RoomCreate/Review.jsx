import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function Review() {

  const {
    roomID,
    name,
    password,
    maxUserNumber,
  } = useStoreState((state) => state.roomCreateModel)

  return (
    <React.Fragment>
      <Grid container spacing={3} ml={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom ml={6}>
            Room Summary
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} ml={6}>
            Room name
          </Typography>
          <Typography gutterBottom sx={{ ml: 10 }}>
            {name}
          </Typography>
        </Grid>

        {/* <Typography variant="h6" gutterBottom sx={{ mt: 2 }} ml={6}>
        Room ID
      </Typography>
      <Typography gutterBottom sx={{ ml : 10 }}>
        {roomID}
      </Typography> */}


        {password !== "" ? (
          <Grid item xs={12} sx={{ mt: 0 }}>
            <Typography variant="h6" gutterBottom sx={{ mt: 0 }} ml={6}>
              Password
            </Typography>
            <Typography gutterBottom sx={{ ml: 10 }}>
              {password}
            </Typography>
          </Grid>
        ) : <div></div>}

        <Grid item xs={12} sx={{ mt: 0 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 0 }} ml={6}>
            Maximum number of users
          </Typography>
          <Typography gutterBottom sx={{ ml: 10 }}>
            {maxUserNumber}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
