import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import NewReminder from '../Reminders/NewReminder';
import UpcomingMeetings from '../Meetings/UpcomingMeetings';
import Deadlines from './Deadlines';
import OrganizationUpdates from './OrganizationUpdates';
import TeamUpdates from './TeamUpdates';
import { useSelector } from 'react-redux';

const QuickActions = (props) => {
  const layout = useSelector((state) => state.layouts.layout);

  return (
    <Grid
      item
      {...layout.quickActions}
    >
      <div className='quick-actions'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
            mb: '2em',
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
