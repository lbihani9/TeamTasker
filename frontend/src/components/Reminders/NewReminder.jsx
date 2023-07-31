import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { DataSaverOnIcon } from '../Icons';

const NewReminder = props => {
  return (
    <Box
      sx={{
        width: '60%',
        height: '5em',
        border: '1px solid black',
        borderRadius: '1em',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: '#e6be8a',
        backgroundColor: '#fffde7',
      }}
    >
      <DataSaverOnIcon
        style={{
          fontSize: '3em',
          color: '#e6be8a',
        }}
      />

      <Typography
        sx={{
          fontFamily: 'Poppins',
          transition: 'text-decoration 0.5s cubic-bezier(0, 0, 0.91, 0.31)',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Add a reminder
      </Typography>
    </Box>
  );
};

NewReminder.propTypes = {};

export default NewReminder;
