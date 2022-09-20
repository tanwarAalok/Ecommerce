import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({isAdmin = false}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return !loading && isAuthenticated ? (
    isAdmin ? (
      user?.role === "admin" ? <Outlet /> : <h1>You are not allowed to access this resource!!</h1>
      
    ) : (
      <Outlet/>
    )
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;