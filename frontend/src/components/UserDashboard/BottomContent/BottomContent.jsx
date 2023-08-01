import React from 'react';
import { Box, Table } from '@mui/material';
import { TabSelection } from './TabSelection';
import { ViewSelection } from './ViewSelection';

const BottomContent = (props) => {
  return (
    <Box
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
          pt: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <ViewSelection />
        <Table />
      </Box>
    </Box>
  );
};

BottomContent.propTypes = {};

export default BottomContent;
