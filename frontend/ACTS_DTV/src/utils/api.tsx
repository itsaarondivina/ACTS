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