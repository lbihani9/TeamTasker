import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const initialState = {
  name: null,
  description: null,
  color: null,
};

const NewLabelModal = ({
  handleClose,
  postLabel,
  labelableType = null,
  labelableId = null,
}) => {
  const [fields, setFields] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async (e) => {
    const body = { ...fields };
    if (labelableType) {
      body.labelableType = labelableType;
      body.labelableId = labelableId;
    }

    await postLabel(body);
    handleClose();
  };

  return (
    <Dialog
      open
      onClose={handleClose}
    >
      <DialogTitle>New label</DialogTitle>

      <DialogContent>
        <Box
          display='flex'
          justifyContent='flex-start'
          flexWrap='wrap'
          gap='1rem'
        >
          <TextField
            type='color'
            size='small'
            variant='outlined'
            name='color'
            sx={{
              cursor: 'pointer',
              width: '3rem',
            }}
            value={fields?.color}
            onChange={handleChange}
            required
          />

          <TextField
            label='Label name'
            type='text'
            size='small'
            variant='outlined'
            placeholder='Label name'
            name='name'
            value={fields?.name}
            onChange={handleChange}
            required
          />

          <TextField
            label='Description'
            type='text'
            size='small'
            variant='outlined'
            placeholder='Description (optional)'
            name='description'
            fullWidth
            multiline
            minRows={2}
            value={fields?.description}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          color='error'
          variant='outlined'
          size='small'
          sx={{
            fontFamily: 'Poppins',
            borderRadius: '0.5em',
          }}
        >
          Cancel
        </Button>

        <Button
          color='success'
          variant='contained'
          size='small'
          onClick={handleSave}
          autoFocus
          sx={{
            fontFamily: 'Poppins',
            borderRadius: '0.5em',
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NewLabelModal.propTypes = {};

export default NewLabelModal;
