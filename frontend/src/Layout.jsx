import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import SecondaryNavbar from './components/Navbar/SecondaryNavbar';
import { Outlet } from 'react-router-dom';
import QuickActions from './components/UserDashboard/QuickActions';
import { setLayout } from './store/slices/layoutSlice';

const Layout = (props) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectPrimaryNavbarItem = (e, id) => {
    dispatch(
      setLayout({
        isSecondaryNavbarOpen: true,
      })
    );
    setActiveIndex(id);
  };

  const closeSecondaryNavbar = (e) => {
    dispatch(
      setLayout({
        isSecondaryNavbarOpen: false,
      })
    );
    setActiveIndex(-1);
  };

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
          selectPrimaryNavbarItem,
        }}
      />

      {activeIndex !== -1 && (
        <SecondaryNavbar
          {...{
            activeIndex,
            closeSecondaryNavbar,
          }}
        />
      )}

      <Outlet />
      <QuickActions activeIndex={activeIndex} />
    </Grid>
  );
};

Layout.propTypes = {};

export default Layout;
