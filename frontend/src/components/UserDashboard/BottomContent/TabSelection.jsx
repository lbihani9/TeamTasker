import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NewProjectButton } from '../../Projects/NewProjectButton';
import { NewTaskButton } from '../../Tasks/NewTaskButton';
import ResponsiveHorizontalButtonGroup from '../../Templates/ResponsiveHorizontalButtonGroup';

export const TabSelection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

      <ResponsiveHorizontalButtonGroup>
        <NewTaskButton name='New Task' />
        <NewProjectButton name='New Project' />
      </ResponsiveHorizontalButtonGroup>
    </Box>
  );
};
