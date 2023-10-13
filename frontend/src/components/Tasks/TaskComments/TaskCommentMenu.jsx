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

const TaskCommentMenu = ({
  anchorEl,
  handleClose,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <Popper
      sx={{
        zIndex: 1,
        width: '5rem',
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
                <MenuItem
                  key={2}
                  onClick={handleDeleteClick}
                  sx={{
                    color: 'red',
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

TaskCommentMenu.propTypes = {
  anchorEl: PropTypes.string,
  handleClose: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
};

export default TaskCommentMenu;
