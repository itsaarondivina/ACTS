import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import logo from '../assets/Vxi-logo.png';
import { getEmployeeDetails, EmployeeDetails } from '../utils/authentication';

const LoginPage: React.FC = () => {
  const [hrid, setHrid] = useState('');
  const [hireDate, setHireDate] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Initialize the useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Clearing sessionStorage on mount");
    sessionStorage.clear();
  }, []);

  
  const handleLogin = async () => {
    if (!hrid || !hireDate) {
      setError('Both HRID and Hire Date are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const details = await getEmployeeDetails(hrid, hireDate);
      setEmployeeDetails(details);
      console.log('Employee Details:', details);
      navigate('/'); // Navigate to the home page (or desired route)
    } catch (error) {
      console.error("Error fetching employee details:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
        alert('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleChangeHrid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHrid(e.target.value);
    if (error) setError('');
  };

  const handleChangeHireDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHireDate(e.target.value);
    if (error) setError('');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="97vh"
      bgcolor="white"
      onKeyPress={handleKeyPress}
      position="relative"
    >
      <img src={logo} alt="Logo" style={{ marginBottom: '16px', maxWidth: '5%', height: 'auto' }} />
      <Typography variant="h5" align="center" mb={2}>VXI ACTS DTV TECH</Typography>
      <TextField
        label="HRID"
        variant="outlined"
        fullWidth
        value={hrid}
        onChange={handleChangeHrid}
        margin="normal"
        sx={{ width: '400px' }}
        inputProps={{ maxLength: 8 }}
        error={!hrid && Boolean(error)}
        disabled = {loading}
      />
      <TextField
        label="Hire Date"
        variant="outlined"
        fullWidth
        value={hireDate}
        onChange={handleChangeHireDate}
        margin="normal"
        sx={{ width: '400px' }}
        inputProps={{ maxLength: 10 }} // Adjust for expected date format
        error={!hireDate && Boolean(error)}
        disabled = {loading}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2, background: 'orange', color: 'black', width: '100px' }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>
      {error && (
        <Alert severity="error" sx={{
          position: 'absolute',
          top: '85%',
          width: '20%',
          zIndex: 1
        }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default LoginPage;
