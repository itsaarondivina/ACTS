/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fetchagentcts } from "../utils/api";

const Support: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectView, setSelectView] = useState("");
  const [searchView, setSearchView] = useState("");

  const [agentcts, setAgentcts] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";
    return () => {
      // Reset scrolling behavior when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchAgentctsData = async () => {
    try {
      
  
      const lookupItemsData = await fetchagentcts(startDate,endDate);
      console.log(lookupItemsData);
      setAgentcts(lookupItemsData);
      setError(""); //  Clear previous errors if successful
    } catch (error) {
      console.error("Error fetching lookup items:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };
  

  // useEffect(() => {
  //   // Fetch data on component mount
  //   fetchAgentctsData();
  // }, []);

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
          backgroundColor: "white",
          padding: "2rem",
          margin: "2%",
          borderRadius: "1rem",
          border: "0.1rem solid orange",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "1200px",
          marginInline: "auto",
        }}
      >
        <Box
          sx={{
            backgroundColor: "orange",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
            Dashboard View
          </Typography>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          gap="1rem"
          sx={{ background: "white", padding: "1rem" }}
        >
          {/* Start Date */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box>
              <Typography variant="subtitle1" color="black">
                Start Date
              </Typography>
              <DatePicker
                value={startDate}
                onChange={(newDate) => setStartDate(newDate)}
                sx={{
                  background: "white",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  width: "100%",
                }}
              />
            </Box>

            {/* End Date */}
            <Box>
              <Typography variant="subtitle1" color="black">
                End Date
              </Typography>
              <DatePicker
                value={endDate}
                onChange={(newDate) => setEndDate(newDate)}
                sx={{
                  background: "white",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  width: "100%",
                }}
              />
            </Box>
          </LocalizationProvider>

          {/* Select View */}
          <Box>
            <FormControl sx={{ width: "10rem" }}>
              <Typography variant="subtitle1" color="black">
                Survey Risk
              </Typography>
              <Select
                value={selectView}
                onChange={(e) => setSelectView(e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "0.5rem",
                }}
              >
                <MenuItem value="ALL">ALL</MenuItem>
                <MenuItem value="LOW">LOW</MenuItem>
                <MenuItem value="HIGH">HIGH</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Search View */}
          <Box>
            <FormControl sx={{ width: "13rem" }}>
              <Typography variant="subtitle1" color="black">
                Select View
              </Typography>
              <Select
                value={searchView}
                onChange={(e) => setSearchView(e.target.value)}
                sx={{
                  background: "white",
                  borderRadius: "0.5rem",
                  minWidth: "10rem",
                }}
              >
                <MenuItem value="OM VIEW">OM VIEW</MenuItem>
                <MenuItem value="TEAM LEADER VIEW">TEAM LEADER VIEW</MenuItem>
                <MenuItem value="CAR DRIVER VIEW">CAR DRIVER VIEW</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={fetchAgentctsData}
            sx={{
              mt: "1rem",
              ml: "1rem",
              width: "10rem",
            }}
          >
            View
          </Button>
        </Box>
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

        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

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
              <th style={{ border: "1px solid #000", padding: "8px" }}>DATE</th>
              <th style={{ border: "1px solid #000", padding: "8px" }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {agentcts.length > 0 ? (
              agentcts.map((agent, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    {agent.callId}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    {agent.agentName}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    {agent.callType}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    {agent.accountType}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    {agent.date}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    <Button variant="contained" color="primary" size="small">
                      Action
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
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
            )}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

export default Support;
