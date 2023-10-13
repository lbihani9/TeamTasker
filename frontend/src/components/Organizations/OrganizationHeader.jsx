import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

const OrganizationHeader = props => {
  return (
    <Box
      sx={{
        height: '12vh',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      Header
    </Box>
  )
}

OrganizationHeader.propTypes = {}

export default OrganizationHeader