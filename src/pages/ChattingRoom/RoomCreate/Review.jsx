import * as React from 'react';
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
      <Typography variant="h5" gutterBottom>
        Room summary
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Room name
      </Typography>
      <Typography gutterBottom sx={{ ml : 4 }}>
        {name}
      </Typography>

      {/* <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Room ID
      </Typography>
      <Typography gutterBottom sx={{ ml : 4 }}>
        {roomID}
      </Typography> */}

      {password !== "" ? (
        <div><Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Password
      </Typography>
      <Typography gutterBottom sx={{ ml : 4 }}>
        {password}
      </Typography></div>
      ) : <div></div>}

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Maximum number of users
      </Typography>
      <Typography gutterBottom sx={{ ml : 4 }}>
        {maxUserNumber}
      </Typography>

    </React.Fragment>
  );
}
