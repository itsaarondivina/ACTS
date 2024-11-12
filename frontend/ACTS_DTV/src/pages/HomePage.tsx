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
  const [selectedTransferCall, setSelectedTransferCall] = useState<string>(""); // State to hold selected call type
  const [selectedAccountType, setSelectedAccountType] = useState<string>(""); // State to hold selected account type
  const [caseId, setCaseId] = useState<string>(""); // State for Case ID
  const [areaCtv, setArea] = useState<string>(""); // State for Case ID
  const [transferDestination, setTransferDestination] = useState<string>(""); // State for Case ID
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
  const transfertypeOptions = lookup.filter(
    (item) => item.category_id === 19 && item.is_active === true
  );
  const accountTypeOptions = lookup.filter(
    (item) => item.category_id === 2 && item.is_active === true
  );
  const AreaOptions = lookup.filter(
    (item) => item.category_id === 3 && item.is_active === true
  );
  const transferDestinationOptions = lookup.filter(
    (item) => item.category_id === 4 && item.is_active === true
  );

  const handleCallTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCallType(event.target.value);
    console.log("Selected Call Type: ", event.target.value);
  };

  const handleTransfercall = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTransferCall(event.target.value);
    console.log("Selected Transfer Call: ", event.target.value);
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
    } else if (newValue === "SATELLITE SERVICE") {
      newSubAreaOptions = [
        { id: 1, item_name: "DTV.COM - LOGIN ISSUE" },
        { id: 2, item_name: "DTV.COM - REGISTER" },
        { id: 3, item_name: "PROGRAMMING - ADD" },
        { id: 4, item_name: "PROGRAMMING - CHANGE" },
        { id: 5, item_name: "PROGRAMMING - REMOVE" },
        { id: 6, item_name: "SUSPEND SERVICE" },
        { id: 7, item_name: "UNSUSPEND SERVICE" },
        { id: 8, item_name: "ADD/REMOVE PPLAN" },
        { id: 9, item_name: "ACCT PIN/PASSWORD - ISSUE" },
        { id: 10, item_name: "CHANGE ADDRESS" },
        { id: 11, item_name: "COMPLETE TOBR" },
        { id: 12, item_name: "OTHER SERVICE ISSUE - NOTATED" },
      ];
    } else if (newValue === "CANCEL DIRECTV ACCT") {
      newSubAreaOptions = [
        { id: 1, item_name: "MOVING" },
        { id: 2, item_name: "CHANNEL LOSS" },
        { id: 3, item_name: "DECEASED" },
        { id: 4, item_name: "NATURAL DISASTER" },
        { id: 5, item_name: "NO LANDLORD PERMISSION" },
        { id: 6, item_name: "NO LINE OF SIGHT" },
        { id: 7, item_name: "PRICE/VALUE" },
        { id: 8, item_name: "CORD CUTTER - STREAMING" },
        { id: 9, item_name: "MILITARY" },
        { id: 10, item_name: "POS MISINFORMATION" },
        { id: 11, item_name: "UNRESOLVED TECH ISSUE" },
        { id: 12, item_name: "OTHER/NO REASON PROVIDED" },
      ];
    } else if (newValue === "MOVERS") {
      newSubAreaOptions = [
        { id: 1, item_name: "EQUIPMENT RELOCATION" },
        { id: 2, item_name: "MOVING WITH DTV" },
        { id: 3, item_name: "NEW MOVE ORDER" },
        { id: 4, item_name: "SNOWBIRDS" },
        { id: 5, item_name: "EXISTING SVC AT MOVE TO" },
      ];
    } else if (newValue === "RECONNECTS") {
      newSubAreaOptions = [
        { id: 1, item_name: "COLLECTIONS" },
        { id: 2, item_name: "EQUIPMENT RETURN" },
        { id: 3, item_name: "FINAL BILL" },
        { id: 4, item_name: "REFUND REQUEST" },
        { id: 5, item_name: "MARKETING OFFER RECEIVED" },
      ];
    } else if (newValue === "SATELLITE TECHNICAL") {
      newSubAreaOptions = [
        { id: 1, item_name: "EQUIPMENT - ACTIVATE" },
        { id: 2, item_name: "PARENTAL CONTROLS" },
        { id: 3, item_name: "TRICKPLAY - PAUSE, RW, FF ISSUE" },
        { id: 4, item_name: "NON DTV - HELP CONNECTING" },
        { id: 5, item_name: "NON DTV - TECHNICAL ISSUE" },
        { id: 6, item_name: "GEMINI SELF INSTALL" },
      ];
    } else if (newValue === "AUDIO/VIDEO ISSUES") {
      newSubAreaOptions = [
        { id: 1, item_name: "BLACK/BLUE/GRAY SCREEN" },
        { id: 2, item_name: "BANNER NO PROGRAM" },
        { id: 3, item_name: "FREEZE FRAME/PIXELIZATION" },
        { id: 4, item_name: "NO AUDIO WITH VIDEO" },
        { id: 5, item_name: "NO VIDEO WITH AUDIO" },
        { id: 6, item_name: "AUDIO DISTORTED/INCORRECT" },
        { id: 7, item_name: "EXPLAIN HOW-TO" },
      ];
    } else if (newValue === "EQUIPMENT ISSUES") {
      newSubAreaOptions = [
        { id: 1, item_name: "ISSUE WITH RECORDING" },
        { id: 2, item_name: "GUIDE MISSING/TO BE ANNOUNCED" },
        { id: 3, item_name: "RECEIVER WILL NOT TURN ON" },
        { id: 4, item_name: "RECEIVER RESETS ITSELF" },
        { id: 5, item_name: "MENU/GUIDE SLOWNESS" },
        { id: 6, item_name: "RECEIVER MAKING LOUD NOISE" },
        { id: 7, item_name: "HELP CONNECTING RECEIVER" },
        { id: 8, item_name: "ACCESS CARD ISSUES" },
        { id: 9, item_name: "RECEIVER CHANGING CHANNELS" },
      ];
    } else if (newValue === "INTERNET/STREAMING/PPV ISSUES") {
      newSubAreaOptions = [
        { id: 1, item_name: "PPV ISSUE" },
        { id: 2, item_name: "INTERNET - NEVER CONNECTED" },
        { id: 3, item_name: "INTERNET - NOT DETECTED" },
        { id: 4, item_name: "STREAMING CONTENT ISSUES" },
        { id: 5, item_name: "INTERNET FEATURES - TV APPS" },
      ];
    } else if (newValue === "ON SCREEN DISPLAY ERROR (OSD)") {
      newSubAreaOptions = [
        { id: 1, item_name: "775 - SWIM NETWORK NOT FOUND" },
        { id: 2, item_name: "782 - SWIM CONNECTION LOST" },
        { id: 3, item_name: "771 - SFSS/NOT ALL RECEIVERS" },
        { id: 4, item_name: "771 - SFSS/ALL RECEIVERS" },
        { id: 5, item_name: "721 - SERVICE NOT AUTHORIZED" },
        { id: 6, item_name: "722 - SERVICE EXPIRED" },
        { id: 7, item_name: "203 - SERVICE INTERRUPTED" },
        { id: 8, item_name: "920 - MISSING GUIDE INFO" },
        { id: 9, item_name: "923/14/15 - HARD DRIVE ISSUES" },
        { id: 10, item_name: "CHANNEL/STATION NOT AVAILABLE" },
        { id: 11, item_name: "LOCATION NOT AUTHORIZED" },
        { id: 12, item_name: "NO SERVERS DETECTED" },
        { id: 13, item_name: "WIRED CONNECTION LOST" },
        { id: 14, item_name: "WIRELESS CONNECTION LOST" },
        { id: 15, item_name: "724/725/726 - RID ISSUES" },
        { id: 16, item_name: "727 - PROG NOT AVAIL IN AREA" },
        { id: 17, item_name: "744/745/746 - CARD/READER PROB" },
        { id: 18, item_name: "761/762 - INSERT ACCESS CARD" },
        { id: 19, item_name: "776 - TUNER LIMIT EXCEEDED" },
        { id: 20, item_name: "RECEIVER RESET NEEDED" },
        { id: 21, item_name: "TEMPERATURE WAS TOO HIGH" },
        { id: 22, item_name: "611 - VIDEO CONNECTION LOST" },
        { id: 23, item_name: "612 - VIDEO CONNECTION LOST" },
        { id: 24, item_name: "613 - VIDEO CONNECTION LOST" },
        { id: 25, item_name: "614 - VIDEO CONNECTION LOST" },
        { id: 26, item_name: "615 - VIDEO CONNECTION LOST" },
        { id: 27, item_name: "616 - VIDEO CONNECTION LOST" },
        { id: 28, item_name: "617 - VIDEO CONNECTION LOST" },
        { id: 29, item_name: "618 - VIDEO CONNECTION LOST" },
        { id: 30, item_name: "619 - VIDEO CONNECTION LOST" },
        { id: 31, item_name: "620 - VIDEO SIGNAL LOST" },
        { id: 32, item_name: "621 - VIDEO SIGNAL LOST" },
        { id: 33, item_name: "622 - VIDEO SIGNAL LOST" },
        { id: 34, item_name: "623 - VIDEO SIGNAL LOST" },
        { id: 35, item_name: "624 - VIDEO SIGNAL LOST" },
        { id: 36, item_name: "625 - VIDEO SIGNAL LOST" },
        { id: 37, item_name: "215 - YOUR GEMINI IS LOCKED" },
        { id: 38, item_name: "216 - YOUR GEMINI IS NOT CONNECTED" },
        { id: 39, item_name: "217 - GEMINI NOT CONNECTED" },
        { id: 40, item_name: "218 - DEVELOPER MODE" },
        { id: 41, item_name: "219 - SOFTWARE UPDATE REQUIRED" },
        { id: 42, item_name: "4K/UHD OSD" },
      ];
    } else if (newValue === "REMOTE CONTROL ISSUES") {
      newSubAreaOptions = [
        { id: 1, item_name: "LOST/DAMAGED" },
        { id: 2, item_name: "PROGRAM TO RF" },
        { id: 3, item_name: "PROGRAM TO RECEIVER" },
        { id: 4, item_name: "PROGRAM TO OTHER DEVICES" },
        { id: 5, item_name: "NOT CONTROLLING OTHER DEVICES" },
        { id: 6, item_name: "NOT CONTROLLING RECEIVER" },
        { id: 7, item_name: "NOT CONTROLLING RECVR" },
      ];
    } else if (newValue === "SATELLITE ORDER") {
      newSubAreaOptions = [
        { id: 1, item_name: "CANCEL ORDER" },
        { id: 2, item_name: "MODIFY ORDER" },
        { id: 3, item_name: "NEW PPV ORDER" },
        { id: 4, item_name: "NEW UPGRADE ORDER" },
        { id: 5, item_name: "ORDER STATUS" },
        { id: 6, item_name: "RETURN EQUIPMENT" },
        { id: 7, item_name: "PENDING ORDER" },
        { id: 8, item_name: "NEW RECONNECT ORDER" },
        { id: 9, item_name: "NEW SERVICE ORDER" },
        { id: 10, item_name: "NEW EQUIPMENT ORDER" },
        { id: 11, item_name: "NEW MOVE ORDER" },
        { id: 12, item_name: "OTHER ORDER ISSUE - NOTATED" },
      ];
    } else if (newValue === "SATELLITE APPOINTMENT") {
      newSubAreaOptions = [
        { id: 1, item_name: "WHERE'S MY TECH" },
        { id: 2, item_name: "APPT - CANCEL" },
        { id: 3, item_name: "APPT - RESCHEDULE" },
        { id: 4, item_name: "APPT - STATUS" },
        { id: 5, item_name: "DISPATCH ON DEMAND" },
        { id: 6, item_name: "MISSED APPT" },
        { id: 7, item_name: "DAMAGE CLAIM" },
        { id: 8, item_name: "SCHEDULE - INSTALL" },
        { id: 9, item_name: "SCHEDULE - REPAIR" },
        { id: 10, item_name: "TECH CALLING IN" },
      ];
    } else if (newValue === "NON-DIRECTV") {
      newSubAreaOptions = [
        { id: 1, item_name: "BROADBAND" },
        { id: 2, item_name: "MOBILITY" },
        { id: 3, item_name: "NON-AUTHORIZED USER" },
        { id: 4, item_name: "3RD PARTY STREAMING" },
        { id: 5, item_name: "PROTECTION PLAN PREMIER" },
        { id: 6, item_name: "OTHER ISSUE - NOTATED" },
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
    setCaseId("");
    setArea("");
    setsubArea("");
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
            <Box
              padding={2}
              display="flex"
              gap={2}
              alignItems="flex-start"
              flexWrap="nowrap"
            >
              <FormControl
                component="fieldset"
                sx={{ marginRight: 5, flex: 1 }}
              >
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
                  sx={{ width: 1 }}
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  inputProps={{ maxLength: 16 }}
                />
                <FormHelperText>Max length is 16 characters</FormHelperText>
              </FormControl>

              <FormControl
                component="fieldset"
                sx={{ marginRight: 5, flex: 1 }}
              >
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
                  sx={{
                    width: 1,
                    cursor:
                      selectedAccountType === "No Account"
                        ? "not-allowed"
                        : "pointer", // Change pointer style based on condition
                    "& .Mui-disabled": {
                      cursor: "not-allowed", // Ensure cursor is 'not-allowed' when disabled
                    },
                  }}
                  value={areaCtv}
                  onChange={handleAreaChange}
                  displayEmpty
                  disabled={selectedAccountType === "No Account"} // Use curly braces for the condition
                >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {AreaOptions.map((option) => (
                    <MenuItem key={option.id} value={option.item_name}>
                      {option.item_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl component="fieldset" sx={{ flex: 1 }}>
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
                  sx={{
                    width: 1,
                    cursor:
                      selectedAccountType === "No Account"
                        ? "not-allowed"
                        : "pointer", // Change pointer style based on condition
                    "& .Mui-disabled": {
                      cursor: "not-allowed", // Ensure cursor is 'not-allowed' when disabled
                    },
                  }}
                  value={subArea}
                  onChange={(e) => setsubArea(e.target.value)}
                  displayEmpty
                  disabled={selectedAccountType === "No Account"} // Use curly braces for the condition
                >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {subAreaOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.item_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <hr
              style={{
                border: "1px dotted black",
                marginTop: 2,
                marginBottom: 2,
              }}
            />
            <Box
              padding={2}
              display="flex"
              gap={2}
              alignItems="flex-start"
              flexWrap="nowrap"
            >
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  required
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Transfer Call
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="call-type"
                  name="call-type"
                  value={selectedTransferCall}
                  onChange={handleTransfercall}
                >
                  {transfertypeOptions.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.item_name}
                      control={<Radio />}
                      label={option.item_name}
                      sx={{ marginRight: 22 }} // Add space between options

                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormControl
                component="fieldset"
                sx={{ marginRight: 5, flex: 1 }}
              >
                <FormLabel
                  component="legend"
                  required
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Transfer Destination
                </FormLabel>
                <Select
                  variant="outlined"
                  fullWidth
                  sx={{
                    width: 1,
                    cursor:
                      selectedTransferCall === "No" ? "not-allowed" : "pointer", // Change pointer style based on condition
                    "& .Mui-disabled": {
                      cursor: "not-allowed", // Ensure cursor is 'not-allowed' when disabled
                    },
                  }}
                  value={transferDestination}
                  onChange={(event) =>
                    setTransferDestination(event.target.value as string)
                  } // Ensure correct type
                  displayEmpty
                  disabled={selectedTransferCall === "No"} // Use curly braces for the condition
                >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {transferDestinationOptions.map((option) => (
                    <MenuItem key={option.id} value={option.item_name}>
                      {option.item_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                component="fieldset"
                sx={{ marginRight: 5, flex: 1 }}
              >
                <FormLabel
                  component="legend"
                  required
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Transfer Approver's ATTUID
                </FormLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  sx={{ width: 1 }}
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  inputProps={{ maxLength: 6 }}
                  disabled={selectedTransferCall === "No"}
                />
              </FormControl>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default AgentForm;
