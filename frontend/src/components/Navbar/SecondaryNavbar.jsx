import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton } from '@mui/material';
import contents from './NavbarContent';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const SecondaryNavbar = (props) => {
  const layout = useSelector((state) => state.layouts.layout);

  return (
    <Grid
      item
      {...layout.secondaryNavbar}
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
  closeSecondaryNavbar: PropTypes.func,
};

export default SecondaryNavbar;
