import React from 'react';
import PropTypes from 'prop-types';
import { ViewAndFilterSelection } from './ViewAndFilterSelection/ViewAndFilterSelection';
import { TaskTable } from './Views/TaskTable';

const Tasks = (props) => {
  return (
    <>
      <ViewAndFilterSelection />
      <TaskTable />
    </>
  );
};

Tasks.propTypes = {};

export default Tasks;
