import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { Button, DialogActions, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import usePostProject from '../../hooks/usePostProject';
import TTBackdrop from '../Templates/TTBackdrop';

const Transition = React.forwardRef((props, ref) => {
  return (
    <Slide
      direction='down'
      ref={ref}
      {...props}
    />
  );
});

export const NewProjectModal = ({
  open,
  handleClose,
  projectableType = null,
  projectableId = null,
}) => {
  const [fields, setFields] = useState({
    name: '',
    description: '',
  });
  const { postProject, loading } = usePostProject();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

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
    if (body.description.length > 255) {
      alert('The limit for description is 255 characters.');
      return;
    }

    if (projectableType) {
      body.projectableType = projectableType;
      body.projectableId = projectableId;
    }
    await postProject(body, projectableType);
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth='md'
    >
      {loading && <TTBackdrop open={loading} />}
      <DialogTitle
        sx={{
          fontFamily: 'Poppins',
        }}
      >
        New Project
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        <TextField
          label='Project name'
          variant='outlined'
          type='string'
          name='name'
          value={fields?.name}
          onChange={handleChange}
          required
        />

        <TextField
          helperText={`${255 - fields?.description.length} characters left.`}
          label='Description'
          variant='outlined'
          placeholder='Description (optional). Max limit is 255 characters.'
          type='string'
          name='description'
          value={fields?.description}
          onChange={handleChange}
          multiline
          minRows={3}
        />
      </DialogContent>

      <DialogActions>
        <Button
          size='small'
          onClick={handleCreation}
          disabled={hasAtleastOneEmptyField()}
          variant='contained'
          color='success'
          sx={{
            gap: '1em',
            fontFamily: 'Poppins',
            borderRadius: '0.5em',
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
      </DialogActions>
    </Dialog>
  );
};

NewProjectModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
