import React from 'react';
import PropTypes from 'prop-types';
import SingleComment from './SingleComment';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import useTaskComments from '../../../hooks/useTaskComments';
import NewComment from './NewComment';

const TaskComments = (props) => {
  const { taskId } = useParams();
  const { comments, loading, postComment, updateComment, deleteComment } =
    useTaskComments(taskId);

  return (
    <Stack
      spacing={5}
      sx={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {comments.map((comment, index) => {
        return (
          <SingleComment
            key={index}
            comment={comment}
            updateComment={updateComment}
            deleteComment={deleteComment}
          />
        );
      })}

      <NewComment postComment={postComment} />
    </Stack>
  );
};

TaskComments.propTypes = {};

export default TaskComments;
