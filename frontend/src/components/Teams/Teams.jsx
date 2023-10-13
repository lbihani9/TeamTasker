import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import useTeams from '../../hooks/useTeams';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTeam } from '../../store/slices/teamSlice';
import TeamModal from './TeamModal';

const Teams = (props) => {
  const { loading } = useTeams();
  const currentOrganization = useSelector(
    (state) => state.organizations.current
  );
  const teams = useSelector(
    (state) => state.teams.items[currentOrganization?.id] ?? []
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const isSameOrganization =
    teams.length > 0 && teams[0]?.organizationId === currentOrganization?.id;

  if (!isSameOrganization) {
    return (
      <List
        component='div'
        disablePadding
      >
        <ListItem pl={4}>
          <ListItemText primary='No teams found' />
        </ListItem>
      </List>
    );
  }

  const handleOpen = (e, team) => {
    dispatch(setCurrentTeam(team));
    setOpen(true);
  };
  const handleClose = (e) => {
    dispatch(setCurrentTeam(null));
    setOpen(false);
  };

  return (
    <>
      <List
        component='div'
        disablePadding
      >
        {teams?.map((team, index) => {
          return (
            <ListItemButton
              key={index}
              pl={4}
              onClick={(e) => handleOpen(e, team)}
            >
              <ListItemText primary={team?.name} />
            </ListItemButton>
          );
        })}
      </List>

      {open && <TeamModal handleClose={handleClose} />}
    </>
  );
};

Teams.propTypes = {};

export default Teams;
