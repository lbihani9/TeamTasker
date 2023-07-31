import React from 'react';
import { Grid } from '@mui/material';
import TopContent from './TopContent';
import BottomContent from './BottomContent';

const MainContent = (props) => {
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopContent />
      <BottomContent />
    </Grid>
  );
};

MainContent.propTypes = {};

export default MainContent;
