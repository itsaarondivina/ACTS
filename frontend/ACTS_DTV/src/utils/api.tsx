/* eslint-disable @typescript-eslint/no-unused-vars */
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
      'Call ID': item.id,
      'Date Logged': item.date_created,
      'HRID': item.created_by,
      'Project ID': item.projectId,
      'Agent Name': item.full_name,
      'Team Leader': item.tl_name,
      'Operations Manager': item.om_name,
      'Call Type': item.call_type,
      'Account Type': item.account_type,
      'Case ID/Service Request': item.case_id,
      'Area/CTV Level 3': item.area,
      'Sub-Area/CTV Level 4': item.sub_area,
      'Transfer Call': item.transfer_call,
      'Transfer Destination': item.transfer_destination,
      'Transfer approver ATTUID': item.transfer_attuid,
      'Issue Resolved': item.issue_resolved,
      'Is the customer happy with the resolution?': item.is_customer_happy,
      'Did you Provide Credit?': item.provide_credit,
      'Agent Credit Amount': item.credit_amount,
      'Credit Approvers ATTUID': item.credit_attuid,
      'Appointment inquiry "same day"': item.appointment_sameday,
      'Appointment inquiry "same day" - Selection': item.appointment_sameday_2,
      'Focus Call Drivers': item.focus_driver,
      'Focus Call Drivers - Selection': item.focus_driver_2,
      'Repeat Prediction': item.repeat_prediction,
      'PPLAN Closed': item.pplan_close,
      'PPLAN': item.pplan_close_2,
      'Dispatch Call/Equipment Replacement': item.dispatch_call,
      'Agent Due Date': item.due_date,
      'Agent Time': item.select_time,
      'Dispatch/Equipment Replacement Approver\'s ATTUID': item.dispatch_equipment,
      'WMT Process Opportunities': "",
      'Tool Issue (Genesys)': "",
      'Support HRID': "",
      'Reason for Account Review': "",
      'If CallBack': "",
      'Support - Appointment inquiry "same day"': "",
      'Support - Focus Call Drivers': "",
      'Dispatch Call/Equipment Replacement 2': "",
      'Validated?': "",
      'Due Date': "",
      'Time': "",
      'Sup Intervention Notes': ""
    }));

    // Convert the mapped data to a worksheet
    const ws = XLSX.utils.json_to_sheet(mappedData, { header: headers });

    // Define column widths (you can adjust these values as needed)
    const colWidths = headers.map((header, index) => {
      let maxLength = 0;
      mappedData.forEach((row: any) => {
        const cellValue = row[header];
        if (cellValue) {
          maxLength = Math.max(maxLength, cellValue.toString().length);
        }
      });
      return { wch: maxLength + 2 }; // Adding 2 for some extra space
    });

    // Adjust the width of the "Agent Name" column (e.g., set it to 30 characters)
    const agentNameColumnIndex = headers.indexOf('Agent Name');
    if (agentNameColumnIndex !== -1) {
      colWidths[agentNameColumnIndex] = { wch: 30 }; // Adjust to 30 characters
    }
    const callidNameColumnIndex = headers.indexOf('Agent Name');
    if (callidNameColumnIndex !== -1) {
      colWidths[agentNameColumnIndex] = { wch: 30 }; // Adjust to 30 characters
    }

    // Apply column widths to the worksheet
    ws['!cols'] = colWidths;

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


