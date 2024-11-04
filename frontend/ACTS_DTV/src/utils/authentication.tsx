// src/utilities/API.tsx
import axios from 'axios';

// Define and export the interface for the employee details
export interface EmployeeDetails {
  id: string;
  name: string;
  hireDate: string;
  // Add other fields based on actual API response structure
}

export const getEmployeeDetails = async (hrid: string, hireDate: string): Promise<EmployeeDetails> => {
  try {
    console.log("API HIREDATE", hireDate);
    const response = await axios.get(
      `https://vxicareers.com/srv2-api/api/v1/login/GetEmpDetailsOnGlobalAPI?nt=${hrid}&domain=VXIPHP`
    );

    const user = response.data.UserInfo;
    console.log("USER :", user);

    // Check if the Table property is null or empty
    if (!user || !user.ID) {
      throw new Error("HRID is Incorrect"); // Throw an error when the HRID is incorrect
    } else {
      const newhiredate = String(user.HireDate).replace(/\//g, '').trim(); // Convert to string, remove all slashes, and trim whitespace
      console.log("Hiredatenew: ", newhiredate);
      console.log("Provided Hire Date: ", hireDate);

      if (hireDate.trim() !== newhiredate) {
        throw new Error("Hire Date is Incorrect");
      } else {
        console.log("User ID Before fetching API:", user.ID);
        // Check user admin table
        const localResponse = await axios.get(`http://127.0.0.1:8000/user_admin/?HRID=${user.ID}`);
        console.log("FROM DB: ", localResponse.data);
        const exists = localResponse.data && localResponse.data.length > 0; // Adjust based on your actual response structure
        console.log("exists: ", exists);
             
        if (exists) {
          // Store user information in localStorage for session
          localStorage.setItem('authToken', JSON.stringify({
            id: user.ID,
            name: user.Name,
            hireDate: user.HireDate,
            // Add other fields as needed
          }));
        }else {
          throw new Error("No Access");
        }
      }
    }

    // Return an object that matches the EmployeeDetails interface
    return {
      id: user.ID,
      name: user.Name,
      hireDate: user.HireDate,
      // Map other fields as needed
    };
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const isAuthenticated = () => {
  try {
    const authToken = localStorage.getItem('authToken');
    console.log("Local Storage Auth Token:", authToken);
    return !!authToken;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return false;
  }
};
