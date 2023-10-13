import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskActionItem from './TaskActionItem';
import TaskActionItemMenu from './TaskActionItemMenu';
import { Chip, MenuItem, MenuList } from '@mui/material';

const labels = [
  {
    name: 'Blocked',
  },
  {
    name: 'Database',
  },
  {
    name: 'Pending',
  },
];

const StatusAI = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <>
      <TaskActionItem
        handleItemClick={handleClick}
        name='Status'
      >
        {labels.map((label, index) => {
          return (
            <Chip
              label={label.name}
              size='small'
            />
          );
        })}
      </TaskActionItem>

      <TaskActionItemMenu
        anchorEl={anchorEl}
        handleItemMenuClose={handleClose}
      >
        <MenuList autoFocusItem>
          <MenuItem key={1}>Option 1</MenuItem>
          <MenuItem key={2}>Option 2</MenuItem>
          <MenuItem key={3}>Option 3</MenuItem>
        </MenuList>
      </TaskActionItemMenu>
    </>
  );
};

StatusAI.propTypes = {};

export default StatusAI;
