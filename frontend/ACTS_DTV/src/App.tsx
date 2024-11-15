// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./components/routings"; // Make sure this component handles redirection
import HomePage from "./pages/HomePage";
import ManageLookups from "./pages/ManageLookups"; // Import ManageLookups
import LoginPage from "./pages/Login";
import UserModule from "./pages/user";
import Report from "./pages/Report";
import Navbar from "./components/header";

const App: React.FC = () => {
  const location = useLocation(); // Get the current location

  return (
    <div>
      {/* Render Navbar only if not on the login page */}
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
        {/* Add other protected routes here */}
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
      </Routes>
    </div>
  );
};

// Wrap the App component in Router
const Root: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
