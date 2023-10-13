import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import TuneIcon from '@mui/icons-material/Tune';
import { NewTaskModal } from '../NewTaskModal';
import { useParams } from 'react-router-dom';

export const ViewAndFilterSelection = () => {
  const { projectId } = useParams();
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const handleCreateTaskClick = (e) => {
    setOpenTaskModal(true);
  };

  const handleCloseCreateTaskClick = (e) => {
    setOpenTaskModal(false);
  };

  return (
    <Grid
      container
      gap='1rem'
      sx={{
        padding: '1.5em 1em 1em 1em',
      }}
    >
      <Grid
        item
        xs={12}
        md={1}
        sx={{
          display: 'flex',
          fontFamily: 'inherit',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            fontFamily: 'inherit',
            gap: '0.2em',
          }}
        >
          <BackupTableIcon />
          <Typography
            sx={{
              fontFamily: 'inherit',
            }}
          >
            Table
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={9.5}
      >
        <TextField
          type='text'
          size='small'
          variant='outlined'
          fullWidth
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Poppins',
        }}
      >
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          justifyContent='space-between'
          width='100%'
        >
          <Tooltip title='Filter'>
            <IconButton size='small'>
              <TuneIcon fontSize='small' />
            </IconButton>
          </Tooltip>

          {projectId && (
            <Button
              variant='contained'
              size='small'
              color='success'
              sx={{
                fontFamily: 'Poppins',
                borderRadius: '0.5em',
              }}
              onClick={handleCreateTaskClick}
            >
              + Task
            </Button>
          )}
        </Stack>
      </Grid>

      {openTaskModal && (
        <NewTaskModal
          open={openTaskModal}
          handleClose={handleCloseCreateTaskClick}
          {...(typeof projectId !== 'undefined' && {
            taskableType: 'project',
            taskableId: projectId,
          })}
        />
      )}
    </Grid>
  );
};
