import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

const TaskActionItem = ({ name, handleItemClick, children }) => {
  return (
    <Stack>
      <Box
        display='flex'
        justifyContent='space-between'
      >
        <Typography
          variant='body2'
          component='p'
        >
          {name}
        </Typography>

        <IconButton
          size='small'
          color='default'
          onClick={handleItemClick}
        >
          <SettingsIcon fontSize='small' />
        </IconButton>
      </Box>

      <Stack
        direction='row'
        spacing={0.5}
      >
        {children}
      </Stack>
    </Stack>
  );
};

TaskActionItem.propTypes = {};

export default TaskActionItem;
