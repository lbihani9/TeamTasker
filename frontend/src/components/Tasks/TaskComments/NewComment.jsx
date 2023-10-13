import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Paper, Stack, TextField } from '@mui/material';

const NewComment = ({ postComment }) => {
  const [comment, setComment] = useState('');

  const handlePostComment = async (e) => {
    const body = {
      comment,
    };

    await postComment(body);
    setComment('');
  };

  return (
    <Stack
      spacing={1}
      sx={{
        width: '100%',
        padding: '1rem',
        mt: '1.5rem',
      }}
      component={Paper}
    >
      <TextField
        variant='outlined'
        placeholder='Leave a comment'
        multiline
        minRows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Box
        display='flex'
        justifyContent='flex-end'
      >
        <Button
          variant='contained'
          color='success'
          sx={{
            height: '2rem',
            fontFamily: 'Poppins',
            borderRadius: '0.5em',
          }}
          disabled={comment.length === 0}
          onClick={handlePostComment}
        >
          Comment
        </Button>
      </Box>
    </Stack>
  );
};

NewComment.propTypes = {
  postComment: PropTypes.func
};

export default NewComment;
