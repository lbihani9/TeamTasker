import React from 'react';
import { Box, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

export const FilterButton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        fontFamily: 'inherit',
        gap: '0.2em',
        cursor: 'pointer'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'inherit',
        }}
      >
        Filters
      </Typography>
    </Box>
  );
};
