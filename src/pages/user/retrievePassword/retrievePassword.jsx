import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { RetrievePassword, SendMail } from '../../../services/api'

export default function Retrivepassword() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const mailData = {
    mail: name,
    type: 2,
  };

  const submitData = {
    mail: name,
    password: password,
    verifyCode: code,
  };

  const getCode = async () => {
    SendMail(mailData).then(res=>{
      console.log(res);
    });
  };

  const submit = async () => {
    RetrievePassword(submitData).then(res=>{
      console.log(res)
    })
  }

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
            <TextField id="standard-basic" label="E-mail address" variant="standard" onChange={(e) => setName(e.target.value)}/>
            <br/>
            <Button size='small' onClick={getCode}>Get code</Button>
            <br/>
            <TextField id="standard-basic" label="Varification code" variant="standard" onChange={(e) => setCode(e.target.value)}/>
            <br/>
            <TextField id="standard-basic" label="New password" variant="standard" onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <TextField id="standard-basic" label="Repeat password" variant="standard" />
            <br/>
            <Button onClick={submit}>Submit</Button>
          </Box>
          <br/>
        </Paper>
      </Container>
    </center>
  );
}