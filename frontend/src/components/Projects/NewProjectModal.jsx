import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef((props, ref) => {
  return (
    <Slide
      direction='down'
      ref={ref}
      {...props}
    />
  );
});

const createProject = async (body) => {
  try {
    const res = await axios.post(`/api/v1/projects`, body);
  } catch (err) {
    console.log(err);
  }
};

export const NewProjectModal = ({ open, handleClose }) => {
  const [fields, setFields] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    await createProject(fields);
    setLoading(false);
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
        New Project
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

NewProjectModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
