import React from 'react';
import { ListItem, ListItemButton, Tooltip } from '@mui/material';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import useUserInfo from '../hooks/useUserInfo';

const Logout = (props) => {
  const { logout } = useUserInfo();
  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
  };

  return (
    <>
      <ListItem
        sx={{
          display: 'block',
          position: 'absolute',
          top: '90vh',
          cursor: 'pointer',
        }}
        disablePadding
      >
        <ListItemButton
          sx={{ display: 'flex', justifyContent: 'center' }}
          onClick={handleLogout}
        >
          <Tooltip title='Logout'>
            <LogoutIcon />
          </Tooltip>
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default Logout;
