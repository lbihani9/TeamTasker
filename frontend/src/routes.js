import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Layout from './Layout';
import Organizations from './components/Organizations/Organizations';
import Tasks from './components/Tasks/Tasks';

export const Routing = () => {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={<Navigate to='/login' />}
      />

      <Route
        exact
        path='/@me'
        element={
          <Navigate
            to='/@me/tasks'
            replace
          />
        }
      />

      <Route
        exact
        path='/login'
        element={<Home />}
      />

      <Route element={<Layout />}>
        <Route
          path='/@me'
          element={<UserDashboard />}
        >
          <Route
            path='tasks'
            element={<Tasks />}
          />
        </Route>

        <Route
          path='/organizations/:slug'
          element={<Organizations />}
        />
      </Route>
    </Routes>
  );
};
