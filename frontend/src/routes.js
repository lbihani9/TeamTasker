import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home/Home';

export const Routing = () => {

  return (
    <Routes>
      <Route 
        exact
        path="/" 
        element={<Navigate to="/login" />} 
      />

      <Route 
        exact
        path="/login" 
        element={<Login />} 
      />
      <Route 
        path="/home" 
        element={<Home />} 
      />
    </Routes>
  );
}