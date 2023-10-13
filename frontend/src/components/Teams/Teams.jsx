import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import useTeams from '../../hooks/useTeams';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTeam } from '../../store/slices/teamSlice';
import TeamModal from './TeamModal';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NewTeamMember from './NewTeamMember';

const Teams = (props) => {
  const { loading } = useTeams();
  const currentOrganization = useSelector(
    (state) => state.organizations.current
  );
  const teams = useSelector(
    (state) => state.teams.items[currentOrganization?.id] ?? []
  );
  const [open, setOpen] = useState(false);
  const [openNewMember, setOpenNewMember] = useState(false);
  const dispatch = useDispatch();
  const [teamId, setTeamId] = useState(null);

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

  const handleOpenTeamModal = (e, team) => {
    dispatch(setCurrentTeam(team));
    setOpen(true);
  };

  const handleCloseTeamModal = (e) => {
    dispatch(setCurrentTeam(null));
    setOpen(false);
  };

  const handleOpenNewMemberModal = (e, id) => {
    e.stopPropagation();
    setOpenNewMember((p) => !p);
    setTeamId(id);
  };

  const handleCloseNewMemberModal = (e) => {
    setOpenNewMember(false);
    setTeamId(null);
  };

  return (
    <>
      <List
        component='div'
        disablePadding
      >
        {teams?.map((team, index) => {
          return (
            <ListItem
              key={index}
              onClick={(e) => handleOpenTeamModal(e, team)}
              sx={{
                pl: '2.2rem',
                '&:hover': {
                  backgroundColor: '#eceff1',
                  cursor: 'pointer',
                },
              }}
              secondaryAction={
                <Tooltip title='Add new member'>
                  <IconButton
                    size='small'
                    onClick={(e) => handleOpenNewMemberModal(e, team.id)}
                  >
                    <PersonAddIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemIcon>
                <SubdirectoryArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary={team?.name} />
            </ListItem>
          );
        })}
      </List>

      {open && <TeamModal handleClose={handleCloseTeamModal} />}
      {openNewMember && (
        <NewTeamMember
          handleClose={handleCloseNewMemberModal}
          teamId={teamId}
        />
      )}
    </>
  );
};

Teams.propTypes = {};

export default Teams;
