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
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { fetchLookup, saveAgentCtsItem } from "../utils/api";
import { getTLOMdetails } from "../utils/authentication";
import ScrollToTopButton from "../utils/scrolltoTop";

interface LookupItem {
  id: number;
  category_id: number;
  value: string;
  item_name: string;
  is_active: boolean;
}

const AgentForm: React.FC = () => {
  const [lookup, setLookupItems] = useState<LookupItem[]>([]);
  const [selectedCallType, setSelectedCallType] = useState<string>("");
  const [selectedTransferCall, setSelectedTransferCall] = useState<string>("");
  const [selectedIssueResolved, setIssueResolved] = useState<string>("");
  const [selectedIsCustomer, setIsCustomer] = useState<string>("");
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");
  const [selectedCredit, setSelectedCredit] = useState<string>("");
  const [selectedRepeatPrediction, setRepeatPrediction] = useState<string>(""); // State to hold selected account type
  const [selectedPplan, setPplan] = useState<string>(""); // State to hold selected account type
  const [selectedDispatch, setDispatch] = useState<string>(""); // State to hold selected account type
  const [selectedPplan2, setPplan2] = useState<string>(""); // State to hold selected account type
  const [selectedAppointmentSameday, setAppointmentSameday] =
    useState<string>(""); // State to hold selected account type
  const [selectedCallDriver, setcallDriver] = useState<string>(""); // State to hold selected account type
  const [caseId, setCaseId] = useState<string>(""); // State for Case ID
  const [transferAttuid, setTransferAttuid] = useState<string>(""); // State for Case ID
  const [creditAmount, setCreditAmount] = useState<string>(""); // State for Case ID
  const [dispatchEquipment, setdispatchEquipment] = useState<string>(""); // State for Case ID
  const [creditAttuid, setCreditAttuid] = useState<string>(""); // State for Case ID
  const [areaCtv, setArea] = useState<string>(""); // State for Case ID
  const [transferDestination, setTransferDestination] = useState<string>(""); // State for Case ID
  const [selectTime, setTime] = useState<string>(""); // State for Case ID
  const [sameDayDropdown, setsameDayDropdown] = useState<string>(""); // State for Case ID
  const [wmtDropdown, setwmtDropdown] = useState<string>(""); // State for Case ID
  const [callDriverDropdown, setcallDriverDropdown] = useState<string>(""); // State for Case ID
  const [toolIssueDropdown, settoolIssueDropdown] = useState<string>(""); // State for Case ID
  const [subArea, setsubArea] = useState<string>(""); // State for Case ID
  const [dueDate, setdueDate] = useState<string>(""); // State for Case ID
  const [selectedWMT, setWMT] = useState<string>(""); // State for Case ID
  const [selectedToolIssue, setToolIssue] = useState<string>(""); // State to hold selected account type

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

  const authTokenString = sessionStorage.getItem("authToken");
  const authToken = authTokenString ? JSON.parse(authTokenString) : null;
  // const profilePic = authToken?.profilepicture || "/path/to/default-image.png";
  const fullName = authToken?.name || "User";
  const id = authToken?.id || "User";
  const tl_id = authToken?.tl_Id || "User";
  const Country = authToken?.Country || "User";

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
  const issueResolvedOptions = lookup.filter(
    (item) => item.category_id === 5 && item.is_active === true
  );
  const isCustomerOptions = lookup.filter(
    (item) => item.category_id === 6 && item.is_active === true
  );
  const creditOptions = lookup.filter(
    (item) => item.category_id === 7 && item.is_active === true
  );
  const samedayOptions = lookup.filter(
    (item) => item.category_id === 8 && item.is_active === true
  );
  const samedaydropdownOptions = lookup.filter(
    (item) => item.category_id === 20 && item.is_active === true
  );
  const callDriverdropdownOptions = lookup.filter(
    (item) => item.category_id === 21 && item.is_active === true
  );
  const driverOption = lookup.filter(
    (item) => item.category_id === 9 && item.is_active === true
  );
  const repeatPredictionOption = lookup.filter(
    (item) => item.category_id === 10 && item.is_active === true
  );

  const pplanOption = lookup.filter(
    (item) => item.category_id === 11 && item.is_active === true
  );
  const pplanOption2 = lookup.filter(
    (item) => item.category_id === 12 && item.is_active === true
  );
  const dipatchOption = lookup.filter(
    (item) => item.category_id === 13 && item.is_active === true
  );
  const timeOption = lookup.filter(
    (item) => item.category_id === 14 && item.is_active === true
  );
  const wmtOptions = lookup.filter(
    (item) => item.category_id === 15 && item.is_active === true
  );
  const wmtDropdownOptions = lookup.filter(
    (item) => item.category_id === 16 && item.is_active === true
  );
  const ToolIssueDropdownOptions = lookup.filter(
    (item) => item.category_id === 18 && item.is_active === true
  );

  const ToolissueOptions = lookup.filter(
    (item) => item.category_id === 17 && item.is_active === true
  );
  const handleCallTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCallType(event.target.value);
    clearFormAccount();
    console.log("Selected Call Type: ", event.target.value);
  };

  const handleTransfercall = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTransferCall(event.target.value);
    console.log("Selected Transfer Call: ", event.target.value);
    setTransferDestination("");
    setTransferAttuid("");
  };
  const handleIssueResolved = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIssueResolved(event.target.value);
    console.log("Selected Issue Resolved: ", event.target.value);
  };
  const handleIsCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomer(event.target.value);
    console.log("Selected Is Customer: ", event.target.value);
  };
  const handleCredit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCredit(event.target.value);
    console.log("Selected Credit: ", event.target.value);
    setCreditAmount("");
    setCreditAttuid("");
  };
  const handlepplan2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPplan2(event.target.value);
    console.log("Selected Credit: ", event.target.value);
  };

  const handleSameday = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentSameday(event.target.value);
    console.log("Selected SameDay: ", event.target.value);
    if (event.target.value === "No") {
      setsameDayDropdown("");
    }
  };
  const handlecallDrivers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcallDriver(event.target.value);
    if (event.target.value === "No") {
      setcallDriverDropdown("");
    }
    console.log("Selected SameDay: ", event.target.value);
  };

  const handlerepeatprediction = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPrediction(event.target.value);
    console.log("Selected Repeat Prediction: ", event.target.value);
  };

  const handlePplan = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPplan(event.target.value);
    if (event.target.value == "No") {
      setPplan2("");
    }
    console.log("Selected Repeat Prediction: ", event.target.value);
  };

  const handleDispatch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDispatch(event.target.value);
    if (event.target.value == "N/A") {
      setdueDate("");
      setTime("");
      setdispatchEquipment("");
    }
    console.log("Selected Repeat Prediction: ", event.target.value);
  };

  const handleWMT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWMT(event.target.value);
    console.log("Selected WNT: ", event.target.value);
    if (event.target.value === "No") {
      setwmtDropdown("");
    }
  };
  const handleToolIssue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToolIssue(event.target.value);
    console.log("Selected WNT: ", event.target.value);
    if (event.target.value === "No") {
      settoolIssueDropdown("");
    }
  };

  const isFormComplete2 =
    selectedCallType === "Misdirect" &&
    selectedAccountType === "No Account" &&
    caseId !== "" &&
    selectedTransferCall !== "" &&
    (selectedTransferCall === "No"
      ? true
      : transferDestination !== null && transferDestination !== "") && // Allow null or empty string for subArea if account type is "No Account"
    (selectedTransferCall === "No"
      ? true
      : transferAttuid !== null && transferAttuid !== ""); // Allow null or empty string for subArea if account type is "No Account";

  const isFormComplete =
    selectedCallType &&
    selectedAccountType &&
    caseId &&
    (selectedAccountType === "No Account"
      ? true
      : areaCtv !== null && subArea !== "") && // Allow null or empty string for subArea if account type is "No Account"
    (selectedAccountType === "No Account"
      ? true
      : subArea !== null && subArea !== "") && // Allow null or empty string for subArea if account type is "No Account"
    selectedTransferCall &&
    (selectedTransferCall === "No"
      ? true
      : transferDestination !== null && transferDestination !== "") && // Allow null or empty string for subArea if account type is "No Account"
    (selectedTransferCall === "No"
      ? true
      : transferAttuid !== null && transferAttuid !== "") && // Allow null or empty string for subArea if account type is "No Account"
    selectedIssueResolved &&
    selectedIsCustomer &&
    selectedCredit &&
    (selectedCredit === "No"
      ? true
      : creditAmount !== null && creditAmount !== "") && // Allow null or empty string for subArea if account type is "No Account"
    (selectedCredit === "No"
      ? true
      : creditAttuid !== null && creditAttuid !== "") && // Allow null or empty string for subArea if account type is "No Account"
    selectedAppointmentSameday &&
    (selectedAppointmentSameday === "No"
      ? true
      : sameDayDropdown !== null && sameDayDropdown !== "") && // Allow null or empty string for subArea if account type is "No Account"
    selectedCallDriver &&
    (selectedCallDriver === "No"
      ? true
      : callDriverDropdown !== null && callDriverDropdown !== "") && // Allow null or empty string for subArea if account type is "No Account"
    selectedRepeatPrediction &&
    selectedPplan &&
    (selectedPplan === "No"
      ? true
      : selectedPplan2 !== null && selectedPplan2 !== "") && // Allow null or empty string for subArea if account type is "No Account"
    selectedDispatch &&
    (selectedDispatch === "N/A" ? true : dueDate !== null && dueDate !== "") && // Allow null or empty string for subArea if account type is "No Account"
    (selectedDispatch === "N/A"
      ? true
      : selectTime !== null && selectTime !== "") && // Allow null or empty string for subArea if account type is "No Account"
    (selectedDispatch === "N/A"
      ? true
      : dispatchEquipment !== null && dispatchEquipment !== "") && // Allow null or empty string for subArea if account type is "No Account"
    selectedWMT &&
    (selectedWMT === "No"
      ? true
      : wmtDropdown !== null && wmtDropdown !== "") && // Allow null or empty string for subArea if account type is "No Account"
    selectedToolIssue &&
    (selectedToolIssue === "No"
      ? true
      : toolIssueDropdown !== null && toolIssueDropdown !== ""); // Allow null or empty string for subArea if account type is "No Account"
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
    console.log("Selected Account Type: ", selectedAccountType);
    setCaseId("");
    setArea("");
    setsubArea("");
  };

  const clearFormAccount = () => {
    setSelectedAccountType("");
    setCaseId("");
    setArea("");
    setsubArea("");
    setSelectedTransferCall("");
    setTransferDestination("");
    setTransferAttuid("");
    setIssueResolved("");
    setIsCustomer("");
    setSelectedCredit("");
    setCreditAmount("");
    setCreditAttuid("");
    setAppointmentSameday("");
    setsameDayDropdown("");
    setcallDriver("");
    setcallDriverDropdown("");
    setRepeatPrediction("");
    setPplan("");
    setPplan2("");
    setdispatchEquipment("");
    setdueDate("");
    setTime("");
    setDispatch("");
    setwmtDropdown(""); // Adjust name if required for consistency
    setWMT("");
    setToolIssue("");
    settoolIssueDropdown("");
  };
  const clearForm = () => {
    setSelectedCallType("");
    setSelectedAccountType("");
    setCaseId("");
    setArea("");
    setsubArea("");
    setSelectedTransferCall("");
    setTransferDestination("");
    setTransferAttuid("");
    setIssueResolved("");
    setIsCustomer("");
    setSelectedCredit("");
    setCreditAmount("");
    setCreditAttuid("");
    setAppointmentSameday("");
    setsameDayDropdown("");
    setcallDriver("");
    setcallDriverDropdown("");
    setRepeatPrediction("");
    setPplan("");
    setPplan2("");
    setdispatchEquipment("");
    setdueDate("");
    setTime("");
    setDispatch("");
    setwmtDropdown(""); // Adjust name if required for consistency
    setWMT("");
    setToolIssue("");
    settoolIssueDropdown("");
  };

  const [loading, setLoading] = useState(false); // State to control loader visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to open the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  ); // Type of severity

  const handleSave = async () => {
    setLoading(true); // Show loader when save is clicked
    setSnackbarOpen(false); // Close Snackbar before new action
    setSnackbarMessage(""); // Clear previous message

    const tlDetails = await getTLOMdetails(tl_id);
    console.log("TL Details: main page", tlDetails);

    const omDetails = await getTLOMdetails(tlDetails?.supervisor || "");
    console.log("OM Details: main page", omDetails);

    const AgentCts = {
      call_type: selectedCallType || null,
      account_type: selectedAccountType || null,
      case_id: caseId || null,
      area: areaCtv || null,
      sub_area: subArea || null,
      transfer_call: selectedTransferCall || null,
      transfer_destination: transferDestination || null,
      transfer_attuid: transferAttuid || null,
      issue_resolved: selectedIssueResolved || null,
      is_customer_happy: selectedIsCustomer || null,
      provide_credit: selectedCredit || null,
      credit_amount: creditAmount || null,
      credit_attuid: creditAttuid || null,
      appointment_sameday: selectedAppointmentSameday || null,
      appointment_sameday_2: sameDayDropdown || null,
      focus_driver: selectedCallDriver || null,
      focus_driver_2: callDriverDropdown || null,
      repeat_prediction: selectedRepeatPrediction || null,
      pplan_close: selectedPplan || null,
      pplan_close_2: selectedPplan2 || null,
      dispatch_call: selectedDispatch || null,
      due_date: dueDate || null,
      select_time: selectTime || null,
      dispatch_equipment: dispatchEquipment || null,
      wmt: selectedWMT || null,
      wmt_2: wmtDropdown || null,
      tool_issue: selectedToolIssue || null,
      tool_issue_2: toolIssueDropdown || null,
      is_active: true,
      created_by: id || null,
      updated_by: id || null,
      full_name: fullName || null,
      region: Country || null,
      tl_hrid: tl_id || null,
      tl_name: tlDetails?.name || null,
      om_name: omDetails?.name || null,
      om_hrid: omDetails?.id || null,
    };

    console.log("AgentCts", AgentCts);

    try {
      const response = await saveAgentCtsItem(AgentCts);
      console.log("Save successful:", response);
      clearForm();
      setSnackbarMessage("Save successful!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Save failed:", error);
      setSnackbarMessage("Save failed. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false); // Hide loader after process completes
      setSnackbarOpen(true); // Open Snackbar after save attempt
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close Snackbar when the user dismisses it
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
          startIcon={loading ? <CircularProgress size={24} /> : <SaveIcon />}
          onClick={handleSave}
          disabled={
            (!isFormComplete &&
              selectedCallType !== "Ghost Call" &&
              !isFormComplete2) ||
            loading // Disable button when loading
          }
        >
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<ClearIcon />}
          onClick={clearForm}
        >
          Clear
        </Button>

        {/* Snackbar for displaying success or error message */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          sx={{ mt: 8, width: "800px" }}
          anchorOrigin={{
            vertical: "top", // Position at the top
            horizontal: "right", // Position at the right
          }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
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
                margin: "1px 0",
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
                margin: "1px 0",
              }}
            />

            {/* Case ID Input Field */}
            <Box
              padding={1} // Horizontal padding (left and right)
              display="flex"
              gap={3}
              alignItems="flex-start"
              flexWrap="wrap"
            >
              <FormControl
                component="fieldset"
                sx={{ flex: 1, marginBottom: 2 }}
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
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  inputProps={{ maxLength: 16 }}
                />
                <FormHelperText>Max length is 16 characters</FormHelperText>
              </FormControl>

              <FormControl
                component="fieldset"
                sx={{ flex: 1, marginBottom: 2 }}
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
                  value={areaCtv}
                  onChange={handleAreaChange}
                  displayEmpty
                  disabled={
                    selectedAccountType === "No Account" ||
                    selectedAccountType === ""
                  }
                  sx={{
                    cursor:
                      selectedAccountType === "No Account" ||
                      selectedAccountType === ""
                        ? "not-allowed"
                        : "pointer",
                    "& .Mui-disabled": { cursor: "not-allowed" },
                  }}
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

              <FormControl
                component="fieldset"
                sx={{ flex: 1, marginBottom: 2 }}
              >
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
                  value={subArea}
                  onChange={(e) => setsubArea(e.target.value)}
                  displayEmpty
                  disabled={
                    selectedAccountType === "No Account" ||
                    selectedAccountType === "" ||
                    areaCtv == ""
                  }
                  sx={{
                    cursor:
                      selectedAccountType === "No Account" ||
                      selectedAccountType === "" ||
                      areaCtv === ""
                        ? "not-allowed"
                        : "pointer",
                    "& .Mui-disabled": { cursor: "not-allowed" },
                  }}
                >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {subAreaOptions.map((option) => (
                    <MenuItem key={option.id} value={option.item_name}>
                      {option.item_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <hr
              style={{
                border: "1px dotted black",
                margin: "1px 0",
              }}
            />

            <Box
              padding={1} // Horizontal padding (left and right)
              display="flex"
              gap={3}
              alignItems="flex-start"
              flexWrap="wrap"
            >
              <FormControl
                component="fieldset"
                sx={{ flex: 1, marginBottom: 2 }}
              >
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
                      sx={{ marginRight: 3 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormControl
                component="fieldset"
                sx={{ flex: 1, marginBottom: 2 }}
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
                  value={transferDestination}
                  onChange={(event) =>
                    setTransferDestination(event.target.value)
                  }
                  displayEmpty
                  disabled={
                    selectedTransferCall === "No" || selectedTransferCall === ""
                  }
                  sx={{
                    cursor:
                      selectedTransferCall === "No" ||
                      selectedTransferCall === ""
                        ? "not-allowed"
                        : "pointer",
                    "& .Mui-disabled": { cursor: "not-allowed" },
                  }}
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
                sx={{ flex: 1, marginBottom: 2 }}
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
                  value={transferAttuid}
                  onChange={(e) => setTransferAttuid(e.target.value)}
                  inputProps={{ maxLength: 6 }}
                  disabled={
                    selectedTransferCall === "No" || selectedTransferCall === ""
                  }
                  sx={{
                    cursor:
                      selectedTransferCall === "No" ||
                      selectedTransferCall === ""
                        ? "not-allowed"
                        : "pointer",
                    "& .Mui-disabled": { cursor: "not-allowed" },
                  }}
                />
              </FormControl>
            </Box>

            {!(
              selectedCallType === "Misdirect" &&
              selectedAccountType === "No Account"
            ) && (
              <>
                <hr
                  style={{
                    border: "1px dotted black",
                    margin: "1px 0",
                  }}
                />
                <Box
                  padding={1} // Horizontal padding (left and right)
                  display="flex"
                  gap={3}
                  alignItems="flex-start"
                  flexWrap="wrap"
                >
                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Issue Resolved
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedIssueResolved}
                      onChange={handleIssueResolved}
                    >
                      {issueResolvedOptions.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Is the customer happy with the resolution?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedIsCustomer}
                      onChange={handleIsCustomer}
                    >
                      {isCustomerOptions.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
                <hr
                  style={{
                    border: "1px dotted black",
                    margin: "1px 0",
                  }}
                />

                <Box
                  padding={1} // Horizontal padding (left and right)
                  display="flex"
                  gap={3}
                  alignItems="flex-start"
                  flexWrap="wrap"
                >
                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Did you provide credit?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedCredit}
                      onChange={handleCredit}
                    >
                      {creditOptions.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Credit Amount
                    </FormLabel>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={creditAmount}
                      onChange={(e) => setCreditAmount(e.target.value)}
                      inputProps={{ maxLength: 6 }}
                      disabled={
                        selectedCredit === "No" || selectedCredit === ""
                      }
                      sx={{
                        cursor:
                          selectedCredit === "No" || selectedCredit === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    />
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Credit Approver's ATTUID
                    </FormLabel>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={creditAttuid}
                      onChange={(e) => setCreditAttuid(e.target.value)}
                      inputProps={{ maxLength: 6 }}
                      disabled={
                        selectedCredit === "No" || selectedCredit === ""
                      }
                      sx={{
                        cursor:
                          selectedCredit === "No" || selectedCredit === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    />
                  </FormControl>
                </Box>
                <hr
                  style={{
                    border: "1px dotted black",
                    margin: "1px 0",
                  }}
                />
                <Box
                  padding={1} // Horizontal padding (left and right)
                  display="flex"
                  gap={3}
                  alignItems="flex-start"
                  flexWrap="wrap"
                >
                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Appointment Inquiry "Same Day"
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedAppointmentSameday}
                      onChange={handleSameday}
                    >
                      {samedayOptions.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>

                    {/* Dropdown added here */}
                    <Select
                      variant="outlined"
                      fullWidth
                      value={sameDayDropdown}
                      onChange={(event) =>
                        setsameDayDropdown(event.target.value)
                      }
                      displayEmpty
                      disabled={
                        selectedAppointmentSameday === "No" ||
                        selectedAppointmentSameday === ""
                      }
                      sx={{
                        cursor:
                          selectedAppointmentSameday === "No" ||
                          selectedAppointmentSameday === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select an option</em>
                      </MenuItem>
                      {samedaydropdownOptions.map((option) => (
                        <MenuItem key={option.id} value={option.item_name}>
                          {option.item_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 1,
                        "& .MuiFormLabel-asterisk": {
                          display: "none", // Hide the default asterisk
                        },
                        "&::before": {
                          content: '"* "', // Adds the asterisk before the label text
                          color: "red", // Sets the asterisk color to red
                        },
                      }}
                    >
                      Focus Call Drivers
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedCallDriver}
                      onChange={handlecallDrivers}
                    >
                      {driverOption.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>

                    {/* Dropdown added here */}
                    <Select
                      variant="outlined"
                      fullWidth
                      value={callDriverDropdown}
                      onChange={(event) =>
                        setcallDriverDropdown(event.target.value)
                      }
                      displayEmpty
                      disabled={
                        selectedCallDriver === "No" || selectedCallDriver === ""
                      }
                      sx={{
                        cursor:
                          selectedCallDriver === "No" ||
                          selectedCallDriver === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select an option</em>
                      </MenuItem>
                      {callDriverdropdownOptions.map((option) => (
                        <MenuItem key={option.id} value={option.item_name}>
                          {option.item_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Repeat Prediction
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedRepeatPrediction}
                      onChange={handlerepeatprediction}
                    >
                      {repeatPredictionOption.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>

                <hr
                  style={{
                    border: "1px dotted black",
                    margin: "1px 0",
                  }}
                />

                <Box
                  padding={1} // Horizontal padding (left and right)
                  display="flex"
                  gap={3}
                  alignItems="flex-start"
                  flexWrap="wrap"
                >
                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      PPLAN CLOSED
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedPplan}
                      onChange={handlePplan}
                    >
                      {pplanOption.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>

                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedPplan2}
                      onChange={handlepplan2}
                      sx={{
                        // marginRight: 3,
                        cursor:
                          selectedPplan === "No" || selectedPplan === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    >
                      {pplanOption2.map((option) => (
                        <FormControlLabel
                          disabled={
                            selectedPplan === "No" || selectedPplan == ""
                          }
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
                <hr
                  style={{
                    border: "1px dotted black",
                    margin: "1px 0",
                  }}
                />
                <Box
                  padding={1} // Horizontal padding (left and right)
                  display="flex"
                  gap={3}
                  alignItems="flex-start"
                  flexWrap="wrap"
                >
                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Dispatch Call/Equipment Replacement
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedDispatch}
                      onChange={handleDispatch}
                    >
                      {dipatchOption.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Due Date
                    </FormLabel>
                    <TextField
                      type="date" // Change to date selector
                      variant="outlined"
                      fullWidth
                      value={dueDate}
                      onChange={(e) => setdueDate(e.target.value)} // Adjust handler to store date
                      disabled={
                        selectedDispatch === "N/A" || selectedDispatch === ""
                      }
                      sx={{
                        cursor:
                          selectedDispatch === "N/A" || selectedDispatch === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                      InputLabelProps={{
                        shrink: true, // Ensures label is visible even when no date is selected
                      }}
                    />
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Select Time
                    </FormLabel>
                    <Select
                      variant="outlined"
                      fullWidth
                      value={selectTime}
                      onChange={(event) => setTime(event.target.value)}
                      displayEmpty
                      disabled={
                        selectedDispatch === "N/A" || selectedDispatch === ""
                      }
                      sx={{
                        cursor:
                          selectedDispatch === "N/A" || selectedDispatch === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Time</em>
                      </MenuItem>
                      {timeOption.map((option) => (
                        <MenuItem key={option.id} value={option.item_name}>
                          {option.item_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  padding={1} // Horizontal padding (left and right)
                  display="flex"
                  gap={3}
                  alignItems="flex-start"
                  flexWrap="wrap"
                  width={390}
                >
                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      Dispatch/Equipment Replacement Approver's ATTUID
                    </FormLabel>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={dispatchEquipment}
                      inputProps={{ maxLength: 6 }}
                      onChange={(e) => setdispatchEquipment(e.target.value)}
                      disabled={
                        selectedDispatch === "N/A" || selectedDispatch === ""
                      }
                      sx={{
                        cursor:
                          selectedDispatch === "N/A" || selectedDispatch === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    />
                  </FormControl>
                </Box>

                <hr
                  style={{
                    border: "1px dotted black",
                    margin: "1px 0",
                  }}
                />

                <Box
                  padding={1} // Horizontal padding (left and right)
                  display="flex"
                  gap={3}
                  alignItems="flex-start"
                  flexWrap="wrap"
                >
                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                      WMT Process Opportunities
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedWMT}
                      onChange={handleWMT}
                    >
                      {wmtOptions.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>

                    {/* Dropdown added here */}
                    <Select
                      variant="outlined"
                      fullWidth
                      value={wmtDropdown}
                      onChange={(event) => setwmtDropdown(event.target.value)}
                      displayEmpty
                      disabled={selectedWMT === "No" || selectedWMT === ""}
                      sx={{
                        cursor:
                          selectedWMT === "No" || selectedWMT === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select an option</em>
                      </MenuItem>
                      {wmtDropdownOptions.map((option) => (
                        <MenuItem key={option.id} value={option.item_name}>
                          {option.item_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    component="fieldset"
                    sx={{ flex: 1, marginBottom: 2 }}
                  >
                    <FormLabel
                      component="legend"
                      required
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 1,
                        "& .MuiFormLabel-asterisk": {
                          display: "none", // Hide the default asterisk
                        },
                        "&::before": {
                          content: '"* "', // Adds the asterisk before the label text
                          color: "red", // Sets the asterisk color to red
                        },
                      }}
                    >
                      Tool Issue (Genesys)
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="call-type"
                      name="call-type"
                      value={selectedToolIssue}
                      onChange={handleToolIssue}
                    >
                      {ToolissueOptions.map((option) => (
                        <FormControlLabel
                          key={option.id}
                          value={option.item_name}
                          control={<Radio />}
                          label={option.item_name}
                          sx={{ marginRight: 3 }}
                        />
                      ))}
                    </RadioGroup>

                    {/* Dropdown added here */}
                    <Select
                      variant="outlined"
                      fullWidth
                      value={toolIssueDropdown}
                      onChange={(event) =>
                        settoolIssueDropdown(event.target.value)
                      }
                      displayEmpty
                      disabled={
                        selectedToolIssue === "No" || selectedToolIssue === ""
                      }
                      sx={{
                        cursor:
                          selectedToolIssue === "No" || selectedToolIssue === ""
                            ? "not-allowed"
                            : "pointer",
                        "& .Mui-disabled": { cursor: "not-allowed" },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select an option</em>
                      </MenuItem>
                      {ToolIssueDropdownOptions.map((option) => (
                        <MenuItem key={option.id} value={option.item_name}>
                          {option.item_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <div>
                  <ScrollToTopButton /> {/* Render the scroll to top button */}
                  {/* Other content of the page */}
                </div>
              </>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default AgentForm;
