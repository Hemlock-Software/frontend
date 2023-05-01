import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Room summary
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Room name
      </Typography>
      <Typography gutterBottom sx={{ ml : 4 }}>
        _Dian__'s room
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Room ID
      </Typography>
      <Typography gutterBottom sx={{ ml : 4 }}>
        114514
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Password
      </Typography>
      <Typography gutterBottom sx={{ ml : 4 }}>
        1919
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Maximum number of users
      </Typography>
      <Typography gutterBottom sx={{ ml : 4 }}>
        810
      </Typography>

    </React.Fragment>
  );
}
