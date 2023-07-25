import React from 'react';
import { Box, Typography } from '@mui/material';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';
import { data } from './mockDeadlineData';

const Deadlines = props => {
  return (
    <Box
      sx={{
        width: '90%',
        maxHeight: '18em',
        borderRadius: '1em',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        padding: '1em',
        borderColor: 'orange',
        backgroundColor: '#fff3e0',
        overflow: 'auto',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '1.2em',
          display: 'flex',
          alignItems: 'center',
          mb: '0.8em',
        }}
      >
        <TimerSharpIcon
          sx={{
            color: 'orange',
          }}
          fontSize='large'
        />
        &nbsp; Deadlines in next 24 hours
      </Typography>

      {data.map((datum, index) => {
        return (
          <Typography
            key={index}
            sx={{
              fontFamily: 'Poppins',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {index + 1}. {datum}
          </Typography>
        );
      })}
    </Box>
  );
};

Deadlines.propTypes = {};

export default Deadlines;
