import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function Retrivepassword() {
  return (
    <center>
      <br />
      <Container maxWidth="sm" sx = {{ mt : 1}}>
        <Paper elevation={4}>
          <br/>
          <Typography variant="h3" gutterBottom color={'#1976d2'}>
            Retrive Password
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '20ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" label="E-mail address" variant="standard" />
            <br/>
            <Button size='small'>Get code</Button>
            <br/>
            <TextField id="standard-basic" label="Varification code" variant="standard" />
            <br/>
            <TextField id="standard-basic" label="New password" variant="standard" />
            <br/>
            <TextField id="standard-basic" label="Repeat password" variant="standard" />
            <br/>
            <Button>Submit</Button>
          </Box>
          <br/>
        </Paper>
      </Container>
    </center>
  );
}