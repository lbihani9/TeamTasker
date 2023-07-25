import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton } from '@mui/material';
import contents from './NavbarContent';
import CloseIcon from '@mui/icons-material/Close';

const SecondaryNavbar = props => {
  return (
    <Grid
      item
      md={1.5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        borderRight: 'thin solid #808080',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0.5em',
        }}
      >
        <IconButton onClick={props.closeSecondaryNavbar}>
          <CloseIcon />
        </IconButton>
      </Box>

      {contents[props.activeIndex].secondaryMenuItem}
    </Grid>
  );
};

SecondaryNavbar.propTypes = {
  activeIndex: PropTypes.number,
  setActiveIndex: PropTypes.func,
  closeSecondaryNavbar: PropTypes.func,
};

export default SecondaryNavbar;
