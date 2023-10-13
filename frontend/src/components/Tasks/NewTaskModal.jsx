import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import usePostTask from '../../hooks/usePostTask';

const Transition = React.forwardRef((props, ref) => {
  return (
    <Slide
      direction='down'
      ref={ref}
      {...props}
    />
  );
});

export const NewTaskModal = ({
  open,
  handleClose,
  taskableType = null,
  taskableId = null,
}) => {
  const [fields, setFields] = useState({ name: '' });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { loading, postTask } = usePostTask();

  const hasAtleastOneEmptyField = () => {
    return fields.name === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreation = async (e) => {
    const body = { ...fields };
    if (taskableType) {
      body.taskableType = taskableType;
      body.taskableId = taskableId;
    }

    await postTask(body, taskableType);
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Poppins',
        }}
      >
        New Task
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1em',
        }}
      >
        <TextField
          label='Task name'
          variant='standard'
          type='string'
          name='name'
          value={fields.name}
          onChange={handleChange}
          required
        />

        <Button
          size='small'
          onClick={handleCreation}
          disabled={hasAtleastOneEmptyField()}
          variant='contained'
          color='success'
          sx={{
            gap: '1em',
            fontFamily: 'Poppins',
          }}
        >
          {loading && (
            <CircularProgress
              size='2em'
              thickness='5'
            />
          )}
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};

NewTaskModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
