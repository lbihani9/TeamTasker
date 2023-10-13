import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Paper, Stack, TextField } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TaskCommentMenu from './TaskCommentMenu';

const SingleComment = ({ comment, updateComment, deleteComment }) => {
  const [newComment, setNewComment] = useState('');
  const [shouldEdit, setShouldEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleEditClick = (e) => {
    setShouldEdit(true);
    handleClose();
    setNewComment(comment?.comment ?? '');
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const cancelCommentChange = (e) => {
    setNewComment(false);
    setShouldEdit(false);
  };

  const handleUpdateComment = async (e) => {
    const body = {
      comment: newComment,
    };

    await updateComment(body, comment.id);
    cancelCommentChange();
  };

  const handleDeleteComment = async (e) => {
    await deleteComment(comment.id);
  };

  return (
    <Stack
      direction='row'
      width='100%'
      spacing={1}
    >
      <Avatar src='/broken-image.jpg' />

      {!shouldEdit && (
        <Stack width='100%'>
          <Box
            sx={{
              width: '100%',
              height: '1.7rem',
              border: '1px solid #bdbdbd',
              borderBottom: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '0.2rem',
              pr: '0.5rem',
            }}
          >
            <MoreHorizIcon
              fontSize='small'
              sx={{
                cursor: 'pointer',
              }}
              onClick={handleClick}
            />
          </Box>
          <TextField
            sx={{
              width: '100%',
            }}
            disabled={!shouldEdit}
            variant='outlined'
            value={comment?.comment}
            multiline
          />
        </Stack>
      )}

      {shouldEdit && (
        <Stack
          spacing={1}
          sx={{
            width: '100%',
            padding: '1rem',
          }}
          component={Paper}
        >
          <TextField
            variant='outlined'
            multiline
            minRows={4}
            value={newComment}
            onChange={handleCommentChange}
          />

          <Box
            display='flex'
            justifyContent='flex-end'
            gap='0.4rem'
          >
            <Button
              variant='outlined'
              color='error'
              sx={{
                height: '2rem',
                fontFamily: 'Poppins',
                borderRadius: '0.5em',
              }}
              onClick={cancelCommentChange}
            >
              Cancel
            </Button>

            <Button
              variant='contained'
              color='success'
              sx={{
                height: '2rem',
                fontFamily: 'Poppins',
                borderRadius: '0.5em',
              }}
              onClick={handleUpdateComment}
              disabled={newComment === (comment?.comment ?? '')}
            >
              Comment
            </Button>
          </Box>
        </Stack>
      )}

      <TaskCommentMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteComment}
      />
    </Stack>
  );
};

SingleComment.propTypes = {
  comment: PropTypes.object,
  updateComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default SingleComment;
