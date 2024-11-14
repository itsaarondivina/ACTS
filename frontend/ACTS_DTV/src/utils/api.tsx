import axios from "axios";


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
      MiddleName: userapi.data.UserInfo.ID,
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


