import React from 'react';
import { Box, Typography } from '@mui/material';
import Groups3Icon from '@mui/icons-material/Groups3';
import { data } from './mockDeadlineData';

const TeamUpdates = props => {
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
        borderColor: 'pink',
        backgroundColor: '#fce4ec',
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
        <Groups3Icon
          sx={{
            color: 'pink',
          }}
          fontSize='large'
        />
        &nbsp; Team updates since your last visit
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

TeamUpdates.propTypes = {};

export default TeamUpdates;
