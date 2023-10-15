import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TaskDescriptionMenu from './TaskDescriptionMenu';

const Description = ({ task, updateTask }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
      {!isMobile && (
        <Avatar src={task?.taskAuthor.avatar ?? '/broken-image.jpg'} />
      )}

      {!shouldEdit && (
        <Stack width='100%'>
          <Box
            sx={{
              width: '100%',
              border: '1px solid #bdbdbd',
              borderBottom: 0,
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.2rem',
              p: '0.5rem',
              borderTopLeftRadius: '0.5rem',
              borderTopRightRadius: '0.5rem',
            }}
          >
            <Typography
              variant='body2'
              component='p'
            >
              {task?.taskAuthor.name}
            </Typography>
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
              '.MuiInputBase-root': {
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                borderTop: 0,
                borderBottomLeftRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
              },
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
            borderRadius: '0.5rem',
          }}
          component={Paper}
        >
          <TextField
            variant='outlined'
            sx={{
              '.MuiInputBase-root': {
                color: '#616161',
              },
            }}
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
