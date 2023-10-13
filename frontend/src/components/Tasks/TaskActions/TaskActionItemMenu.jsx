import React from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener, Grow, Paper, Popper } from '@mui/material';

const TaskActionItemMenu = ({ anchorEl, handleItemMenuClose, children }) => {
  return (
    <Popper
      sx={{
        zIndex: 1,
        width: '25rem',
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      role={undefined}
      placement='bottom-start'
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
            <ClickAwayListener onClickAway={handleItemMenuClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

TaskActionItemMenu.propTypes = {};

export default TaskActionItemMenu;
