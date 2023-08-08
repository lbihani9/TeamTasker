import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import contents from './NavbarContent';
import Logout from '../Logout';
import NavbarItem from './NavbarItem';
import TeamTaskerLogo from '../../assets/TeamTasker-1.png';
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemAvatar } from '@mui/material';

const drawerWidth = 240;

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Navbar = (props) => {
  return (
    <Drawer variant='permanent'>
      <List>
        <Logo />
        {contents.map((content, index) => {
          return (
            <NavbarItem
              {...{
                ...content,
                index,
                activeIndex: props.activeIndex,
                key: index + 1,
                handleItemClick: (e) => props.handleDrawerOpen(e, index),
              }}
            />
          );
        })}
        <Logout />
      </List>
    </Drawer>
  );
};

const Logo = () => {
  return (
    <ListItem
      key='TeamTasker'
      sx={{ display: 'block' }}
      disablePadding
    >
      <ListItemAvatar>
        <Avatar
          alt='TeamTasker'
          sx={{
            marginTop: '0.7em',
            width: '2.8em',
            height: '2.8em',
            justifyContent: 'center',
          }}
          src={TeamTaskerLogo}
        />
      </ListItemAvatar>
    </ListItem>
  );
};

export default Navbar;
