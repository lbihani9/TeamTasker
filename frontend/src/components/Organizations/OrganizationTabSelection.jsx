import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ResponsiveTabLayout from '../Templates/ResponsiveTabLayout';
import ResponsiveTabItem from '../Templates/ResponsiveTabItem';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const OrganizationTabSelection = (props) => {
  const { organizationSlug } = useParams();
  const navigate = useNavigate();
  const loc = useLocation();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    setCurrentId(tabs.find((t) => getPath(t) === loc.pathname).id);
    return () => {};
  }, [loc.pathname]);

  const tabHandler = (index) => {
    const item = tabs.find((t) => t.id === index);
    navigate(getPath(item));
  };

  const getPath = (item) => {
    const path = item.path.split('/:organizationSlug/');
    return `${path[0]}/${organizationSlug}/${path[1]}`;
  };

  return (
    <Box
      sx={{
        height: '2.8em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        fontFamily: 'Poppins',
      }}
    >
      <ResponsiveTabLayout
        tabHandler={tabHandler}
        currentId={currentId}
      >
        <ResponsiveTabItem
          name='Teams'
          index={0}
        />
        <ResponsiveTabItem
          name='People'
          index={1}
        />
      </ResponsiveTabLayout>
    </Box>
  );
};

const tabs = [
  {
    id: 0,
    name: 'Teams',
    path: '/organizations/:organizationSlug/teams',
  },
  {
    id: 1,
    name: 'People',
    path: '/organizations/:organizationSlug/people',
  },
];

OrganizationTabSelection.propTypes = {};

export default OrganizationTabSelection;
