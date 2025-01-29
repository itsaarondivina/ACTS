import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { Button, CircularProgress, Alert, Box, Typography, Container } from "@mui/material";
import logo from "../assets/Vxi-logo.png";

const LoginPage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Explicitly set the type to string | null
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoading(true);
    oktaAuth.signInWithRedirect().catch((err) => {
      setIsLoading(false);
      setError("Failed to initiate login. Please try again.");
      console.error(err);
    });
  };

  useEffect(() => {
    const login = sessionStorage.getItem("loggin");
    if (login) {
      const parsedLogin = JSON.parse(login);
      setIsLoading(parsedLogin === true);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      navigate("/");
    }
  }, [authState, navigate]);

  if (!authState) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (authState.isAuthenticated) {
    return null;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          marginBottom: "24px",
          maxWidth: "70px",
          height: "auto",
        }}
      />
      <Typography variant="h5" gutterBottom>
        VXI ACTS DTV TECH
      </Typography>
      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={isLoading}
        sx={{
          marginTop: "16px",
          width: "30%",
          backgroundColor: "darkblue",
          "&:hover": { backgroundColor: "blue" },
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login with Okta"}
      </Button>
      {error && (
        <Alert severity="error" sx={{ marginTop: "16px", width: "100%" }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default LoginPage;
