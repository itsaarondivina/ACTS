/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  fetchagentcts,
  getSelectedAgent,
  fetchOMview,
  fetchCDview,
} from "../utils/api";
import SupportModal from "../components/SupportModal";

const Support: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectView, setSelectView] = useState("ALL");
  const [searchView, setSearchView] = useState("");

  const [agentcts, setAgentcts] = useState<any[]>([]);
  const [TLView, setTLView] = useState<any[]>([]);
  const [DriverView, setDriver] = useState<any[]>([]);
  const [OMview, setOMView] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  interface AgentData {
    id: number; // Just define it as a number
    call_type: string | null;
    account_type: string | null;
    case_id: string | null;
    area: string | null;
    sub_area: string | null;
    transfer_call: string | null;
    transfer_destination: string | null;
    transfer_attuid: string | null;
    issue_resolved: string | null;
    is_customer_happy: string | null;
    provide_credit: string | null;
    credit_amount: string | null;
    credit_attuid: string | null;
    appointment_sameday: string | null;
    appointment_sameday_2: string | null;
    focus_driver: string | null;
    focus_driver_2: string | null;
    repeat_prediction: string | null;
    pplan_close: string | null;
    pplan_close_2: string | null;
    dispatch_call: string | null;
    due_date: string | null;
    select_time: string | null;
    dispatch_equipment: string | null;
    wmt: string | null;
    wmt_2: string | null;
    tool_issue: string | null;
    tool_issue_2: string | null;
    is_active: boolean;
    created_by: string | null;
    updated_by: string | null;
    full_name: string | null;
    tl_hrid: string | null;
    projectId: string | null;
  }

  const [selectedAgentData, setSelectedAgentData] = useState<AgentData[]>([
    {
      id: 0, // Allows id to be null
      call_type: null,
      account_type: null,
      case_id: null,
      area: null,
      sub_area: null,
      transfer_call: null,
      transfer_destination: null,
      transfer_attuid: null,
      issue_resolved: null,
      is_customer_happy: null,
      provide_credit: null,
      credit_amount: null,
      credit_attuid: null,
      appointment_sameday: null,
      appointment_sameday_2: null,
      focus_driver: null,
      focus_driver_2: null,
      repeat_prediction: null,
      pplan_close: null,
      pplan_close_2: null,
      dispatch_call: null,
      due_date: null,
      select_time: null,
      dispatch_equipment: null,
      wmt: null,
      wmt_2: null,
      tool_issue: null,
      tool_issue_2: null,
      is_active: false,
      created_by: null,
      updated_by: null,
      full_name: null,
      tl_hrid: null,
      projectId: null,
    },
  ]);

  useEffect(() => {
    // Prevent scrolling
    // document.body.style.overflow = "hidden";
    return () => {
      // Reset scrolling behavior when the component unmounts
      // document.body.style.overflow = "auto";
    };
  }, []);

  // The `handleOpenModal` function
  const handleOpenModal = async (agentId: number) => {
    try {
      console.log("Selected ID:", agentId); // Log the selected agent ID

      // Fetch the selected agent's data
      const agentData = await getSelectedAgent(agentId); // Assuming getSelectedAgent fetches agent data

      // Log the fetched agent data
      console.log("Agent Data:", agentData);

      // Set the selected agent data to the state
      setSelectedAgentData(agentData); // Set agent data, not just the agent ID

      // Open the modal
      setOpenModal(true);
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    // setSelectedAgentData(null); // Reset the selected agent's ID
  };

  const fetchAgentctsData = async () => {
    try {
      console.log("Selected View", searchView);

      // Resetting the state before making the new request
      setAgentcts([]); // Resetting Agentcts to empty array
      setTLView([]); // Resetting TLView to null
      setOMView([]); // Resetting TLView to null
      setDriver([]); // Resetting TLView to null

      if (searchView === "TEAM LEADER VIEW") {
        const lookupItemsData = await fetchagentcts(startDate, endDate);
        console.log("TL view: ", lookupItemsData.formatted_data);
        setAgentcts(lookupItemsData.queryset);
        setTLView(lookupItemsData.formatted_data); // Set the state to the formatted data directly
        console.log("Agent: ", agentcts);
      } else if (searchView === "OM VIEW") {
        // Add logic for another view (e.g., "ANOTHER VIEW")
        const anotherData = await fetchOMview(startDate, endDate);
        console.log("OM view: ", anotherData);
        setAgentcts(anotherData.queryset);
        setOMView(anotherData.formatted_data);
        setError(""); // Clear previous errors if successful
      } else if (searchView === "CAR DRIVER VIEW") {
        // Add logic for another view (e.g., "ANOTHER VIEW")
        const anotherData = await fetchCDview(startDate, endDate);
        console.log("OM view: ", anotherData);
        setAgentcts(anotherData.queryset);
        setDriver(anotherData.formatted_data);
        setError("");
      } else {
        // Handle other cases (if needed)
        console.log("No matching view selected.");
      }

      setError(""); // Clear previous errors if successful
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
            backgroundColor: "#ff6600",
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

      {/* TL Form */}
      {TLView.length || OMview.length > 0 ? (
        TLView.map((teamLeader, index) => (
          <Box sx={{ padding: 2, margin: 2 }} key={index}>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#ff6600",
                color: "white",
                padding: 1,
                borderRadius: 1,
              }}
            >
              Team Leader: {teamLeader.TL_NAME}
            </Typography>

            {/* Table */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "16px",
                borderRadius: "8px", // Add the radius here
                overflow: "hidden",
                border: "1px solid black",
                boxShadow: "rgb(0 0 0 / 13%) 0px 4px 8px", // Adding the shadow
                fontFamily: "'Arial', sans-serif", // Apply font here
              }}
            >
              {/* Table Head */}
              <thead>
                <tr
                  style={{
                    backgroundColor: "#ff6600",
                    color: "white",
                  }}
                >
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    AGENT NAME
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    ENTRIES
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    VoC
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    REPEAT RATE
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    CLOSE RATE
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    DISPATCH RATE
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    REPLACEMENT RATE
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    CPC/ADJUSTMENTS
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    TRANSFER RATE
                  </th>
                  <th style={{ border: "1px solid #000", padding: "8px" }}>
                    RESOLUTION RATE
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {teamLeader.AGENTS.length > 0 ? (
                  <>
                    {teamLeader.AGENTS.map(
                      (
                        agent: {
                          NAME:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          ENTRIES_COUNT:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          voc:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          REPEAT_RATE:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          CLOSE_RATE:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          Dispatch_Rate:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          Replacement_Rate:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          CPC_Adjustment:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          Transfer_Rate:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                          Resolution_Rate:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                        },
                        agentIndex: React.Key | null | undefined
                      ) => (
                        <tr
                          key={agentIndex}
                          style={
                            agentIndex === teamLeader.AGENTS.length - 1
                              ? { backgroundColor: "rgb(255 102 0 / 0%)" }
                              : {}
                          }
                        >
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.NAME}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.ENTRIES_COUNT}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.voc}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.REPEAT_RATE}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.CLOSE_RATE}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.Dispatch_Rate}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.Replacement_Rate}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.CPC_Adjustment}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.Transfer_Rate}
                          </td>
                          <td
                            style={{ border: "1px solid gray", padding: "8px" }}
                          >
                            {agent.Resolution_Rate}
                          </td>
                        </tr>
                      )
                    )}

                    {/* Total Row */}
                    <tr>
                      <td
                        style={{
                          border: "1px solid gray",
                          textAlign: "center",
                          padding: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        Total
                      </td>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {/* Sum of Entries */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { ENTRIES_COUNT: any }) =>
                            acc + (Number(agent.ENTRIES_COUNT) || 0),
                          0
                        )}
                      </td>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {/* Sum of voc */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { voc: any }) =>
                            acc + (Number(agent.voc) || 0),
                          0
                        )}
                      </td>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {/* Sum of REPEAT_RATE with 2 decimal points */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { REPEAT_RATE: any }) =>
                            acc +
                            (Number(agent.REPEAT_RATE.replace("%", "")) || 0),
                          0
                        ).toFixed(2)}
                        %
                      </td>

                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {/* Sum of CLOSE_RATE with 2 decimal points, after removing '%' */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { CLOSE_RATE: any }) =>
                            acc +
                            (Number(agent.CLOSE_RATE.replace("%", "")) || 0),
                          0
                        ).toFixed(2)}
                      </td>

                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {/* Sum of Dispatch_Rate */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { Dispatch_Rate: string }) =>
                            acc +
                            (Number(agent.Dispatch_Rate.replace("%", "")) || 0),
                          0
                        )}
                        %
                      </td>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {/* Sum of Replacement_Rate with 2 decimal points, after removing '%' */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { Replacement_Rate: any }) =>
                            acc +
                            (Number(agent.Replacement_Rate.replace("%", "")) ||
                              0),
                          0
                        ).toFixed(2)}
                        %
                      </td>

                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        $
                        {/* Sum of CPC_Adjustment with 2 decimal points, after removing '$' */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { CPC_Adjustment: any }) =>
                            acc +
                            (Number(agent.CPC_Adjustment.replace("$", "")) ||
                              0),
                          0
                        ).toFixed(2)}
                      </td>

                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {/* Sum of Transfer_Rate, removing '%' and formatting to 2 decimal points */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { Transfer_Rate: any }) =>
                            acc +
                            (Number(agent.Transfer_Rate.replace("%", "")) || 0),
                          0
                        ).toFixed(2)}
                        %
                      </td>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {/* Sum of Resolution_Rate, removing '%' and formatting to 2 decimal points */}
                        {teamLeader.AGENTS.reduce(
                          (acc: number, agent: { Resolution_Rate: any }) =>
                            acc +
                            (Number(agent.Resolution_Rate.replace("%", "")) ||
                              0),
                          0
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      style={{
                        border: "1px solid #000",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      No agents available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
        </Typography>
      )}

      {/* OM Form */}
      {OMview.length > 0 && (
        <Box sx={{ padding: 2, margin: 2 }}>
          {/* Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "16px",
              borderRadius: "8px", // Add the radius here
              overflow: "hidden",
              border: "1px solid black",
              boxShadow: "rgb(0 0 0 / 13%) 0px 4px 8px", // Adding the shadow
              fontFamily: "'Arial', sans-serif", // Apply font here
            }}
          >
            {/* Table Head */}
            <thead>
              <tr
                style={{
                  backgroundColor: "#ff6600",
                  color: "white",
                }}
              >
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  NAME
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  ENTRIES
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  VoC
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  REPEAT RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  CLOSE RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  DISPATCH RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  REPLACEMENT RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  CPC/ADJUSTMENTS
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  TRANSFER RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  RESOLUTION RATE
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {OMview.map((agent, agentIndex) => (
                <tr
                  key={agentIndex}
                  style={
                    agentIndex === OMview.length - 1
                      ? { backgroundColor: "rgb(255 102 0 / 0%)" }
                      : {}
                  }
                >
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.TL_NAME}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.ENTRIES_COUNT}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.VoC || "-"}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.REPEAT_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.CLOSER_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.DISPATCH_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.REPLACEMENT_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.CPC_ADJ}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.TRANSFER_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.RESOLUTION_RATE}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr>
                <td
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Total
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {/* Sum of Entries */}
                  {OMview.reduce(
                    (acc, agent) => acc + (Number(agent.ENTRIES_COUNT) || 0),
                    0
                  )}
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>-</td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {OMview.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.REPEAT_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {OMview.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.CLOSER_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {OMview.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.DISPATCH_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {OMview.reduce(
                    (acc, agent) =>
                      acc +
                      (Number(agent.REPLACEMENT_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  $
                  {OMview.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.CPC_ADJ.replace("$", "")) || 0),
                    0
                  ).toFixed(2)}
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {OMview.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.TRANSFER_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {OMview.reduce(
                    (acc, agent) =>
                      acc +
                      (Number(agent.RESOLUTION_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      )}

      {/* CD Form */}
      {DriverView.length > 0 && (
        <Box sx={{ padding: 2, margin: 2 }}>
          {/* Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "16px",
              borderRadius: "8px", // Add the radius here
              overflow: "hidden",
              border: "1px solid black",
              boxShadow: "rgb(0 0 0 / 13%) 0px 4px 8px", // Adding the shadow
              fontFamily: "'Arial', sans-serif", // Apply font here
            }}
          >
            {/* Table Head */}
            <thead>
              <tr
                style={{
                  backgroundColor: "#ff6600",
                  color: "white",
                }}
              >
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  NAME
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  ENTRIES
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  VoC
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  REPEAT RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  CLOSE RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  DISPATCH RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  REPLACEMENT RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  CPC/ADJUSTMENTS
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  TRANSFER RATE
                </th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>
                  RESOLUTION RATE
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {DriverView.map((agent, agentIndex) => (
                <tr
                  key={agentIndex}
                  style={
                    agentIndex === DriverView.length - 1
                      ? { backgroundColor: "rgb(255 102 0 / 0%)" }
                      : {}
                  }
                >
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.TL_NAME}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.ENTRIES_COUNT}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.VoC || "-"}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.REPEAT_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.CLOSE_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.DISPATCH_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.REPLACEMENT_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.CPC_ADJ}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.TRANSFER_RATE}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {agent.RESOLUTION_RATE}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr>
                <td
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Total
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {/* Sum of Entries */}
                  {DriverView.reduce(
                    (acc, agent) => acc + (Number(agent.ENTRIES_COUNT) || 0),
                    0
                  )}
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>-</td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {DriverView.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.REPEAT_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {DriverView.reduce((acc, agent) => {
                    // Ensure CLOSER_RATE is a valid string and replace "%" properly
                    const closerRate = parseFloat(
                      agent.CLOSE_RATE?.replace("%", "") || 0
                    );
                    return acc + (isNaN(closerRate) ? 0 : closerRate);
                  }, 0).toFixed(2)}
                  %
                </td>

                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {DriverView.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.DISPATCH_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {DriverView.reduce(
                    (acc, agent) =>
                      acc +
                      (Number(agent.REPLACEMENT_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  $
                  {DriverView.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.CPC_ADJ.replace("$", "")) || 0),
                    0
                  ).toFixed(2)}
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {DriverView.reduce(
                    (acc, agent) =>
                      acc + (Number(agent.TRANSFER_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
                <td style={{ border: "1px solid gray", padding: "8px" }}>
                  {DriverView.reduce(
                    (acc, agent) =>
                      acc +
                      (Number(agent.RESOLUTION_RATE.replace("%", "")) || 0),
                    0
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      )}

      {/* Support Form */}
      {agentcts.length > 0 && (
        <Box sx={{ padding: 2, margin: 2 }}>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "#ff6600",
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
              borderRadius: "8px", // Add the radius here
              overflow: "hidden",
              border: "1px solid black",
              boxShadow: "rgb(0 0 0 / 13%) 0px 4px 8px", // Adding the shadow
              fontFamily: "'Arial', sans-serif", // Apply font here
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#ff6600", color: "white" }}>
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
              {agentcts.length > 0 ? (
                agentcts
                  .sort((a, b) => {
                    const dateA = new Date(a.date_created);
                    const dateB = new Date(b.date_created);
                    return dateB.getTime() - dateA.getTime(); // Sorting by latest date
                  })
                  .map((agent, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {agent.id}
                      </td>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {agent.full_name}
                      </td>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {agent.call_type}
                      </td>
                      <td
                        style={{
                          border: "1px solid gray",
                          padding: "8px",
                          color: agent.account_type ? "inherit" : "#888", // Gray color when null
                          opacity: agent.account_type ? 1 : 0.5, // Less opacity when null
                        }}
                      >
                        {agent.account_type || "N/A"}{" "}
                        {/* Display "N/A" when account_type is null */}
                      </td>
                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        {new Date(agent.date_created)
                          .toLocaleString("en-US", {
                            weekday: "short", // Example: "Mon"
                            year: "numeric", // Example: "2024"
                            month: "short", // Example: "Jun"
                            day: "numeric", // Example: "14"
                            hour: "2-digit", // Example: "09"
                            minute: "2-digit", // Example: "14"
                            hour12: true, // 12-hour format (AM/PM)
                          })
                          .replace(",", "")}{" "}
                      </td>

                      <td style={{ border: "1px solid gray", padding: "8px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            console.log("Clicked on agent ID:", agent.id); // Check the value of agent.id
                            handleOpenModal(agent.id);
                          }}
                        >
                          Update
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
          <SupportModal
            open={openModal}
            handleClose={handleCloseModal}
            agentData={selectedAgentData} // Pass the agent data here
          />
        </Box>
      )}
    </Box>
  );
};

export default Support;
