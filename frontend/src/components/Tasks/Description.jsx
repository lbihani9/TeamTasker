import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Paper, Stack, TextField } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TaskDescriptionMenu from './TaskDescriptionMenu';

const Description = ({ task, updateTask }) => {
  const [newDescription, setNewDescription] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [shouldEdit, setShouldEdit] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleEditClick = (e) => {
    setShouldEdit(true);
    handleClose();
    setNewDescription(task?.description ?? '');
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const cancelDescriptionChange = (e) => {
    setShouldEdit(false);
    setNewDescription('');
  };

  const updateDescription = async (e) => {
    const body = {
      description: newDescription,
    };

    await updateTask(body, task?.id);
    cancelDescriptionChange();
  };

  return (
    <Stack
      direction='row'
      width='80%'
      spacing={1}
      mb='3rem'
    >
      <Avatar src='/broken-image.jpg' />

      {!shouldEdit && (
        <Stack width='100%'>
          <Box
            sx={{
              width: '100%',
              height: '1.7rem',
              border: '1px solid #bdbdbd',
              borderBottom: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '0.2rem',
              pr: '0.5rem',
            }}
          >
            <MoreHorizIcon
              fontSize='small'
              sx={{
                cursor: 'pointer',
              }}
              onClick={handleClick}
            />
          </Box>

          <TextField
            sx={{
              width: '100%',
            }}
            placeholder='Add description ...'
            variant='outlined'
            multiline
            minRows={4}
            disabled={!shouldEdit}
            value={task?.description}
          />
        </Stack>
      )}

      {shouldEdit && (
        <Stack
          spacing={1}
          sx={{
            width: '100%',
            padding: '1rem',
          }}
          component={Paper}
        >
          <TextField
            variant='outlined'
            multiline
            minRows={4}
            value={newDescription}
            onChange={handleDescriptionChange}
          />

          <Box
            display='flex'
            justifyContent='flex-end'
            gap='0.4rem'
          >
            <Button
              variant='outlined'
              color='error'
              sx={{
                height: '2rem',
                fontFamily: 'Poppins',
                borderRadius: '0.5em',
              }}
              onClick={cancelDescriptionChange}
            >
              Cancel
            </Button>

            <Button
              variant='contained'
              color='success'
              sx={{
                height: '2rem',
                fontFamily: 'Poppins',
                borderRadius: '0.5em',
              }}
              onClick={updateDescription}
              disabled={newDescription === (task?.description ?? '')}
            >
              Comment
            </Button>
          </Box>
        </Stack>
      )}

      {anchorEl && (
        <TaskDescriptionMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleEditClick={handleEditClick}
        />
      )}
    </Stack>
  );
};

Description.propTypes = {
  task: PropTypes.object,
  updateTask: PropTypes.func,
};

export default Description;
