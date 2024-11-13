import axios from "axios";


    
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
  is_active : boolean;
  created_by : string | null;
  updated_by : string | null;
  full_name : string | null;
  tl_hrid : string | null;
}) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/agentcts/', agentCtsItem);
    return response.data;
  } catch (error) {
    console.error('Error saving Agent CTS item:', error);
    throw error;
  }
};


export const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/category/');
      return response.data; // Assuming the response contains the categories
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  export const fetchLookup = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/dropdownlookup/');
      return response.data; // Assuming the response contains the categories
    } catch (error) {
      console.error('Error fetching categories:', error);
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
      const response = await axios.put(`http://127.0.0.1:8000/dropdownlookup/${lookupItem.id}/`, lookupItem);
      return response.data; // Return the updated item
    } else {
      // Otherwise, it's an add request
      const response = await axios.post('http://127.0.0.1:8000/dropdownlookup/', lookupItem);
      return response.data; // Return the newly created item
    }
  } catch (error) {
    console.error('Error saving lookup item:', error);
    throw error; // Rethrow the error for handling by the calling function
  }
};

  