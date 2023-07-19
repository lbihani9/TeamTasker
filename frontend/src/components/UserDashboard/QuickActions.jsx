import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import NewReminder from '../Reminders/NewReminder';
import UpcomingMeetings from '../Meetings/UpcomingMeetings';

const getGridWidth = index => (index === -1 ? 3.5 : 2);

const QuickActions = props => {
  return (
    <Grid
      item
      md={getGridWidth(props.activeIndex)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        borderLeft: 'thin solid #808080',
        backgroundColor: '#FFFFFF',
        paddingTop: '1em',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <NewReminder />
        <UpcomingMeetings />
      </Box>
    </Grid>
  );
};

QuickActions.propTypes = {
  activeIndex: PropTypes.number,
};

export default QuickActions;
