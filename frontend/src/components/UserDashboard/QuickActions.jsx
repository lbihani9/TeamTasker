import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import NewReminder from '../Reminders/NewReminder';
import UpcomingMeetings from '../Meetings/UpcomingMeetings';
import Deadlines from './Deadlines';
import OrganizationUpdates from './OrganizationUpdates';
import TeamUpdates from './TeamUpdates';

const QuickActions = (props) => {
  return (
    <Grid item>
      <div className='quick-actions'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
            mb: '2em',
            flexWrap: 'wrap',
            gap: '1em',
          }}
        >
          <NewReminder />
          <UpcomingMeetings />
        </Box>

        <Deadlines />
        <OrganizationUpdates />
        <TeamUpdates />
      </div>
    </Grid>
  );
};

QuickActions.propTypes = {
  activeIndex: PropTypes.number,
};

export default QuickActions;
