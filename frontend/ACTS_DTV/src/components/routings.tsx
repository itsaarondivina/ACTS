import React, { ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/authentication'; // Make sure the import path is correct

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = isAuthenticated(); // Check if the user is authenticated

  // If the user is not authenticated, redirect to the login page
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
