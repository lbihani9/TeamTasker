import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const LoginWithGithub = props => {
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
      <GitHubIcon color='secondary' /> &nbsp; Continue with Github
    </Paper>
  );
};

LoginWithGithub.propTypes = {};

export default LoginWithGithub;
