import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import EditProjectModal from './EditProjectModal';

const ProjectItem = ({ project, updateProject }) => {
  const theme = useTheme();
  const isBetweenSmallAndMedium = useMediaQuery(
    theme.breakpoints.between('sm', 'md')
  );
  const navigate = useNavigate();
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [shouldEdit, setShouldEdit] = useState(false);

  const handleProjectClick = (e) => {
    const { id } = project;
    navigate(`/projects/${id}/tasks`);
  };

  const handleEditProject = (e) => {
    setShouldEdit((p) => !p);
  };

  return (
    <Grid
      item
      lg={12}
      sm={6}
      xs={12}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
          [theme.breakpoints.up('sm')]: {
            width: '30rem',
          },
          [theme.breakpoints.up('lg')]: {
            width: '65rem',
            height: '10rem',
          },
          borderRadius: '0.8rem',
        }}
        onMouseEnter={(e) => setHoveredCardId(project.id)}
        onMouseLeave={(e) => setHoveredCardId(null)}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontFamily: 'Poppins',
          }}
        >
          <Typography
            variant='h5'
            component='div'
            sx={{
              fontFamily: 'inherit',
              '&:hover': {
                transition: 'text-decoration 1s cubic-bezier(0, 0, 0.91, 0.31)',
                textDecoration: 'underline',
                color: 'blue',
                cursor: 'pointer',
              },
            }}
            onClick={handleProjectClick}
          >
            {project?.name}
          </Typography>

          {!isBetweenSmallAndMedium && (
            <Box
              sx={{
                width: '50%',
                height: '10rem',
                overflowY: 'auto',
                fontFamily: 'inherit',
                '@media (width <= 450px)': {
                  display: 'none',
                },
                '&::-webkit-scrollbar': {
                  width: '0.4rem',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f5f5f5',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#e0e0e0',
                  borderRadius: '1rem',
                },
              }}
            >
              <Typography
                variant='body2'
                color='text.secondary'
              >
                {project?.description}
              </Typography>
            </Box>
          )}
          <Stack spacing={1}>
            <Chip label='Private' />
            <Chip
              label={project?.isActive ? 'Active' : 'In active'}
              color={project?.isActive ? 'success' : 'error'}
              variant='outlined'
            />

            <IconButton
              size='small'
              sx={{
                display: hoveredCardId !== project?.id && 'none',
                borderRadius: '5rem',
              }}
              onClick={handleEditProject}
            >
              <EditIcon size='small' />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>

      {shouldEdit && (
        <EditProjectModal
          handleEditProject={handleEditProject}
          updateProject={updateProject}
          project={project}
        />
      )}
    </Grid>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object,
  updateProject: PropTypes.func,
};

export default ProjectItem;
