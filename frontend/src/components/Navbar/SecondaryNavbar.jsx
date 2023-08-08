import React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import contents from './NavbarContent';

const drawerWidth = 245;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  color: 'black',
}));

const SecondaryNavbar = ({ open, handleDrawerClose, activeIndex }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            left: `calc(${theme.spacing(7)} + 1px)`,
            [theme.breakpoints.up('sm')]: {
              left: `calc(${theme.spacing(8)} + 1px)`,
            },
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        {activeIndex >= 0 && contents[activeIndex].secondaryMenuComponent}
      </Drawer>
    </Box>
  );
};

SecondaryNavbar.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  activeIndex: PropTypes.number,
};

export default SecondaryNavbar;
