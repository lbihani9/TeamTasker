import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';

const NavbarItem = (props) => {
  return (
    <ListItem
      key={props.name}
      sx={{ display: 'block' }}
      onClick={props.handleItemClick}
      disablePadding
    >
      <Tooltip
        title={props.name}
        placement='right'
        followCursor
      >
        <ListItemButton
          sx={{
            color: '#808080',
            minHeight: 48,
            justifyContent: 'initial',
            px: 2.5,
            ...(props.index === props.activeIndex && {
              borderLeft: 'thick solid #2196f3',
              color: '#2196f3',
            }),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: 'center',
            }}
          >
            {props.icon}
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

NavbarItem.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.element,
  index: PropTypes.number,
  activeIndex: PropTypes.number,
  handleItemClick: PropTypes.func,
};

export default NavbarItem;
