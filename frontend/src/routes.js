import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Layout from './Layout';

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
        path='/login'
        element={<Home />}
      />

      <Route element={<Layout />}>
        <Route
          path='/dashboard'
          element={<UserDashboard />}
        />
      </Route>
    </Routes>
  );
};
