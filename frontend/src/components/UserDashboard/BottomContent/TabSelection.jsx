import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

export const TabSelection = () => {
  return (
    <Box
      sx={{
        height: '2.8em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        fontFamily: 'Poppins',
      }}
    >
      <Typography
        sx={{
          height: 'inherit',
          fontFamily: 'inherit',
          color: 'black',
          fontWeight: 500,
          borderBottom: 'thick solid #2196f3',
          alignSelf: 'end',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        Tasks
      </Typography>

      <Button
        variant='contained'
        size='small'
        sx={{
          fontFamily: 'inherit',
          color: 'black',
          backgroundColor: '#f5f5f5',
          borderRadius: '0.5em',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
        startIcon={<AddIcon />}
      >
        New project
      </Button>
    </Box>
  );
};
