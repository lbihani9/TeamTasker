import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const initialState = {
  name: '',
  username: '',
  email: '',
  description: '',
};

const NewOrganizationModal = ({ handleClose, handleCreate }) => {
  const [fields, setFields] = useState(initialState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
  };

  const shouldDisable = () => {
    const { name, email, username } = fields;
    return name === '' || email === '' || username === '';
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth='md'
      fullScreen={isMobile}
    >
      <DialogTitle>New organization</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <TextField
            type='text'
            name='name'
            label='Name'
            value={fields?.name}
            onChange={handleChange}
            size='small'
            variant='outlined'
            required
          />

          <TextField
            type='text'
            name='username'
            label='Username'
            value={fields?.username}
            onChange={handleChange}
            size='small'
            variant='outlined'
            required
          />

          <TextField
            type='email'
            name='email'
            label='Email'
            value={fields?.email}
            onChange={handleChange}
            size='small'
            variant='outlined'
            required
          />

          <TextField
            type='text'
            name='description'
            label='Description'
            value={fields?.description}
            onChange={handleChange}
            size='small'
            variant='outlined'
            multiline
            minRows={3}
            placeholder='Description (Optional)'
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant='outlined'
          color='error'
          size='small'
          sx={{
            borderRadius: '0.5em',
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          onClick={(e) => handleCreate(fields)}
          variant='contained'
          color='success'
          size='small'
          sx={{
            borderRadius: '0.5em',
          }}
          disabled={shouldDisable()}
          autoFocus
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NewOrganizationModal.propTypes = {
  handleChange: PropTypes.func,
  handleCreate: PropTypes.func,
};

export default NewOrganizationModal;
