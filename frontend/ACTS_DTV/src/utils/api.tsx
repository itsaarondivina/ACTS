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
    category_id: number; // Changed to number to align with integer type
    item_name: string;
    description: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
  }) => {
    try {
      console.log("API SAVING: ", lookupItem);
      const response = await axios.post('http://127.0.0.1:8000/dropdownlookup/', lookupItem);
      return response.data;
    } catch (error) {
      console.error('Error saving lookup item:', error);
      throw error;
    }
  };
  