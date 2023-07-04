import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import UserDashboard from './components/UserDashboard/UserDashboard';

export const Routing = () => {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={<Home />}
      />

      <Route 
        path='/home'
        element={<UserDashboard />}
      />
    </Routes>
  );
};
