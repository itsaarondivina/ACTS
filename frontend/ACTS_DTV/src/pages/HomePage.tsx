/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  TextField,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { fetchLookup } from "../utils/api";

interface LookupItem {
  id: number;
  category_id: number;
  value: string;
  item_name: string;
  is_active: boolean;
}

const AgentForm: React.FC = () => {
  const [lookup, setLookupItems] = useState<LookupItem[]>([]);
  const [selectedCallType, setSelectedCallType] = useState<string>(""); // State to hold selected call type
  const [selectedAccountType, setSelectedAccountType] = useState<string>(""); // State to hold selected account type
  const [caseId, setCaseId] = useState<string>(""); // State for Case ID
  const [areaCtv, setArea] = useState<string>(""); // State for Case ID
  const [subArea, setsubArea] = useState<string>(""); // State for Case ID
  const [subAreaOptions, setSubAreaOptions] = useState<
    { id: number; item_name: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lookupItemsData = await fetchLookup();
        setLookupItems(lookupItemsData);
        console.log("Lookup Items home page: ", lookupItemsData);
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter choices with category_id 1 for the Call Type options
  const callTypeOptions = lookup.filter(
    (item) => item.category_id === 1 && item.is_active === true
  );
  const accountTypeOptions = lookup.filter(
    (item) => item.category_id === 2 && item.is_active === true
  );
  const AreaOptions = lookup.filter(
    (item) => item.category_id === 3 && item.is_active === true
  );

  const handleCallTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCallType(event.target.value);
    console.log("Selected Call Type: ", event.target.value);
  };

  const handleAreaChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    setArea(newValue);

    console.log("Selected Area:", newValue);

    // Define the newSubAreaOptions array outside the if block
    let newSubAreaOptions: React.SetStateAction<
      { id: number; item_name: string }[]
    > = [];

    if (newValue === "SATELLITE BILLING") {
      newSubAreaOptions = [
        { id: 1, item_name: "PROGRAMMING DISPUTE" },
        { id: 2, item_name: "REFUND" },
        { id: 3, item_name: "COLLECTIONS" },
        { id: 4, item_name: "DIDN'T RECEIVE BILL" },
        { id: 5, item_name: "LOWER BILL" },
        { id: 6, item_name: "AUTO PAY" },
        { id: 7, item_name: "BALANCE REQUEST" },
        { id: 8, item_name: "OTHER BILLING ISSUE - NOTATED" },
        { id: 9, item_name: "PPV CHARGE" },
        { id: 10, item_name: "PAYMENT - LATE" },
        { id: 11, item_name: "PAYMENT - NEW" },
        { id: 12, item_name: "PAYMENT - UPDATE" },
        { id: 13, item_name: "DUE DATE CHANGE" },
        { id: 14, item_name: "DUE DATE REQUEST" },
        { id: 15, item_name: "PROMO ROLLOFF" },
        { id: 16, item_name: "FRAUD" },
        { id: 17, item_name: "PAPERLESS BILLING" },
        { id: 18, item_name: "PAYMENT - ARRANGEMENT" },
        { id: 19, item_name: "PAYMENT - HISTORY" },
        { id: 20, item_name: "NFL SUNDAY TICKET" },
      ];
    }

    // Set the new options for sub-areas
    setSubAreaOptions(newSubAreaOptions);

    // Add any additional actions here, if needed
    // For example: setAnotherState(newValue);
  };

  const handleAccountTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedAccountType(event.target.value);
    console.log("Selected Account Type: ", event.target.value);
  };

  const handleSave = () => {
    // Log selected values when Save is pressed
    console.log("Form Data:");
    console.log("Selected Call Type: ", selectedCallType);
    console.log("Selected Account Type: ", selectedAccountType);
    console.log("Case ID: ", caseId); // Log the Case ID
  };

  return (
    <Box
      padding={3}
      sx={{ backgroundColor: "white", minHeight: "100vh", margin: "0px 10vh" }}
    >
      <Typography
        variant="h4"
        component="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
        marginTop={"15vh"}
        fontSize={"40px"}
      >
        Agent Form - DAVAO DTV TECH
      </Typography>

      <Box
        display="flex"
        justifyContent="flex-end"
        gap={2}
        marginBottom={2}
        width="100%"
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleSave} // Attach the save handler here
        >
          Save
        </Button>
        <Button variant="contained" color="error" startIcon={<ClearIcon />}>
          Clear
        </Button>
      </Box>

      <Typography
        variant="subtitle1"
        align="left"
        color="textSecondary"
        marginBottom={2}
      >
        NOTE: ALL FIELDS WITH (*) ARE REQUIRED TO BE FILLED OUT FOR YOU TO BE
        ABLE TO SAVE
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ backgroundColor: "#ff6600", padding: 1, color: "#fff" }}>
          <Typography variant="h6" fontWeight="bold">
            DTV Video Tech Call Tracker
          </Typography>
        </Box>

        <Box padding={2}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              required
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              Call Type
            </FormLabel>
            <RadioGroup
              row
              aria-label="call-type"
              name="call-type"
              value={selectedCallType}
              onChange={handleCallTypeChange}
            >
              {callTypeOptions.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.item_name}
                  control={<Radio />}
                  label={option.item_name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Conditionally render Account Type section */}
        {selectedCallType !== "Ghost Call" && (
          <>
            <hr
              style={{
                border: "1px dotted black",
                marginTop: 2,
                marginBottom: 2,
              }}
            />
            <Box padding={2}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  required
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Account Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="account-type"
                  name="account-type"
                  value={selectedAccountType}
                  onChange={handleAccountTypeChange} // Add handler here
                >
                  {accountTypeOptions.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.item_name}
                      control={<Radio />}
                      label={option.item_name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>

            <hr
              style={{
                border: "1px dotted black",
                marginTop: 2,
                marginBottom: 2,
              }}
            />

            {/* Case ID Input Field */}
            <Box padding={2}>
              <FormControl component="fieldset" sx={{ marginRight: 5 }}>
                <FormLabel
                  component="legend"
                  required
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {selectedAccountType === "RC1" && "Service Request"}
                  {selectedAccountType === "RIO" && "CASE ID"}
                  {(selectedAccountType === "No Account" ||
                    selectedAccountType === "") &&
                    "CASE ID/Service Request"}
                </FormLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  sx={{ width: 400 }}
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  inputProps={{ maxLength: 16 }} // Ensures max length in the input
                  // helperText="Max length is 16 characters"
                />
                <FormHelperText>Max length is 16 characters</FormHelperText>
              </FormControl>

              <FormControl component="fieldset" sx={{ marginRight: 5 }}>
                <FormLabel
                  component="legend"
                  required
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {selectedAccountType === "RC1" && "CTV Level 3"}
                  {selectedAccountType === "RIO" && "Area"}
                  {(selectedAccountType === "No Account" ||
                    selectedAccountType === "") &&
                    "Area / CTV Level 3"}
                </FormLabel>

                <Select
                  variant="outlined"
                  fullWidth
                  sx={{ width: 400 }}
                  value={areaCtv}
                  onChange={handleAreaChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {AreaOptions.map((option) => (
                    <MenuItem key={option.id} value={option.item_name}>
                      {option.item_name}{" "}
                      {/* Replace with correct property if needed */}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Sub Area Field */}

              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  required
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {selectedAccountType === "RC1" && "CTV Level 4"}
                  {selectedAccountType === "RIO" && "Sub-Area"}
                  {(selectedAccountType === "No Account" ||
                    selectedAccountType === "") &&
                    "Sub-Area / CTV Level 4"}
                </FormLabel>

                <Select
                  variant="outlined"
                  fullWidth
                  sx={{ width: 400 }}
                  value={subArea}
                  onChange={(e) => setsubArea(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {subAreaOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.item_name}
                      {/* Replace with the correct property name */}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default AgentForm;
