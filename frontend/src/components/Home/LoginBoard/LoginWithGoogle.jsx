import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import useUserInfo from '../../../hooks/useUserInfo';

const LoginWithGoogle = props => {
  const { login } = useUserInfo();

  return (
    <Paper
      elevation={1}
      sx={{
        height: 'fit-content',
        width: '80%',
        padding: '1em',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4em',
        cursor: 'pointer',
        border: '0.1em solid darkgrey',
      }}
      onClick={login}
    >
      <GoogleIcon color='error' /> &nbsp; Continue with Google
    </Paper>
  );
};

LoginWithGoogle.propTypes = {};

export default LoginWithGoogle;
