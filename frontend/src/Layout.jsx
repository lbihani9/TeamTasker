import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import SecondaryNavbar from './components/Navbar/SecondaryNavbar';
import Navbar from './components/Navbar/Navbar';
import useUserInfo from './hooks/useUserInfo';
import TTBackdrop from './components/Templates/TTBackdrop';

const Layout = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { loading } = useUserInfo();

  const handleDrawerOpen = (e, index) => {
    setOpen(true);
    setActiveIndex(index);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar
        {...{
          open,
          activeIndex,
          handleDrawerClose,
          handleDrawerOpen,
        }}
      />

      {loading && <TTBackdrop open={loading} />}

      <SecondaryNavbar
        open={open}
        handleDrawerClose={handleDrawerClose}
        activeIndex={activeIndex}
      />

      {!loading && (
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 1,
            height: '100vh',
          }}
        >
          <Outlet />
        </Box>
      )}
    </Box>
  );
};

export default Layout;
