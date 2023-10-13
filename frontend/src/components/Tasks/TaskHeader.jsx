import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const TaskHeader = ({ task, updateTask }) => {
  const [newTitle, setNewTitle] = useState('');
  const [shouldEdit, setShouldEdit] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEditClick = (e) => {
    setShouldEdit(true);
    setNewTitle(task?.name ?? '');
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleCancelUpdate = (e) => {
    setShouldEdit(false);
    setNewTitle('');
  };

  const updateTitle = async (e) => {
    const body = {
      name: newTitle,
    };

    await updateTask(body, task?.id);
    handleCancelUpdate();
  };

  return (
    <Grid
      item
      xs={12}
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      columnGap='0.7rem'
    >
      {!shouldEdit && (
        <>
          <Typography
            variant='h3'
            component='h3'
            sx={{
              fontFamily: 'Poppins',
            }}
          >
            {task?.name}
          </Typography>

          <Button
            color='success'
            variant='contained'
            size='medium'
            sx={{
              height: '2rem',
              fontFamily: 'Poppins',
              borderRadius: '0.5em',
            }}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </>
      )}

      {shouldEdit && (
        <>
          <TextField
            variant='outlined'
            size='small'
            value={newTitle}
            onChange={handleChange}
            sx={{
              width: '80%',
            }}
          />

          <Stack
            direction={!isMobile ? 'row' : 'column'}
            spacing={0.8}
          >
            <Button
              variant='outlined'
              size='small'
              color='error'
              onClick={handleCancelUpdate}
              sx={{
                height: '2rem',
                fontFamily: 'Poppins',
                borderRadius: '0.5em',
              }}
            >
              Cancel
            </Button>

            <Button
              variant='contained'
              size='small'
              color='success'
              onClick={updateTitle}
              disabled={newTitle === (task?.name ?? '')}
              sx={{
                height: '2rem',
                fontFamily: 'Poppins',
                borderRadius: '0.5em',
              }}
            >
              Save
            </Button>
          </Stack>
        </>
      )}
    </Grid>
  );
};

TaskHeader.propTypes = {
  task: PropTypes.object,
  updateTask: PropTypes.func,
};

export default TaskHeader;
