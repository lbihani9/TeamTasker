import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

const MainContent = props => {
  return (
    <Grid
      item
      md={8}
    >
      Main Content
    </Grid>
  );
};

MainContent.propTypes = {
  activeIndex: PropTypes.number,
};

export default MainContent;
