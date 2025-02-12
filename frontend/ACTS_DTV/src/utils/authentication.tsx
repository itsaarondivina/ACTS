// src/utilities/API.tsx
import axios from "axios";

// Define and export the interface for the employee details
export interface EmployeeDetails {
  id: string;
  name: string;
  hireDate: string;
  // Add other fields based on actual API response structure
}

export interface TLOMDetails {
  tl_id: string;
  tl_name: string;
  om_id: string;
  om_name: string;
  // Add other fields based on actual API response structure
}

// export const getEmployeeDetails = async (hrid: string, hireDate: string): Promise<EmployeeDetails> => {
//   try {
//     // console.log("API HIREDATE", hireDate);
//     const response = await axios.get(
//       `https://vxicareers.com/srv2-api/api/v1/login/GetEmpDetailsOnGlobalAPI?nt=${hrid}&domain=VXIPHP`
//     );

//     const user = response.data.UserInfo;
//     console.log("USER :", user);

//     // Check if the Table property is null or empty
//     if (!user || !user.ID) {
//       throw new Error("HRID is Incorrect"); // Throw an error when the HRID is incorrect
//     } else {
//       const newhiredate = String(user.HireDate).replace(/\//g, '').trim(); // Convert to string, remove all slashes, and trim whitespace
//       // console.log("Hiredatenew: ", newhiredate);
//       // console.log("Provided Hire Date: ", hireDate);

//       if (hireDate.trim() !== newhiredate) {
//         throw new Error("Hire Date is Incorrect");
//       } else {
//         // console.log("User ID Before fetching API:", user.ID);
//         // Check user admin table
//         const localResponse = await axios.get(`http://127.0.0.1:8000/user_admin/?HRID=${user.ID}`);
//         // console.log("FROM DB: ", localResponse.data);
//         const exists = localResponse.data && localResponse.data.length > 0; // Adjust based on your actual response structure
//         // console.log("exists: ", exists);

//         if (exists) {
//           console.log("FullName NAME : ", user.FirstName +' ' + user.LastName)
//           // Store user information in sessionStorage for the current session
//           sessionStorage.setItem('authToken', JSON.stringify({
//             id: user.ID,
//             name: user.FirstName +' ' + user.LastName,
//             hireDate: user.HireDate,
//             country : user.Country,
//             tl_Id : user.SupervisorID,
//             profilepicture: `https://timekeeping.vxi.com.ph/Scheduler/GetImage.aspx?id=${user.ID}`,
//             projectId: user.ProjectID
//             // Add other fields as needed
//           }));
//           // console.log("Auth token saved in sessionStorage:", sessionStorage.getItem('authToken'));
//         } else {
//           const checkTeamAccess = await axios.get(`http://127.0.0.1:8000/team_access/?project_id=${user.ProjectID}`);
//           // console.log(checkTeamAccess)

//           const teamexists = checkTeamAccess.data && checkTeamAccess.data.length > 0; // Adjust based on your actual response structure
//           // console.log("Team Exists: ",teamexists)
//           if(teamexists){
//             sessionStorage.setItem('authToken', JSON.stringify({
//               id: user.ID,
//               name: user.FirstName +' ' + user.LastName,
//               hireDate: user.HireDate,
//               country : user.Country,
//               tl_Id : user.SupervisorID,
//               profilepicture: `https://timekeeping.vxi.com.ph/Scheduler/GetImage.aspx?id=${user.ID}`,
//               projectId: user.ProjectId
//             }));
//           } else{
//             throw new Error("No Access");
//           }
//         }
//       }
//     }

//     // Return an object that matches the EmployeeDetails interface
//     return {
//       id: user.ID,
//       name: user.FirstName +' ' + user.LastName,
//       hireDate: user.HireDate,
//       // Map other fields as needed
//     };
//   } catch (error) {
//     console.error("Error fetching employee details:", error);
//     throw error; // Rethrow the error for handling in the component
//   }
// };

// export const getEmployeeDetails = async (hrid: string, hireDate: string): Promise<EmployeeDetails> => {
//   try {
//     // Fetch employee details
//     const response = await fetch(`http://127.0.0.1:8000/agentcts/employee/?hrid=${hrid}`);

//     console.log(response)

//     if (!response.ok) {
//       throw new Error(`Error fetching employee details: ${response.statusText}`);
//     }

//     const user = await response.json();
//     const userdata = user.data; // Parse JSON response
//     console.log("USER:", userdata);

//     // Check if the user object is null or missing required properties
//     if (!userdata || !userdata.hrid) {
//       throw new Error("HRID is Incorrect");
//     }

//     const newhiredate = String(userdata.hire_date).replace(/-/g, '').trim();
//     console.log("new hiredate: ",newhiredate)
//     if (hireDate.trim() !== newhiredate) {
//       throw new Error("Hire Date is Incorrect");
//     }

//     // Check user admin table
//     const localResponse = await fetch(`http://127.0.0.1:8000/user_admin/?HRID=${user.ID}`);
//     if (!localResponse.ok) {
//       throw new Error(`Error fetching user admin data: ${localResponse.statusText}`);
//     }

//     const localData = await localResponse.json();
//     const exists = localData && localData.length > 0;

//     if (exists) {
//       sessionStorage.setItem(
//         'authToken',
//         JSON.stringify({
//           id: user.ID,
//           name: user.FirstName + ' ' + user.LastName,
//           hireDate: user.HireDate,
//           country: user.Country,
//           tl_Id: user.SupervisorID,
//           profilepicture: `https://timekeeping.vxi.com.ph/Scheduler/GetImage.aspx?id=${user.ID}`,
//           projectId: user.ProjectID,
//         })
//       );
//     } else {
//       const teamAccessResponse = await fetch(
//         `http://127.0.0.1:8000/team_access/?project_id=${user.ProjectID}`
//       );
//       if (!teamAccessResponse.ok) {
//         throw new Error(`Error fetching team access data: ${teamAccessResponse.statusText}`);
//       }

//       const teamAccessData = await teamAccessResponse.json();
//       const teamExists = teamAccessData && teamAccessData.length > 0;

//       if (teamExists) {
//         sessionStorage.setItem(
//           'authToken',
//           JSON.stringify({
//             id: user.ID,
//             name: user.FirstName + ' ' + user.LastName,
//             hireDate: user.HireDate,
//             country: user.Country,
//             tl_Id: user.SupervisorID,
//             profilepicture: `https://timekeeping.vxi.com.ph/Scheduler/GetImage.aspx?id=${user.ID}`,
//             projectId: user.ProjectID,
//           })
//         );
//       } else {
//         throw new Error("No Access");
//       }
//     }

//     // Return an object that matches the EmployeeDetails interface
//     return {
//       id: user.ID,
//       name: user.FirstName + ' ' + user.LastName,
//       hireDate: user.HireDate,
//       // Map other fields as needed
//     };
//   } catch (error) {
//     console.error("Error fetching employee details:", error);
//     throw error; // Rethrow the error for handling in the component
//   }
// };

export const getEmployeeDetails = async (hrid: string, hireDate: string) => {
  try {
    // Log the HRID being used
    console.log(`Fetching employee details for HRID: ${hrid}`);

    // Fetch employee details
    const response = await fetch(
      `http://127.0.0.1:8000/agentcts/employee/?hrid=${hrid}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching employee details: ${response.statusText}`
      );
    }

    const user = await response.json();
    console.log("API Response:", user);

    if (!user || !user.data || !user.data.hrid) {
      console.error("User  object is null or missing HRID:", user);
      throw new Error("HRID is Incorrect");
    }

    // Log the HRID returned from the API
    const apiHrid = user.data.hrid; // This is the HRID returned from the API
    console.log(`HRID from API: ${apiHrid}`);

    // Normalize HireDate format
    const newHireDate = user.data.hire_date; // Assuming the API returns it in YYYY-MM-DD format
    console.log("new hire data", newHireDate, "and Hiredate input", hireDate);
    if (hireDate.trim() !== newHireDate) {
      throw new Error("Hire Date is Incorrect");
    }

    // Log the user ID being checked in the admin table
    console.log(`Checking user admin table for HRID: ${apiHrid}`);

    // Check user admin table
    const localResponse = await fetch(
      `http://127.0.0.1:8000/user-admin/user-list/?HRID=${apiHrid}`
    );
    if (!localResponse.ok) {
      throw new Error(
        `Error fetching user admin data: ${localResponse.statusText}`
      );
    }

    const localData = await localResponse.json();
    console.log("User  Admin Data:", localData); // Log the response from the user admin table

    const exists = localData && localData.length > 0;

    let userAdmin; // Declare userAdmin here

    if (exists) {
      userAdmin = localData[0]; // Assuming the first entry is the user we want
      sessionStorage.setItem(
        "authToken",
        JSON.stringify({
          id: userAdmin.id,
          name: `${userAdmin.FirstName} ${userAdmin.LastName}`,
          hireDate: user.data.hire_date,
          country: user.data.country_code,
          tl_Id: user.data.supervisor_id,
          profilepicture: `https://timekeeping.vxi.com.ph/Scheduler/GetImage.aspx?id=${user.data.id}`,
          projectId: user.data.project,
          role: userAdmin.Role, // Include role from User_Admin model
          position: userAdmin.Position, // Include position from User_Admin model
          email: userAdmin.Email, // Include email from User_Admin model
        })
      );
    } else {
      throw new Error("User  does not exist in the admin table.");
    }

    // Return an object that matches the EmployeeDetails interface
    return {
      id: user.data.id,
      name: `${user.data.first_name} ${user.data.last_name}`,
      hireDate: user.data.hire_date,
      role: userAdmin.Role, // Include role
      position: userAdmin.Position, // Include position
      email: userAdmin.Email, // Include email
    };
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw error; // Rethrow the error for handling in the component
  }
};


export const getTLOMdetails = async (
  hrid: string
): Promise<TLOMDetails | null> => {
  try {
    // Authenticate and get token

    console.log("API AUTHENTICAITON")
    const authResponse = await axios.post(import.meta.env.VITE_API_AUTH, {
      username: import.meta.env.VITE_API_USERNAME,
      password: import.meta.env.VITE_API_PASSWORD,
    });

    const token = authResponse?.data?.access;
    console.log("TOKEN", token)
    if (!token) {
      console.error("Authentication failed: Token not received.");
      return null;
    }

    // Fetch user details using the token
    const response = await axios.get(
      `${import.meta.env.VITE_USER_MANAGE}/${hrid}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = response?.data?.data?.[0] || null;
    return user;
  } catch (error) {
    console.error(`Error fetching details for HRID: ${hrid}`, error);
    return null;
  }
};

// export const isAuthenticated = () => {
//   try {
//     const authToken = sessionStorage.getItem('authToken');
//     console.log("Session Storage Auth Token:", authToken);
//     return !!authToken;
//   } catch (error) {
//     console.error("Error accessing sessionStorage:", error);
//     return false;
//   }
// };
