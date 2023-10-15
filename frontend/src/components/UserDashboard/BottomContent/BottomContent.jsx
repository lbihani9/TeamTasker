import React from 'react';
import { Box, Stack } from '@mui/material';
import { TabSelection } from './TabSelection';
import { Outlet } from 'react-router-dom';

const BottomContent = (props) => {
  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <TabSelection />

      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          overflowY: 'auto',
          width: '100%',
          height: 'inherit',
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};

BottomContent.propTypes = {};

export default BottomContent;
