import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  authenticated: string | null;
  component: React.ReactElement;
}

const PrivateRoute = ({ authenticated, component }: PrivateRouteProps) => {
  return authenticated ? component : <Navigate to="/admin/login"></Navigate>;
};

export default PrivateRoute;
