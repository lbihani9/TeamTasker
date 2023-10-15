import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import LoginWithGoogle from './LoginWithGoogle';
import LoginWithFacebook from './LoginWithFacebook';
import LoginWithGithub from './LoginWithGithub';
import useUserInfo from '../../../hooks/useUserInfo';

const Login = () => {
  const { getLoginStatus } = useUserInfo();

  useEffect(() => {
    getLoginStatus();
    return () => {};
  }, []);

  return (
    <Grid
      item
      lg={4}
      sx={{
        position: 'relative',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: '20vw',
          height: '40vh',
          position: 'absolute',
          top: '15em',
          left: '3em',
          borderRadius: '2em',
          fontFamily: 'Poppins',
          fontWeight: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingTop: '2em',
        }}
      >
        <LoginWithGoogle />

        <Box
          sx={{
            mt: '2em',
            width: '50%',
            height: '0.01em',
            backgroundColor: 'darkgrey',
          }}
        />

        <Typography
          sx={{
            fontWeight: 400,
            color: 'darkgrey',
          }}
        >
          Other login methods coming soon!
        </Typography>

        <LoginWithFacebook />
        <LoginWithGithub />
      </Paper>
    </Grid>
  );
};

export default Login;
