import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

const handleLogIn = async () => {
  try {
    const { data } = await axios.get(`/auth/login`);
    window.location.href = data.data.url;
  } catch (err) {
    console.log(err);
    // TODO: Toast notification
  }
};

const LoginWithGoogle = props => {
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
      onClick={handleLogIn}
    >
      <GoogleIcon color='error' /> &nbsp; Continue with Google
    </Paper>
  );
};

LoginWithGoogle.propTypes = {};

export default LoginWithGoogle;
