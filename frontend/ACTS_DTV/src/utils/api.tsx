/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import * as XLSX from 'xlsx';

export const fetchAndDownloadReport = async (startDate: Date | null, endDate: Date | null) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/agentcts/', {
      params: {
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
      },
    });

    const data = response.data;

    // Define custom headers for the Excel report
    const headers = [
      'Call ID', 'Date Logged', 'HRID', 'Project ID', 'Agent Name', 'Team Leader', 'Operations Manager', 
      'Call Type', 'Account Type', 'Case ID/Service Request', 'Area/CTV Level 3', 'Sub-Area/CTV Level 4', 
      'Transfer Call', 'Transfer Destination', 'Transfer approver ATTUID', 'Issue Resolved', 
      'Is the customer happy with the resolution?', 'Did you Provide Credit?', 'Agent Credit Amount', 
      'Credit Approvers ATTUID', 'Appointment inquiry "same day"', 'Appointment inquiry "same day" - Selection', 
      'Focus Call Drivers', 'Focus Call Drivers - Selection', 'Repeat Prediction', 'PPLAN Closed', 
      'PPLAN', 'Dispatch Call/Equipment Replacement', 'Agent Due Date', 'Agent Time', 
      'Dispatch/Equipment Replacement Approver\'s ATTUID', 'WMT Process Opportunities', 
      'Tool Issue (Genesys)', 'Support HRID', 'Reason for Account Review', 'If CallBack', 
      'Support - Appointment inquiry "same day"', 'Support - Focus Call Drivers', 
      'Dispatch Call/Equipment Replacement', 'Validated?', 'Due Date', 'Time', 'Sup Intervention Notes'
    ];

    // Map data to match the order of the headers
    const mappedData = data.map((item: any) => ({
      'Call ID': item.case_id,
      'Date Logged': item.date_created,
      'HRID': item.created_by,
      'Project ID': item.project_id,
      'Agent Name': item.agent_name,
      'Team Leader': item.team_leader,
      'Operations Manager': item.operations_manager,
      'Call Type': item.call_type,
      'Account Type': item.account_type,
      'Case ID/Service Request': item.case_id,
      'Area/CTV Level 3': item.area_3,
      'Sub-Area/CTV Level 4': item.sub_area_4,
      'Transfer Call': item.transfer_call,
      'Transfer Destination': item.transfer_destination,
      'Transfer approver ATTUID': item.transfer_approver_attuid,
      'Issue Resolved': item.issue_resolved,
      'Is the customer happy with the resolution?': item.customer_happy,
      'Did you Provide Credit?': item.provide_credit,
      'Agent Credit Amount': item.agent_credit_amount,
      'Credit Approvers ATTUID': item.credit_approvers_attuid,
      'Appointment inquiry "same day"': item.appointment_inquiry_same_day,
      'Appointment inquiry "same day" - Selection': item.appointment_inquiry_same_day_selection,
      'Focus Call Drivers': item.focus_call_drivers,
      'Focus Call Drivers - Selection': item.focus_call_drivers_selection,
      'Repeat Prediction': item.repeat_prediction,
      'PPLAN Closed': item.pplan_closed,
      'PPLAN': item.pplan,
      'Dispatch Call/Equipment Replacement': item.dispatch_equipment_replacement,
      'Agent Due Date': item.agent_due_date,
      'Agent Time': item.agent_time,
      'Dispatch/Equipment Replacement Approver\'s ATTUID': item.dispatch_equipment_replacement_approver_attuid,
      'WMT Process Opportunities': item.wmt_process_opportunities,
      'Tool Issue (Genesys)': item.tool_issue_genesys,
      'Support HRID': item.support_hrid,
      'Reason for Account Review': item.reason_for_account_review,
      'If CallBack': item.if_callback,
      'Support - Appointment inquiry "same day"': item.support_appointment_inquiry_same_day,
      'Support - Focus Call Drivers': item.support_focus_call_drivers,
      'Dispatch Call/Equipment Replacement 2': item.dispatch_call_equipment_replacement,
      'Validated?': item.validated,
      'Due Date': item.due_date,
      'Time': item.time,
      'Sup Intervention Notes': item.sup_intervention_notes
    }));

    // Convert the mapped data to a worksheet
    const ws = XLSX.utils.json_to_sheet(mappedData, { header: headers });

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    // Generate the Excel file and trigger download
    XLSX.writeFile(wb, 'Report.xlsx');
  } catch (error) {
    console.error('Error fetching data or generating report:', error);
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

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/category/");
    return response.data; // Assuming the response contains the categories
  } catch (error) {
    console.error("Error fetching categories:", error);
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

    const checkexist = await axios.get(`http://127.0.0.1:8000/user_admin/?SamAccount=${hridParts[1]}`);
    const exists = checkexist.data && checkexist.data.length > 0; // Adjust based on your actual response structure
    console.log(exists)
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
      : 'http://127.0.0.1:8000/user_admin/';
    const method = userinfo.id ? 'PUT' : 'POST';

    // Send the request with `userfromapi` as the body
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
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


