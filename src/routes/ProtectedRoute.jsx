import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ token }) => {
  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
