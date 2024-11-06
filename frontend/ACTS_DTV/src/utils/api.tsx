import axios from "axios";

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

  