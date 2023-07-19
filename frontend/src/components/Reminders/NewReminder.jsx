import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material';

const NewReminder = props => {
  return (
    <Box
      sx={{
        width: '15em',
        height: '5em',
        border: '1px solid black',
        borderRadius: '1em'
      }}
    >
      Add Reminder
    </Box>
  );
}

NewReminder.propTypes = {}

export default NewReminder