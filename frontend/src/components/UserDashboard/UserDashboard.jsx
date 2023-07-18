import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import { Grid } from '@mui/material';
import SecondaryNavbar from '../Navbar/SecondaryNavbar';

const UserDashboard = props => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const closeSecondaryNavbar = e => setActiveIndex(-1);

  return (
    <Grid
      container
      sx={{
        height: '100vh',
      }}
    >
      <Navbar
        {...{
          activeIndex,
          setActiveIndex,
        }}
      />

      {activeIndex !== -1 && (
        <SecondaryNavbar
          {...{
            activeIndex,
            setActiveIndex,
            closeSecondaryNavbar,
          }}
        />
      )}
    </Grid>
  );
};

UserDashboard.propTypes = {};

export default UserDashboard;
