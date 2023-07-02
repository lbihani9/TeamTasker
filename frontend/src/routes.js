import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';

export const Routing = () => {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={<Home />}
      />
    </Routes>
  );
};
