import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import NewOrganizationModal from './NewOrganizationModal';

const NewOrganizationButton = ({ postOrganization }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => setOpen(true);
  const handleClose = (e) => setOpen(false);

  const handleCreate = async (body) => {
    await postOrganization(body);
    handleClose();
  };

  return (
    <>
      <Button
        variant='contained'
        size='small'
        sx={{
          width: 'fit-content',
          alignSelf: 'center',
          fontFamily: 'Poppins',
          borderRadius: '0.5em',
          backgroundColor: '#eceff1',
          color: 'black',
          '&:hover': {
            backgroundColor: '#eceff1',
          },
        }}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New organization
      </Button>

      {open && (
        <NewOrganizationModal
          handleCreate={handleCreate}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

NewOrganizationButton.propTypes = {
  postOrganization: PropTypes.func,
};

export default NewOrganizationButton;
