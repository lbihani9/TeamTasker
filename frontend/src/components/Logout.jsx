import React from 'react';
import { Avatar, ListItem, ListItemAvatar } from '@mui/material';

const Logout = (props) => {
  return (
    <ListItem
      sx={{
        display: 'block',
        position: 'absolute',
        top: '90vh',
        cursor: 'pointer',
      }}
      disablePadding
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            margin: 'auto',
          }}
          src={<span class='material-symbols-sharp'>account_circle</span>}
        />
      </ListItemAvatar>
    </ListItem>
  );
};

export default Logout;
