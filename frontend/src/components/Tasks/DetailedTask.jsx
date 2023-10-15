import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid } from '@mui/material';
import TaskHeader from './TaskHeader';
import Description from './Description';
import TaskComments from './TaskComments/TaskComments';
import { useParams } from 'react-router-dom';
import useDetailedTask from '../../hooks/useDetailedTask';
import TaskActions from './TaskActions/TaskActions';
import { useSelector } from 'react-redux';
import TTBackdrop from '../Templates/TTBackdrop';

const DetailedTask = (props) => {
  const { taskId } = useParams();
  const { loading, updateTask } = useDetailedTask(taskId);
  const task = useSelector((state) => state.tasks.current);

  return (
    <Grid
      container
      sx={{
        padding: '1rem',
      }}
      rowSpacing={5}
    >
      {loading && <TTBackdrop open={loading} />}
      <TaskHeader
        task={task}
        updateTask={updateTask}
      />

      <Grid
        item
        xs={12}
      >
        <Divider />
      </Grid>

      <Grid
        item
        md={12}
        container
        columnSpacing={2}
      >
        <Grid
          item
          md={8}
          xs={12}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Description
            task={task}
            updateTask={updateTask}
          />
          <TaskComments />
        </Grid>

        <TaskActions
          task={task}
          updateTask={updateTask}
        />
      </Grid>
    </Grid>
  );
};

DetailedTask.propTypes = {};

export default DetailedTask;
