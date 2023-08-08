import React from 'react'
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Button } from '@mui/material';


const createOrganization = async (body) => {
  try {
    const res = await axios.post('/api/v1/@me/organizations', body);
  } catch (error) {
    console.log(error);
  }
}

const NewOrganizationButton = props => {
  return (
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
    >
      New organization
    </Button>
  );
}

NewOrganizationButton.propTypes = {}

export default NewOrganizationButton