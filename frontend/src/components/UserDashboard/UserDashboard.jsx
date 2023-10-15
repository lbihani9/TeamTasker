import React from 'react';
import { Stack } from '@mui/material';
import TopContent from './TopContent/TopContent';
import BottomContent from './BottomContent/BottomContent';

const UserDashboard = (props) => {
  return (
    <Stack
      direction='column'
      sx={{
        height: '100%',
      }}
    >
      {/* <TopContent /> */}
      <BottomContent />
    </Stack>
  );
};

UserDashboard.propTypes = {};

export default UserDashboard;
