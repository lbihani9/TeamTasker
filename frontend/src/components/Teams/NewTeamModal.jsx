import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import usePostTeam from '../../hooks/usePostTeam';

const initialState = {
  name: '',
  desription: '',
};

const NewTeamModal = ({ handleClose }) => {
  const { loading, postTeam } = usePostTeam();
  const [fields, setFields] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
  };

  const shouldDisable = () => {
    return fields?.name === '';
  };

  const handleCreate = async (e) => {
    const body = { ...fields };
    await postTeam(body);
    handleClose();
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle>New Team</DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
        }}
      >
        <TextField
          type='text'
          name='name'
          value={fields?.name}
          onChange={handleChange}
          size='small'
          variant='outlined'
          label='Name'
          required
        />

        <TextField
          type='text'
          name='description'
          value={fields?.desription}
          onChange={handleChange}
          size='small'
          variant='outlined'
          label='Description'
          placeholder='Description (Optional)'
          multiline
          minRows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant='outlined'
          color='error'
          sx={{
            fontFamily: 'Poppins',
            borderRadius: '0.5em',
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleCreate}
          variant='contained'
          color='success'
          sx={{
            fontFamily: 'Poppins',
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

NewTeamModal.propTypes = {
  handleClose: PropTypes.func,
};

export default NewTeamModal;
