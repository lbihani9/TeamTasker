import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Profile } from './components/Dashboard/Profile';

export const Routing = () => {

  return (
    <Routes>
      <Route 
        exact
        path="/" 
        element={<Navigate to="/home" />} 
      />
      <Route 
        path="/home" 
        element={<Home />} 
      />

      <Route>
        <Route 
          path="/dashboard" 
          element={<Profile />} 
        />
      </Route>
    </Routes>
  );
}