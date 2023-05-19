import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoomEnterID from './RoomEnterID'
import CheckPassword from './CheckPassword';
import { useNavigate } from 'react-router'
import { useStoreActions, useStoreState } from 'easy-peasy';


const steps = ['Room Enter', 'Check password'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <RoomEnterID />;
    case 1:
      return <CheckPassword />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function RoomEnter() {

  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate()
  const {
    roomID,
  } = useStoreState((state) => state.roomEnterModel)
  const {
    Enter,
  } = useStoreActions((actions) => actions.roomEnterModel)

  const handleNext = () => {
    if(activeStep !== steps.length - 1)
    {
      if(roomID !== ""){
        if(roomID.length === 6)
        setActiveStep(activeStep + 1);
        else
        alert('Please enter the valid RoomID!')
      }else {
        alert('RoomID can not be void!')
      }
    }
    else
    {
      Enter().then((response) => {
        if (response.result === true){
          //成功加入
          navigate('/room/main')
          console.log("Enter Success")
        }
        else{
          console.log(response)
          alert(response.message)
        }
      })
      setActiveStep(activeStep + 1)
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);  
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper elevation={4} sx={{ my: { xs: 3, md: 6 }, p: { xs: 3, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Enter Room  
          </Typography>
          {/*step部分 */ }
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 , pl: 6, pr: 3}}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Button onClick={navigate('/room/main')}></Button>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && 
                (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )
                }

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
