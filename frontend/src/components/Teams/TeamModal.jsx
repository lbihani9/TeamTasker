import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { Stack, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import TeamProjectsModal from './TeamProjectsModal';
import TeamLabelsModal from './TeamLabelsModal';

const TeamModal = ({ handleClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentTeam = useSelector((state) => state.teams.current);
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      maxWidth='sm'
      fullWidth={!isMobile}
      fullScreen={isMobile}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        height='fit-content'
      >
        <DialogTitle
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '1.5rem',
          }}
        >
          {currentTeam?.name}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='text'
            sx={{
              fontFamily: 'Poppins',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Stack>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
          width: '100%',
          paddingTop: 0,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          sx={{
            fontFamily: 'Poppins',
          }}
        >
          <Tab
            value={1}
            label='Projects'
            sx={{
              fontFamily: 'inherit',
            }}
          />
          <Tab
            value={2}
            label='Labels'
            sx={{
              fontFamily: 'inherit',
            }}
          />
          {/* <Tab
            value={3}
            label='Members'
            sx={{
              fontFamily: 'inherit',
            }}
          /> */}
        </Tabs>

        {value === 1 && <TeamProjectsModal />}

        {value === 2 && <TeamLabelsModal />}
      </DialogContent>
    </Dialog>
  );
};

TeamModal.propTypes = {};

export default TeamModal;
