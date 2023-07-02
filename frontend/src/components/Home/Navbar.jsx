import React from 'react';
import PropTypes from 'prop-types';
import TeamTaskerLogo from '../../assets/TeamTasker-3.png';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

const Navbar = props => {
  return (
    <Grid
      container
      sx={{
        p: 1,
      }}
    >
      <Grid
        item
        xs={1}
      >
        <Logo />
      </Grid>

      <Button
        variant='contained'
      >
        Log in
      </Button>
    </Grid>
  );
};

const Logo = () => {
  return (
    <img
      src={TeamTaskerLogo}
      style={{
        borderRadius: '1rem',
        width: '7rem',
        height: '7rem',
      }}
    />
  );
};
Navbar.propTypes = {};

export default Navbar;
