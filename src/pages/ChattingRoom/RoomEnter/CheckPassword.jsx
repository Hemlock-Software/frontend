import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function CheckPassword() {

    const {
      passwordFlag,
      errorPasswordMsg,
    } = useStoreState((state) => state.roomEnterModel)
    const {
        onPasswordChange,
      } = useStoreActions((actions) => actions.roomEnterModel)

    return(
        <React.Fragment>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                 Check Password(If Public, Click Create)
            </Typography>
            <Grid container spacing={3} ml={3}>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            fullWidth
            id="password"
            label={passwordFlag ? 'enter password' : errorPasswordMsg}
            variant="standard"
            onChange={(e) => onPasswordChange(e.target.value)}
            error={!passwordFlag}
          />
            </Grid>
        </Grid>

            
        </React.Fragment>
    );
}  