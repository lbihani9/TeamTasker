import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import LabelAI from './LabelAI';
import AssigneeAI from './AssigneeAI';
import StatusAI from './StatusAI';
import DeadlineAI from './DeadlineAI';
import ProjectAI from './ProjectAI';

const TaskActions = ({ task, updateTask }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {!isMobile && (
        <Grid
          item
          md={4}
          xs={12}
        >
          <Stack
            component={Paper}
            square={false}
            sx={{
              height: 'fit-content',
              padding: '1rem',
              maxWidth: '22rem',
              borderRadius: '0.5rem'
            }}
            spacing={2}
          >
            <LabelAI task={task} />
            <Divider />

            {/* <AssigneeAI />
            <Divider />

            <StatusAI />
            <Divider /> */}

            <DeadlineAI
              task={task}
              updateTask={updateTask}
            />
            {/* <Divider />

            <ProjectAI 
              task={task}
              updateTask={updateTask}
            /> */}
          </Stack>
        </Grid>
      )}

      {/* {isMobile && (
        <Box
          sx={{
            '& > :not(style)': {
              m: 1,
            },
            position: 'fixed',
            bottom: '3rem',
            right: '2rem',
          }}
        >
          <Fab color='secondary'>
            <EditIcon />
          </Fab>
        </Box>
      )} */}
    </>
  );
};

TaskActions.propTypes = {
  task: PropTypes.object,
  updateTask: PropTypes.func,
};

export default TaskActions;
