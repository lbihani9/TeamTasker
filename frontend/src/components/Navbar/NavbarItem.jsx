import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tooltip } from '@mui/material';

const NavbarItem = props => {
  return (
    <Tooltip
      title={props.name}
      placement='right'
      followCursor
    >
      <div
        style={{
          width: '100%',
          padding: '1.5em',
          borderRadius: '0.2em',
          color: '#808080',
          cursor: 'pointer',
          ...(props.index === props.activeIndex && {
            borderLeft: 'thick solid #0000FF',
            color: '#0000FF',
          }),
        }}
        onClick={props.handleItemClick}
      >
        {props.icon}
      </div>
    </Tooltip>
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
