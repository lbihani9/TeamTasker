import React from 'react';
import { Box, Typography } from '@mui/material';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Filters } from './Filters';

export const ViewSelection = () => {
  return (
    <Box
      sx={{
        height: '2.5em',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5em 1em 1em 1em',
          fontFamily: 'Poppins',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            fontFamily: 'inherit',
            gap: '0.2em',
          }}
        >
          <BackupTableIcon />
          <Typography
            sx={{
              fontFamily: 'inherit',
            }}
          >
            Table
          </Typography>
        </Box>

        <Filters />
      </Box>
    </Box>
  );
};
