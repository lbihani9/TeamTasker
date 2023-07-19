import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

const UpcomingMeetings = props => {
  return (
    <Box
      sx={{
        width: '15em',
        height: '5em',
        border: '1px solid black',
        borderRadius: '1em'
      }}
    >
      Upcoming Meetings
    </Box>
  )
}

UpcomingMeetings.propTypes = {}

export default UpcomingMeetings