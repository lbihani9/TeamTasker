import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTeamProjects from '../../hooks/useTeamProjects';
import { useSelector } from 'react-redux';
import { NewProjectModal } from '../Projects/NewProjectModal';
import EditIcon from '@mui/icons-material/Edit';
import EditProjectModal from '../Projects/EditProjectModal';
import { useNavigate } from 'react-router-dom';
import TTBackdrop from '../Templates/TTBackdrop';

const TeamProjectsModal = (props) => {
  const { loading, searchText, setSearchText, patchTeamProject } =
    useTeamProjects();
  const currentTeam = useSelector((state) => state.teams.current);
  const projects = useSelector(
    (state) => state.projects.items.team[currentTeam?.id] ?? []
  );
  const navigate = useNavigate();

  const [editableProject, setEditableProject] = useState(null);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCreateClick = (e) => {
    setCreateOpen((p) => !p);
  };

  const handleCreateClose = (e) => setCreateOpen(false);

  const handleEditClick = (e, project) => {
    e.stopPropagation();
    setEditableProject(project);
    setEditOpen(true);
  };

  const handleEditClose = (e) => {
    setEditOpen(false);
    setEditableProject(null);
  };

  const handleProjectClick = (project) => {
    navigate(`/projects/${project?.id}/tasks`);
  };

  return (
    <Stack spacing={1}>
      {loading && <TTBackdrop open={loading} />}
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
          placeholder='Search projects'
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
          + Project
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
        {projects?.map((project, index) => {
          return (
            <ListItemButton
              key={index}
              onMouseEnter={(e) => setHoveredProjectId(project?.id)}
              onMouseLeave={(e) => setHoveredProjectId(null)}
              onClick={(e) => handleProjectClick(project)}
            >
              <ListItemText
                sx={{
                  fontFamily: 'Poppins',
                }}
                primary={project?.name}
                secondary={project?.isActive ? 'Active' : 'In-active'}
              />

              {hoveredProjectId === project?.id && (
                <Tooltip title='Edit project'>
                  <IconButton
                    size='small'
                    sx={{
                      '&:hover': {
                        color: 'blue',
                      },
                    }}
                    onClick={(e) => handleEditClick(e, project)}
                  >
                    <EditIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              )}
            </ListItemButton>
          );
        })}
      </List>

      {createOpen && (
        <NewProjectModal
          open={createOpen}
          handleClose={handleCreateClose}
          projectableType='team'
          projectableId={currentTeam?.id}
        />
      )}

      {editOpen && (
        <EditProjectModal
          project={editableProject}
          updateProject={patchTeamProject}
          handleEditProject={handleEditClose}
          projectableType='team'
          projectableId={currentTeam?.id}
        />
      )}
    </Stack>
  );
};

TeamProjectsModal.propTypes = {};

export default TeamProjectsModal;
