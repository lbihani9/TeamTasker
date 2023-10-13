import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { NewProjectModal } from './NewProjectModal';

export const NewProjectButton = () => {
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
        Project
      </Button>

      {open && (
        <NewProjectModal
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
