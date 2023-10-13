import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskActionItem from './TaskActionItem';
import { Box, Button, Chip, Stack, TextField } from '@mui/material';
import moment from 'moment';
import TaskActionItemMenu from './TaskActionItemMenu';

const DeadlineAI = ({ task, updateTask }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deadline, setDeadline] = useState(task?.deadline);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setDeadline(task?.deadline);
  };

  const handleChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleUpdate = async (e) => {
    const body = {
      deadline: moment(deadline).utc(),
    };
    await updateTask(body, task?.id);
    handleClose();
  };

  return (
    <>
      <TaskActionItem
        handleItemClick={handleClick}
        name='Deadline'
      >
        <Chip
          label={
            task?.deadline
              ? moment(task?.deadline).format('MMM Do YYYY, h:mm A')
              : 'No deadline'
          }
          size='small'
        />
      </TaskActionItem>

      <TaskActionItemMenu
        anchorEl={anchorEl}
        handleItemMenuClose={handleClose}
      >
        <Stack
          sx={{
            padding: '1rem',
            alignItems: 'space-between',
            justifyContent: 'space-between',
            height: '8rem',
          }}
        >
          <TextField
            type='datetime-local'
            value={deadline}
            onChange={(e) => handleChange(e)}
            size='small'
          />

          <Box
            display='flex'
            justifyContent='flex-end'
          >
            <Button
              variant='contained'
              size='small'
              color='success'
              onClick={handleUpdate}
              sx={{
                fontFamily: 'Poppins',
                borderRadius: '0.5em',
              }}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </TaskActionItemMenu>
    </>
  );
};

DeadlineAI.propTypes = {
  task: PropTypes.object,
  updateTask: PropTypes.func,
};

export default DeadlineAI;
