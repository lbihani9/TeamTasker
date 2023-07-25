import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import TopContent from './TopContent';
import BottomContent from './BottomContent';
import { useSelector } from 'react-redux';

const MainContent = (props) => {
  const layout = useSelector((state) => state.layouts.layout);

  return (
    <Grid
      item
      {...layout.centerContent}
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
