import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
        startIcon={<AddIcon />}
      >
        Task
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
