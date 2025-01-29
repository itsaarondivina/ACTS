import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { useOktaAuth } from '@okta/okta-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authState } = useOktaAuth(); // Get the auth state from Okta
  const login = JSON.parse(sessionStorage.getItem('loggin') || 'false'); // Check login status from sessionStorage

  // If authentication state is pending, show a loading indicator
  if (authState?.isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If the user is not logged in, redirect to the login page
  if (!login) {
    return <Navigate to="/login" />; // Redirect to login page if not logged in
  }

  // If logged in, render the protected children
  return <>{children}</>;
};

export default ProtectedRoute;
