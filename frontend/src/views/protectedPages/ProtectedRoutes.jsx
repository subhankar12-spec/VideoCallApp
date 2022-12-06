import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}
