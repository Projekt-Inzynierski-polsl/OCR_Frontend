import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

const AuthenticatedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return Cookies.get("authToken");
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default AuthenticatedRoute;