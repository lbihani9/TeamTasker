import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { VideoCallIcon } from '../Icons';

const UpcomingMeetings = props => {
  return (
    <Box
      sx={{
        width: '15em',
        height: '5em',
        border: '1px solid black',
        borderRadius: '1em',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: '#43a047',
        backgroundColor: '#e8f5e9',
      }}
    >
      <VideoCallIcon
        style={{
          fontSize: '3em',
          color: '#43a047',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            '&:hover': {
              transition: 'text-decoration 1s cubic-bezier(0, 0, 0.91, 0.31)',
              textDecoration: 'underline',
            },
          }}
        >
          Start adhoc meeting
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Poppins',
            '&:hover': {
              transition: 'text-decoration 1s cubic-bezier(0, 0, 0.91, 0.31)',
              textDecoration: 'underline',
            },
          }}
        >
          Schedule a meeting
        </Typography>
      </Box>
    </Box>
  );
};

UpcomingMeetings.propTypes = {};

export default UpcomingMeetings;
