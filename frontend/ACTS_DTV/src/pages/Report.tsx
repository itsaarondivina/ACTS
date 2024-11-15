import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchAndDownloadReport } from "../utils/api";

const Report: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      // Reset scrolling behavior when the component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleDownloadReport = () => {
    // Call the API function to fetch data and download the report
    fetchAndDownloadReport(startDate, endDate);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 15 }}>
      <Typography variant="h4" gutterBottom>
        Report Management - DAVAO DTV TECH
      </Typography>
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: '#03a9f4', padding: 3, borderRadius: 2 }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box display="flex-start" flexDirection="column" alignItems="center" sx={{ mr: 2 }}>
            <Typography variant="subtitle1" color="white">Start Date</Typography>
            <DatePicker
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
              sx={{ background: 'White', borderRadius: 1 }}
            />
          </Box>

          <Box display="flex-start" flexDirection="column" alignItems="center" sx={{ mr: 2 }}>
            <Typography variant="subtitle1" color="white">End Date</Typography>
            <DatePicker
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
              sx={{ background: 'White', borderRadius: 1 }}
            />
          </Box>
        </LocalizationProvider>

        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadReport}
          sx={{ ml: 2, mt: 2 }}
        >
          Download Report
        </Button>
      </Box>
    </Box>
  );
};

export default Report;
