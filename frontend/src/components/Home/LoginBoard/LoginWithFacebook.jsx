import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';

const LoginWithFacebook = props => {
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
        cursor: 'not-allowed',
        border: '0.1em solid darkgrey',
        backgroundColor: 'darkgrey'
      }}
    >
      <FacebookIcon color='primary' /> &nbsp; Continue with Facebook
    </Paper>
  );
};

LoginWithFacebook.propTypes = {};

export default LoginWithFacebook;
