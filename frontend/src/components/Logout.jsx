import React from 'react';
import { ListItem, ListItemButton, Tooltip } from '@mui/material';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = (props) => {
  const handleLogout = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.get(`/auth/logout`);
      window.location.href = `/${res.data.data.url}`;
    } catch (error) {
      console.log(error);
    }
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
