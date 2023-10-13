import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import OrganizationHeader from './OrganizationHeader';
import Teams from '../Teams/Teams';
import OrganizationTabSelection from './OrganizationTabSelection';

const OrganizationDashboard = (props) => {
  const { organizationSlug } = useParams();
  return (
    <>
      <OrganizationHeader />

      <Box
        sx={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <OrganizationTabSelection />
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            pt: 1,
            width: '100%',
            height: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

OrganizationDashboard.propTypes = {};

export default OrganizationDashboard;
