import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Layout from './Layout';
import Tasks from './components/Tasks/Tasks';
import Projects from './components/Projects/Projects';
import DetailedTask from './components/Tasks/DetailedTask';
import Labels from './components/Labels/Labels';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Navigate to='/login' />,
  },
  {
    path: 'login',
    element: <Home />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <Navigate
            to='/login'
            replace
          />
        ),
      },
      {
        path: 'projects/:projectId/tasks',
        element: <Tasks />,
      },
      {
        path: 'tasks/:taskId',
        element: <DetailedTask />,
      },
      {
        path: '@me',
        element: <UserDashboard />,
        children: [
          {
            path: '',
            element: (
              <Navigate
                to='/@me/tasks'
                replace
              />
            ),
          },
          {
            path: 'tasks',
            element: <Tasks />,
          },
          {
            path: 'projects',
            element: <Projects />,
          },
          {
            path: 'labels',
            element: <Labels />,
          },
        ],
      },
    ],
  },
]);
