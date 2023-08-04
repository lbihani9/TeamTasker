import React, { useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from '@mui/material';
import { NewTaskModal } from './NewTaskModal';

export const NewTaskButton = () => {
  const [open, setOpen] = useState(false);
  const handleClose = (e) => setOpen(false);

  return (
    <>
      <Button
        variant='contained'
        size='small'
        color='success'
        sx={{
          fontFamily: 'inherit',
          borderRadius: '0.5em',
        }}
        onClick={(e) => setOpen(!open)}
        startIcon={<AddTaskIcon />}
      >
        New Task
      </Button>

      {open && (
        <NewTaskModal
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
