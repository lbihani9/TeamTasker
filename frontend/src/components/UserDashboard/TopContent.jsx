import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const TopContent = props => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  return (
    <Box
      sx={{
        height: '15vh',
        // borderBottom: '1px solid #e0e0e0',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          gap: '1em',
          width: '100%',
        }}
      >
        <TextField
          variant='standard'
          placeholder='Quickly search your tasks and projects ...'
          sx={{
            borderRadius: '1em',
            height: 'fit-content',
            width: '40%',
          }}
          InputProps={{
            endAdornment: (
              <SearchIcon
                sx={{
                  color: '#808080',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#0000FF',
                  },
                }}
              />
            ),
          }}
        />

        <MoreVertIcon
          sx={{
            cursor: 'pointer',
            height: 'fit-content',
            alignSelf: 'center',
            color: '#808080',
            '&:hover': {
              color: '#0000FF',
            },
          }}
        />
      </Box>

      <Button
        variant='contained'
        size='small'
        sx={{
          fontFamily: 'Poppins',
          color: 'black',
          backgroundColor: '#f5f5f5',
          borderRadius: '0.5em',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
        startIcon={<AddIcon />}
      >
        New project
      </Button>
    </Box>
  );
};

TopContent.propTypes = {};

export default TopContent;
