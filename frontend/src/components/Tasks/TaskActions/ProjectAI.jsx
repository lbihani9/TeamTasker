import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TaskActionItem from './TaskActionItem';
import TaskActionItemMenu from './TaskActionItemMenu';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useProjectSearch from '../../../hooks/useProjectSearch';

const ProjectAI = ({ task, updateTask }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { foundProjects, searchText, setSearchText, loading } =
    useProjectSearch();

  useEffect(() => {
    if (anchorEl && task.taskableType === 'project') {
      setSelectedProjectId(task.taskable.id);
    }
  }, [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const getProjectName = () => {
    const { taskable, taskableType } = task;
    if (taskableType === 'user') {
      return 'No project selected';
    }

    return taskable?.name;
  };

  const handleChange = (id) => {
    if (id === selectedProjectId) {
      setSelectedProjectId(null);
    } else {
      setSelectedProjectId(id);
    }
  };

  return (
    <>
      <TaskActionItem
        handleItemClick={handleClick}
        name='Project'
      >
        <Chip
          label={getProjectName()}
          size='small'
          color='info'
          variant='outlined'
        />
      </TaskActionItem>

      <TaskActionItemMenu
        anchorEl={anchorEl}
        handleItemMenuClose={handleClose}
      >
        <Stack
          spacing={1}
          p='1rem'
          sx={{
            height: '23rem',
          }}
        >
          <TextField
            autoFocus
            type='text'
            size='small'
            placeholder='Search project'
            variant='outlined'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon fontSize='small' />,
            }}
          />

          <MenuList
            sx={{
              overflowY: 'auto',
            }}
          >
            {foundProjects.map((project, index) => {
              return (
                <MenuItem key={project.id}>
                  <Box
                    display='flex'
                    alignItems='center'
                  >
                    <Checkbox
                      size='small'
                      checked={project.id === selectedProjectId}
                      onChange={(e) => handleChange(project.id)}
                    />
                    <Typography
                      variant='body1'
                      component='p'
                    >
                      {project.name}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
          </MenuList>

          <Box
            display='flex'
            justifyContent='flex-end'
          >
            <Button
              variant='contained'
              size='small'
              color='success'
              sx={{
                borderRadius: '0.5rem',
                fontFamily: 'Poppins',
              }}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </TaskActionItemMenu>
    </>
  );
};

ProjectAI.propTypes = {
  task: PropTypes.object,
  updateTask: PropTypes.func,
};

export default ProjectAI;
