import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';
import { Grid } from '@mui/material';
import useProjects from '../../hooks/useProjects';
import { useSelector } from 'react-redux';

const Projects = (props) => {
  const { loading, updateProject } = useProjects();
  const userInfo = useSelector((state) => state.auth.info);
  const projects = useSelector(
    (state) => state.projects.items.private[userInfo.id] ?? []
  );

  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={2}
      sx={{
        padding: '1rem',
        paddingBottom: '2rem',
        overflowY: 'auto',
        height: 'inherit',
      }}
    >
      {projects.map((project, index) => {
        return (
          <ProjectItem
            key={index}
            project={project}
            updateProject={updateProject}
          />
        );
      })}
    </Grid>
  );
};

Projects.propTypes = {};

export default Projects;
