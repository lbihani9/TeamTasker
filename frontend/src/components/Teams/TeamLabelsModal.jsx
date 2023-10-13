import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Button,
  Chip,
  List,
  ListItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTeamLabels from '../../hooks/useTeamLabels';
import NewLabelModal from './NewLabelModal';

const TeamLabelsModal = (props) => {
  const { loading, labels, searchText, setSearchText, postLabel } =
    useTeamLabels();
  const currentTeam = useSelector((state) => state.teams.current);

  const [createOpen, setCreateOpen] = useState(false);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCreateClick = (e) => {
    setCreateOpen((p) => !p);
  };

  const handleCreateClose = (e) => setCreateOpen(false);

  return (
    <Stack spacing={1}>
      <Stack
        direction='row'
        spacing={0.5}
        justifyContent='space-between'
        alignItems='center'
      >
        <TextField
          variant='outlined'
          size='small'
          sx={{
            width: '25rem',
          }}
          InputProps={{
            startAdornment: <SearchIcon fontSize='small' />,
          }}
          placeholder='Search labels'
          value={searchText}
          onChange={handleChange}
        />

        <Button
          variant='contained'
          size='small'
          sx={{
            fontFamily: 'Poppins',
            borderRadius: '0.5em',
            height: '2rem',
          }}
          color='success'
          onClick={handleCreateClick}
        >
          + Label
        </Button>
      </Stack>

      <List
        component='div'
        disablePadding
        sx={{
          height: '20rem',
          overflowY: 'auto',
        }}
      >
        {labels?.map((label, index) => {
          return (
            <ListItem>
              <Tooltip title={label.description ?? 'No description'}>
                <Chip
                  variant='outlined'
                  label={label.name}
                  sx={{
                    color: label.color,
                    borderColor: label.color,
                  }}
                />
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {createOpen && (
        <NewLabelModal
          handleClose={handleCreateClose}
          postLabel={postLabel}
          labelableType='team'
          labelableId={currentTeam?.id}
        />
      )}
    </Stack>
  );
};

TeamLabelsModal.propTypes = {};

export default TeamLabelsModal;
