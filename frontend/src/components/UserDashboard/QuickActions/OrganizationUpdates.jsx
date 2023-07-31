import React from 'react';
import { Box, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import { data } from './mockDeadlineData';

const OrganizationUpdates = props => {
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
        borderColor: 'blue',
        backgroundColor: '#e1f5fe',
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
        <TimelineIcon
          sx={{
            color: 'blue',
          }}
          fontSize='large'
        />
        &nbsp; Hot in organizations
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

OrganizationUpdates.propTypes = {};

export default OrganizationUpdates;
