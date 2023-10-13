import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NewProjectButton } from '../../Projects/NewProjectButton';
import { NewTaskButton } from '../../Tasks/NewTaskButton';
import ResponsiveHorizontalButtonGroup from '../../Templates/ResponsiveHorizontalButtonGroup';
import { useLocation, useNavigate } from 'react-router-dom';
import ResponsiveTabLayout from '../../Templates/ResponsiveTabLayout';
import ResponsiveTabItem from '../../Templates/ResponsiveTabItem';

export const TabSelection = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    if (loc.pathname !== '/@me') {
      setCurrentId(tabs.find((t) => t.path === loc.pathname).id);
    }
    return () => {};
  }, [loc.pathname]);

  const tabHandler = (index) => {
    const item = tabs.find((t) => t.id === index);
    navigate(item.path);
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
          name='Tasks'
          index={0}
        />
        <ResponsiveTabItem
          name='Projects'
          index={1}
        />
        <ResponsiveTabItem
          name='Labels'
          index={2}
        />
      </ResponsiveTabLayout>

      <ResponsiveHorizontalButtonGroup>
        <NewTaskButton name='New Task' />
        <NewProjectButton name='New Project' />
      </ResponsiveHorizontalButtonGroup>
    </Box>
  );
};

const tabs = [
  {
    id: 0,
    name: 'Tasks',
    path: '/@me/tasks',
  },
  {
    id: 1,
    name: 'Projects',
    path: '/@me/projects',
  },
  {
    id: 2,
    name: 'Labels',
    path: '/@me/labels',
  },
];
