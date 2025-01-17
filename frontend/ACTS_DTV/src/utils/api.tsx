/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import * as XLSX from "xlsx";

export const fetchAndDownloadReport = async (
  startDate: Date | null,
  endDate: Date | null
) => {
  try {
    const formattedStartDate = startDate ? startDate.toISOString() : "";
    const formattedEndDate = endDate ? endDate.toISOString() : "";
    console.log(formattedEndDate, formattedStartDate)
    const response = await axios.get("http://127.0.0.1:8000/agentcts/", {
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      },
    });

    const data = response.data;

    // Filter data by the date range if both start and end dates are provided
    const filteredData = data.filter((item: any) => {
      const itemDate = new Date(item.date_created);
      const startDateObj = startDate ? new Date(formattedStartDate) : null;
      const endDateObj = endDate ? new Date(formattedEndDate) : null;

      // Check if the date falls within the range
      if (startDateObj && endDateObj) {
        return itemDate >= startDateObj && itemDate <= endDateObj;
      }
      if (startDateObj) {
        return itemDate >= startDateObj;
      }
      if (endDateObj) {
        return itemDate <= endDateObj;
      }
      return true; // If no date is provided, return all data
    });

    // Define custom headers for the Excel report
    const headers = [
      "Call ID",
      "Date Logged",
      "HRID",
      "Project ID",
      "Agent Name",
      "Team Leader",
      "Operations Manager",
      "Call Type",
      "Account Type",
      "Case ID/Service Request",
      "Area/CTV Level 3",
      "Sub-Area/CTV Level 4",
      "Transfer Call",
      "Transfer Destination",
      "Transfer approver ATTUID",
      "Issue Resolved",
      "Is the customer happy with the resolution?",
      "Did you Provide Credit?",
      "Agent Credit Amount",
      "Credit Approvers ATTUID",
      'Appointment inquiry "same day"',
      'Appointment inquiry "same day" - Selection',
      "Focus Call Drivers",
      "Focus Call Drivers - Selection",
      "Repeat Prediction",
      "PPLAN Closed",
      "PPLAN",
      "Dispatch Call/Equipment Replacement",
      "Agent Due Date",
      "Agent Time",
      "Dispatch/Equipment Replacement Approver's ATTUID",
      "WMT Process Opportunities",
      "Tool Issue (Genesys)",
      "Support HRID",
      "Reason for Account Review",
      "If CallBack",
      'Support - Appointment inquiry "same day"',
      "Support - Focus Call Drivers",
      "Dispatch Call/Equipment Replacement",
      "Validated?",
      "Due Date",
      "Time",
      "Sup Intervention Notes",
    ];

    // Map data to match the order of the headers
    const mappedData = filteredData.map((item: any) => ({
      "Call ID": item.id,
      "Date Logged": new Date(item.date_created).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
      HRID: item.created_by,
      "Project ID": item.projectId,
      "Agent Name": item.full_name,
      "Team Leader": item.tl_name,
      "Operations Manager": item.om_name,
      "Call Type": item.call_type,
      "Account Type": item.account_type,
      "Case ID/Service Request": item.case_id,
      "Area/CTV Level 3": item.area,
      "Sub-Area/CTV Level 4": item.sub_area,
      "Transfer Call": item.transfer_call,
      "Transfer Destination": item.transfer_destination,
      "Transfer approver ATTUID": item.transfer_attuid,
      "Issue Resolved": item.issue_resolved,
      "Is the customer happy with the resolution?": item.is_customer_happy,
      "Did you Provide Credit?": item.provide_credit,
      "Agent Credit Amount": item.credit_amount,
      "Credit Approvers ATTUID": item.credit_attuid,
      'Appointment inquiry "same day"': item.appointment_sameday,
      'Appointment inquiry "same day" - Selection': item.appointment_sameday_2,
      "Focus Call Drivers": item.focus_driver,
      "Focus Call Drivers - Selection": item.focus_driver_2,
      "Repeat Prediction": item.repeat_prediction,
      "PPLAN Closed": item.pplan_close,
      PPLAN: item.pplan_close_2,
      "Dispatch Call/Equipment Replacement": item.dispatch_call,
      "Agent Due Date": item.due_date,
      "Agent Time": item.select_time,
      "Dispatch/Equipment Replacement Approver's ATTUID":
        item.dispatch_equipment,
      "WMT Process Opportunities": item.wmt,
      "Tool Issue (Genesys)": item.tool_issue,
      "Support HRID": item.support_created_by,
      "Reason for Account Review": item.support_reason_for_account_review,
      "If CallBack": item.support_callback_type,
      'Support - Appointment inquiry "same day"': item.appointment_sameday,
      "Support - Focus Call Drivers": item.focus_driver,
      "Dispatch Call/Equipment Replacement 2": item.dispatch_equipment,
      "Validated?": item.support_validated,
      "Due Date": item.support_due_date,
      Time: item.support_time,
      "Sup Intervention Notes": item.support_notes,
    }));

    // Convert the mapped data to a worksheet
    const ws = XLSX.utils.json_to_sheet(mappedData, { header: headers });

    // Define column widths
    const colWidths = headers.map((header) => {
      let maxLength = 0;
      mappedData.forEach((row: any) => {
        const cellValue = row[header];
        if (cellValue) {
          maxLength = Math.max(maxLength, cellValue.toString().length);
        }
      });
      return { wch: maxLength + 2 }; // Adding 2 for some extra space
    });

    // Adjust the width of the "Call ID" column (e.g., set it to 20 characters)
    const callIDColumnIndex = headers.indexOf("Call ID");
    if (callIDColumnIndex !== -1) {
      colWidths[callIDColumnIndex] = { wch: 10 }; // Adjust to 20 characters
    }

    const ProjectIDColumnIndex = headers.indexOf("Project ID");
    if (ProjectIDColumnIndex !== -1) {
      colWidths[ProjectIDColumnIndex] = { wch: 10 }; // Adjust to 20 characters
    }
    const OMColumnIndex = headers.indexOf("Operations Manager");
    if (OMColumnIndex !== -1) {
      colWidths[OMColumnIndex] = { wch: 20 }; // Adjust to 20 characters
    }

    const TransferCallColumnIndex = headers.indexOf("Transfer Call");
    if (TransferCallColumnIndex !== -1) {
      colWidths[TransferCallColumnIndex] = { wch: 15 }; // Adjust to 20 characters
    }
    const TransferapproverATTUIDColumnIndex = headers.indexOf(
      "Transfer approver ATTUID"
    );
    if (TransferapproverATTUIDColumnIndex !== -1) {
      colWidths[TransferapproverATTUIDColumnIndex] = { wch: 25 }; // Adjust to 20 characters
    }
    const IssueResolvedATTUIDColumnIndex = headers.indexOf("Issue Resolved");
    if (IssueResolvedATTUIDColumnIndex !== -1) {
      colWidths[IssueResolvedATTUIDColumnIndex] = { wch: 15 }; // Adjust to 20 characters
    }
    const isHappyColumnIndex = headers.indexOf(
      "Is the customer happy with the resolution?"
    );
    if (isHappyColumnIndex !== -1) {
      colWidths[isHappyColumnIndex] = { wch: 35 }; // Adjust to 20 characters
    }
    const creditColumnIndex = headers.indexOf("Credit Approvers ATTUID");
    if (creditColumnIndex !== -1) {
      colWidths[creditColumnIndex] = { wch: 25 }; // Adjust to 20 characters
    }
    const acctypeColumnIndex = headers.indexOf("Account Type");
    if (acctypeColumnIndex !== -1) {
      colWidths[acctypeColumnIndex] = { wch: 15 }; // Adjust to 20 characters
    }
    const provideCreditColumnIndex = headers.indexOf("Did you Provide Credit?");
    if (provideCreditColumnIndex !== -1) {
      colWidths[provideCreditColumnIndex] = { wch: 25 }; // Adjust to 20 characters
    }
    const approverCreditColumnIndex = headers.indexOf(
      "Credit Approvers ATTUID"
    );
    if (approverCreditColumnIndex !== -1) {
      colWidths[approverCreditColumnIndex] = { wch: 25 }; // Adjust to 20 characters
    }
    const samedayColumnIndex = headers.indexOf(
      'Appointment inquiry "same day"'
    );
    if (samedayColumnIndex !== -1) {
      colWidths[samedayColumnIndex] = { wch: 30 }; // Adjust to 20 characters
    }
    const DispatchReplacementColumnIndex = headers.indexOf(
      "Dispatch Call/Equipment Replacement"
    );
    if (DispatchReplacementColumnIndex !== -1) {
      colWidths[DispatchReplacementColumnIndex] = { wch: 30 }; // Adjust to 30 characters
    }
    const AgentDueDateColumnIndex = headers.indexOf("Agent Due Date");
    if (AgentDueDateColumnIndex !== -1) {
      colWidths[AgentDueDateColumnIndex] = { wch: 20 }; // Adjust to 20 characters
    }
    const AgentTimeColumnIndex = headers.indexOf("Agent Time");
    if (AgentTimeColumnIndex !== -1) {
      colWidths[AgentTimeColumnIndex] = { wch: 15 }; // Adjust to 15 characters
    }
    const DispatchApproverATTUIDColumnIndex = headers.indexOf(
      "Dispatch/Equipment Replacement Approver's ATTUID"
    );
    if (DispatchApproverATTUIDColumnIndex !== -1) {
      colWidths[DispatchApproverATTUIDColumnIndex] = { wch: 40 }; // Adjust to 40 characters
    }
    const WMTProcessOpportunitiesColumnIndex = headers.indexOf(
      "WMT Process Opportunities"
    );
    if (WMTProcessOpportunitiesColumnIndex !== -1) {
      colWidths[WMTProcessOpportunitiesColumnIndex] = { wch: 30 }; // Adjust to 30 characters
    }
    const ToolIssueGenesysColumnIndex = headers.indexOf("Tool Issue (Genesys)");
    if (ToolIssueGenesysColumnIndex !== -1) {
      colWidths[ToolIssueGenesysColumnIndex] = { wch: 25 }; // Adjust to 25 characters
    }
    const SupportHRIDColumnIndex = headers.indexOf("Support HRID");
    if (SupportHRIDColumnIndex !== -1) {
      colWidths[SupportHRIDColumnIndex] = { wch: 20 }; // Adjust to 20 characters
    }
    const ReasonForAccountReviewColumnIndex = headers.indexOf(
      "Reason for Account Review"
    );
    if (ReasonForAccountReviewColumnIndex !== -1) {
      colWidths[ReasonForAccountReviewColumnIndex] = { wch: 35 }; // Adjust to 35 characters
    }
    const IfCallBackColumnIndex = headers.indexOf("If CallBack");
    if (IfCallBackColumnIndex !== -1) {
      colWidths[IfCallBackColumnIndex] = { wch: 15 }; // Adjust to 15 characters
    }
    const SupportAppointmentSameDayColumnIndex = headers.indexOf(
      'Support - Appointment inquiry "same day"'
    );
    if (SupportAppointmentSameDayColumnIndex !== -1) {
      colWidths[SupportAppointmentSameDayColumnIndex] = { wch: 45 }; // Adjust to 45 characters
    }
    const SupportFocusCallDriversColumnIndex = headers.indexOf(
      "Support - Focus Call Drivers"
    );
    if (SupportFocusCallDriversColumnIndex !== -1) {
      colWidths[SupportFocusCallDriversColumnIndex] = { wch: 35 }; // Adjust to 35 characters
    }
    const DispatchCallReplacement2ColumnIndex = headers.indexOf(
      "Dispatch Call/Equipment Replacement 2"
    );
    if (DispatchCallReplacement2ColumnIndex !== -1) {
      colWidths[DispatchCallReplacement2ColumnIndex] = { wch: 45 }; // Adjust to 45 characters
    }
    const ValidatedColumnIndex = headers.indexOf("Validated?");
    if (ValidatedColumnIndex !== -1) {
      colWidths[ValidatedColumnIndex] = { wch: 15 }; // Adjust to 15 characters
    }
    const DueDateColumnIndex = headers.indexOf("Due Date");
    if (DueDateColumnIndex !== -1) {
      colWidths[DueDateColumnIndex] = { wch: 20 }; // Adjust to 20 characters
    }
    const TimeColumnIndex = headers.indexOf("Time");
    if (TimeColumnIndex !== -1) {
      colWidths[TimeColumnIndex] = { wch: 15 }; // Adjust to 15 characters
    }
    const SupInterventionNotesColumnIndex = headers.indexOf(
      "Sup Intervention Notes"
    );
    if (SupInterventionNotesColumnIndex !== -1) {
      colWidths[SupInterventionNotesColumnIndex] = { wch: 50 }; // Adjust to 50 characters
    }

    // Apply column widths to the worksheet
    ws["!cols"] = colWidths;

    // Apply styles for "Call ID" cells (make them blue)
    Object.keys(ws).forEach((cell) => {
      if (cell.startsWith("A") && cell !== "A1") {
        ws[cell].s = {
          fill: {
            fgColor: { rgb: "ADD8E6" }, // Light blue color
          },
        };
      }
    });

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    // Generate the Excel file and trigger download
    XLSX.writeFile(wb, "Report.xlsx");
  } catch (error) {
    console.error("Error fetching data or generating report:", error);
  }
};

const authTokenString = sessionStorage.getItem("authToken");
const authToken = authTokenString ? JSON.parse(authTokenString) : null;
const hridsession = authToken?.id;

export const saveAgentCtsItem = async (agentCtsItem: {
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
}) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/agentcts/",
      agentCtsItem
    );
    return response.data;
  } catch (error) {
    console.error("Error saving Agent CTS item:", error);
    throw error;
  }
};
interface AgentSupportItem {
  agent_id?: number;
  support_reason_for_account_review?: string | null;
  support_callback_type?: string | null;
  support_resolved?: string | null;
  support_transfer?: string | null;
  support_validated?: string | null;
  support_dispatch_call_equipment?: string | null;
  support_due_date?: string | null;
  support_time?: string | null;
  support_notes?: string | null;
  support_created_by?: string | null;
  support_updated_by?: string | null;
  id?: any;
}

export const saveSupport = async (agentSupportItem: AgentSupportItem) => {
  try {
    // Log the data being sent for debugging
    console.log("api DATA", agentSupportItem);

    // Ensure the agent_id is present (required for updating the correct record)
    if (!agentSupportItem.agent_id) {
      throw new Error("Agent ID is required to update the support record.");
    }

    // Make a PATCH request to update the AgentCts object
    const response = await axios.patch(
      `http://127.0.0.1:8000/agentcts/update-agent-cts/${agentSupportItem.agent_id}/`,  // Use the agent ID to target the specific agent
      {
        support_reason_for_account_review: agentSupportItem.support_reason_for_account_review || null,
        support_callback_type: agentSupportItem.support_callback_type || null,
        support_resolved: agentSupportItem.support_resolved || null,
        support_transfer: agentSupportItem.support_transfer || null,
        support_validated: agentSupportItem.support_validated || null,
        support_dispatch_call_equipment: agentSupportItem.support_dispatch_call_equipment || null,
        support_due_date: agentSupportItem.support_due_date || null,
        support_time: agentSupportItem.support_time || null,
        support_notes: agentSupportItem.support_notes || null,
        support_created_by: hridsession || null,
        support_updated_by: hridsession || null,
      }
    );

    // Return the response data if the update is successful
    return response.data;

  } catch (error) {
    console.error("Error saving Agent Support item:", error);
    throw error;
  }
};


export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/category/");
    return response.data; // Assuming the response contains the categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getSelectedAgent = async (id: any) => {
  try {
    // Fetch the agent details by passing the agent's ID into the URL
    const response = await axios.get(`http://127.0.0.1:8000/agentcts/id/${id}/`);
    console.log('from api', response.data)
    return response.data; // Assuming the response contains the agent's details
  } catch (error) {
    console.error("Error fetching agent:", error);
    throw error;
  }
};


export const fetchLookup = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/dropdownlookup/");
    return response.data; // Assuming the response contains the categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchagentcts = async (
  startDate: Date | null,
  endDate: Date | null
) => {
  try {
    console.log("Api : ", startDate , endDate)
    const formattedStartDate = startDate ? startDate.toISOString() : "";
    const formattedEndDate = endDate ? endDate.toISOString() : "";
    const response = await axios.get("http://127.0.0.1:8000/agentcts/dashboard/", {
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      },
    });
    return response.data; // Assuming the response contains the categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchOMview = async (
  startDate: Date | null,
  endDate: Date | null
) => {
  try {
    console.log("Api : ", startDate , endDate)
    const formattedStartDate = startDate ? startDate.toISOString() : "";
    const formattedEndDate = endDate ? endDate.toISOString() : "";
    const response = await axios.get("http://127.0.0.1:8000/agentcts/om-view-dashboard/", {
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      },
    });
    return response.data; // Assuming the response contains the categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchCDview = async (
  startDate: Date | null,
  endDate: Date | null
) => {
  try {
    console.log("Api : ", startDate , endDate)
    const formattedStartDate = startDate ? startDate.toISOString() : "";
    const formattedEndDate = endDate ? endDate.toISOString() : "";
    const response = await axios.get("http://127.0.0.1:8000/agentcts/cd-view-dashboard/", {
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      },
    });
    return response.data; // Assuming the response contains the categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const fetchUserAdmindata = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/user_admin/");
    return response.data; // Assuming the response contains the categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const saveLookupItem = async (lookupItem: {
  id?: number; // Optional id for updating
  category_id: number;
  item_name: string;
  description: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}) => {
  try {
    // Log the lookup item for debugging
    console.log("ID: ", lookupItem.id);

    // If id exists, it's an update request
    if (lookupItem.id) {
      const response = await axios.put(
        `http://127.0.0.1:8000/dropdownlookup/${lookupItem.id}/`,
        lookupItem
      );
      return response.data; // Return the updated item
    } else {
      // Otherwise, it's an add request
      const response = await axios.post(
        "http://127.0.0.1:8000/dropdownlookup/",
        lookupItem
      );
      return response.data; // Return the newly created item
    }
  } catch (error) {
    console.error("Error saving lookup item:", error);
    throw error; // Rethrow the error for handling by the calling function
  }
};

export const saveUserManagement = async (userinfo: {
  id?: number; // Optional id for updating
  hrid: string;
}) => {
  try {
    // Split hrid by backslashes and log the result
    const hridParts = userinfo.hrid.split("\\");
    console.log("HRID Parts:", hridParts);

    const checkexist = await axios.get(
      `http://127.0.0.1:8000/user_admin/?SamAccount=${hridParts[1]}`
    );
    const exists = checkexist.data && checkexist.data.length > 0; // Adjust based on your actual response structure
    console.log(exists);
    if (exists) {
      throw new Error(`already exist`);
    }
    // Fetch user details from external API using split parts
    const userapi = await axios.get(
      `https://vxicareers.com/srv2-api/api/v1/login/GetEmpDetailsOnGlobalAPI?nt=${hridParts[1]}&domain=${hridParts[0]}`
    );
    console.log(userapi);

    // Prepare the user object from the API response
    const userfromapi = {
      HRID: userapi.data.UserInfo.ID,
      FirstName: userapi.data.UserInfo.FirstName,
      LastName: userapi.data.UserInfo.LastName,
      MiddleName: userapi.data.UserInfo.MiddleName,
      Role: "1",
      BuildingAssignment: userapi.data.UserInfo.LocationDesc,
      SamAccount: userapi.data.UserInfo.WindowsID,
      Email: userapi.data.UserInfo.Email,
      Team: userapi.data.UserInfo.Team,
      LineofBusiness: userapi.data.UserInfo.Project,
      IsActive: true,
      Created_by: hridsession,
      Updated_by: hridsession,
    };

    // Determine the URL and HTTP method based on the presence of `id`
    const url = userinfo.id
      ? `http://127.0.0.1:8000/user_admin/${userinfo.id}/`
      : "http://127.0.0.1:8000/user_admin/";
    const method = userinfo.id ? "PUT" : "POST";

    // Send the request with `userfromapi` as the body
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userfromapi), // Send userfromapi instead of userinfo
    });

    // Handle response
    if (!response.ok) {
      throw new Error(`Failed to save lookup item: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Lookup item saved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error saving lookup item:", error);
    throw error;
  }
};
