import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import usePostTeamMember from '../../hooks/usePostTeamMember';

const NewTeamMember = ({ handleClose, teamId }) => {
  const [fields, setFields] = useState({ email: '' });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { loading, postTeamMember } = usePostTeamMember();

  const hasAtleastOneEmptyField = () => {
    return fields.email === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreation = async (e) => {
    const body = {
      ...fields,
      teamId,
    };

    await postTeamMember(body);
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Poppins',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='subtitle1' component='p' fontFamily='inherit'>
          New member
        </Typography>

        <Button size='small' sx={{ fontFamily: 'inherit'}} onClick={handleClose}>
          Close
        </Button>
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
          label='Email'
          variant='standard'
          type='string'
          name='email'
          value={fields.email}
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

NewTeamMember.propTypes = {};

export default NewTeamMember;
