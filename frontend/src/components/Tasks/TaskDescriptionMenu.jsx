import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import {
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';

const TaskDescriptionMenu = ({ anchorEl, handleClose, handleEditClick }) => {
  return (
    <Popper
      sx={{
        zIndex: 1,
        width: '9rem',
        border: '1px solid black',
        borderRadius: '0.4rem',
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      role={undefined}
      placement='left-start'
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList>
                <MenuItem
                  key={1}
                  onClick={handleEditClick}
                >
                  Edit
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

TaskDescriptionMenu.propTypes = {
  anchorEl: PropTypes.string,
  handleClose: PropTypes.func,
  handleEditClick: PropTypes.func,
};

export default TaskDescriptionMenu;
