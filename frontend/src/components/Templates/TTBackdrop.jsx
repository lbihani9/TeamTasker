import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@mui/material';

const TTBackdrop = ({ open }) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 100 
      }}
      open={open}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

TTBackdrop.propTypes = {
  open: PropTypes.bool,
};

export default TTBackdrop;
