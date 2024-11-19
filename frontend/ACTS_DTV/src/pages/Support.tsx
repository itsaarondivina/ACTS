import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Support: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [surveyRisk, setSurveyRisk] = useState("ALL");
  const [selectView, setSelectView] = useState("");
  const [searchView, setSearchView] = useState("");

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";
    return () => {
      // Reset scrolling behavior when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleViewReport = () => {
    console.log("View Report Clicked", { startDate, endDate, surveyRisk, selectView, searchView });
  };

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          padding: 2,
          fontSize: "1.5rem",
        }}
      >
        Agent Call Tracker System
      </Box>

      {/* Dashboard View */}
      <Box
        sx={{
          backgroundColor: "#FFA500",
          padding: 3,
          margin: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
          Dashboard View
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {/* Start Date */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box>
              <Typography variant="subtitle1" color="white">
                Start Date
              </Typography>
              <DatePicker
                value={startDate}
                onChange={(newDate) => setStartDate(newDate)}
                sx={{
                  background: "White",
                  borderRadius: 1,
                  padding: "5px",
                }}
              />
            </Box>
            {/* End Date */}
            <Box>
              <Typography variant="subtitle1" color="white">
                End Date
              </Typography>
              <DatePicker
                value={endDate}
                onChange={(newDate) => setEndDate(newDate)}
                sx={{
                  background: "White",
                  borderRadius: 1,
                  padding: "5px",
                }}
              />
            </Box>
          </LocalizationProvider>

          {/* Survey Risk */}
          <FormControl>
            <InputLabel id="survey-risk-label" sx={{ color: "white" }}>
              Survey Risk
            </InputLabel>
            <Select
              value={surveyRisk}
              onChange={(e) => setSurveyRisk(e.target.value)}
              sx={{
                minWidth: 120,
                background: "white",
                borderRadius: 1,
              }}
            >
              <MenuItem value="ALL">ALL</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          {/* Select View */}
          <FormControl>
            <InputLabel id="select-view-label" sx={{ color: "white" }}>
              Select View
            </InputLabel>
            <Select
              value={selectView}
              onChange={(e) => setSelectView(e.target.value)}
              sx={{
                minWidth: 120,
                background: "white",
                borderRadius: 1,
              }}
            >
              <MenuItem value="Summary">Summary</MenuItem>
              <MenuItem value="Detailed">Detailed</MenuItem>
            </Select>
          </FormControl>

          {/* Search View */}
          <Box>
            <Typography variant="subtitle1" color="white">
              Search View
            </Typography>
            <TextField
              value={searchView}
              onChange={(e) => setSearchView(e.target.value)}
              size="small"
              sx={{
                background: "White",
                borderRadius: 1,
                padding: "5px",
              }}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={handleViewReport}
          sx={{ mt: 2 }}
        >
          View
        </Button>
      </Box>

      {/* Support Form */}
      <Box sx={{ padding: 2, margin: 2 }}>
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "#FFA500",
            color: "white",
            padding: 1,
            borderRadius: 1,
          }}
        >
          Support Form: DAVAO DTV TECH
        </Typography>

        {/* Table */}
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 2,
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #000", padding: "8px" }}>
                CALL ID
              </th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>
                AGENT NAME
              </th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>
                CALL TYPE
              </th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>
                ACCOUNT TYPE
              </th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>
                DATE
              </th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={6}
                style={{
                  border: "1px solid #000",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                No data available in table
              </td>
            </tr>
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

export default Support;
