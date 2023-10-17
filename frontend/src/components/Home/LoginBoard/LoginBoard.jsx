import React from 'react';
import { Grid, Stack } from '@mui/material';
import LoginWithGoogle from './LoginWithGoogle';

const Login = () => {
  return (
    <Grid
      item
      sm={5}
      sx={12}
      display='flex'
      flexDirection='row'
      width='100%'
    >
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        justifySelf='center'
        alignSelf='center'
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <LoginWithGoogle />
      </Stack>
    </Grid>
  );
};

export default Login;
