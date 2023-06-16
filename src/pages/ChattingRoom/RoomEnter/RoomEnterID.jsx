import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function RoomEnterID() {

    const {
      idFlag,
      errorIdMsg,
    } = useStoreState((state) => state.roomEnterModel)
    const {
       onRoomIdChange,
      } = useStoreActions((actions) => actions.roomEnterModel)
    return(
        <React.Fragment>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                 RoomID
            </Typography>
            <Grid container spacing={3} ml={3}>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            fullWidth
            id="roomName"
            label={idFlag ? 'Room name' : errorIdMsg}
            variant="standard"
            onChange={(e) => onRoomIdChange(e.target.value)}
            error={!idFlag}
          />
            </Grid>
        </Grid>
        </React.Fragment>
    );
}
