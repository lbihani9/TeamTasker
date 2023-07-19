import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import UserDashboard from './components/UserDashboard/UserDashboard';

export const Routing = () => {
  return (
    <Routes>
      <Route
        exact
        path='/login'
        element={<Home />}
      />

      {/* <Route
        element={
          <>

          </>
        }
      >

      </Route> */}

      <Route 
        path='/dashboard'
        element={<UserDashboard />}
      />
    </Routes>
  );
};
