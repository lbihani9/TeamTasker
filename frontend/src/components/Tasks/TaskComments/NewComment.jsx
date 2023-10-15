import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';

const NewComment = ({ postComment }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [comment, setComment] = useState('');
  const info = useSelector((state) => state.auth.info);

  const handlePostComment = async (e) => {
    const body = {
      comment,
    };

    await postComment(body);
    setComment('');
  };

  return (
    <Stack
      direction='row'
      width='100%'
      spacing={1}
    >
      {!isMobile && <Avatar src={info?.avatar ?? '/broken-image.jpg'} />}

      <Stack
        spacing={1}
        sx={{
          width: '100%',
          padding: '1rem',
          mt: '1.5rem',
          borderRadius: '0.5rem',
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
    </Stack>
  );
};

NewComment.propTypes = {
  postComment: PropTypes.func,
};

export default NewComment;
