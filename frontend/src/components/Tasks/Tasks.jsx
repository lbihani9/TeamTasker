import React from 'react';
import PropTypes from 'prop-types';
import { ViewAndFilterSelection } from './ViewAndFilterSelection/ViewAndFilterSelection';
import { TaskTable } from './Views/TaskTable';
import { Stack } from '@mui/material';

const Tasks = (props) => {
  return (
    <Stack spacing={4}>
      <ViewAndFilterSelection />
      <TaskTable />
    </Stack>
  );
};

Tasks.propTypes = {};

export default Tasks;
