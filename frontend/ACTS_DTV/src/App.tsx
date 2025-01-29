// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Security } from "@okta/okta-react";
import LoginCallback from './Logincallback';       
import { OktaAuth } from "@okta/okta-auth-js";
import OktaAuthentication from './okta';
import ProtectedRoute from "./components/routings"; // ProtectedRoute component
import HomePage from "./pages/HomePage";
import ManageLookups from "./pages/ManageLookups";
import LoginPage from "./pages/Login";
import UserModule from "./pages/user";
import Report from "./pages/Report";
import Support from "./pages/Support";
import Navbar from "./components/header";


// Function to restore the original URI after login
const restoreOriginalUri = (_oktaAuth: OktaAuth, originalUri: string) => {
  window.location.replace(originalUri || "/");
};

// Security wrapper for Okta authentication
interface SecurityWithRestoreOriginalUriProps {
  children: React.ReactNode;
}

const SecurityWithRestoreOriginalUri: React.FC<SecurityWithRestoreOriginalUriProps> = ({ children }) => {
  return (
    <Security oktaAuth={OktaAuthentication} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};

const App: React.FC = () => {
  const location = useLocation(); // Get the current location

  return (
    <div>
      {/* Render Navbar only if not on the login or callback page */}
      {location.pathname !== "/login" && location.pathname !== "/authorization-code/callback" && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/authorization-code/callback" element={<LoginCallback />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ManageLookups"
          element={
            <ProtectedRoute>
              <ManageLookups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/User"
          element={
            <ProtectedRoute>
              <UserModule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

// Wrap the App component with Router and Security
const Root: React.FC = () => (
  <Router>
    <SecurityWithRestoreOriginalUri>
      <App />
    </SecurityWithRestoreOriginalUri>
  </Router>
);

export default Root;
