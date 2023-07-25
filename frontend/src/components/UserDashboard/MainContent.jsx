import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import TopContent from './TopContent';
import BottomContent from './BottomContent';

const MainContent = (props) => {
  return (
    <Grid
      item
      md={8}
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

MainContent.propTypes = {
  activeIndex: PropTypes.number,
};

export default MainContent;
