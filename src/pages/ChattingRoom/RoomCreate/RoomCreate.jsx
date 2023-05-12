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
import RoomDetail from './RoomDetail';
import Review from './Review';
import { useNavigate } from 'react-router'
import { useStoreActions, useStoreState } from 'easy-peasy';

const steps = ['Room Detail', 'Review your settings'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <RoomDetail />;
    case 1:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function RoomCreate() {

  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate()
  const {
    name,
    nameFlag,
    passwordFlag,
    maxUserNumberFlag,
  } = useStoreState((state) => state.roomCreateModel)
  const {
    create,
  } = useStoreActions((actions) => actions.roomCreateModel)

  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      if (nameFlag && passwordFlag && maxUserNumberFlag && name !== "") {
        setActiveStep(activeStep + 1);
      } else {
        alert('Please enter the valid information!')
      }
    } else {
      create()
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
            Create Room
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, pl: 6, pr: 3 }}>
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
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

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
