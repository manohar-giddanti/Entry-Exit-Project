
import axios from "axios";
import { toast } from "react-toastify";




export async function SaveEmployeeData(fromLocation, toLocation, empbarcode, employeeName, department, position, status) {
   
    const baseUrl = 'https://localhost:7158/api/Home/SaveEmployeeData';

    try {
        const response = await axios.post(baseUrl, null, {
            params: {
                fromLocation: fromLocation,
                toLocation: toLocation,
                empbarcode: empbarcode,
                employeeName: employeeName,
                department: department,
                position: position,
                status: status
                
            }
        });
        console.log(response.data);
        debugger;
      return response.data;
    } catch (error) {
        console.error("Error occurs during data submission:", error);
      
    }
}




export async function GetEmpData(empbarcode) {
   
    const baseUrl = 'https://localhost:7158/api/Home/GetEmpData';

    try {
        const response = await axios.get(baseUrl, {
            params: {
                empbarcode: empbarcode
            }
        });
       
        if (response.status === 200 && response.data !== "400") {
            console.log(response.data[0]);
           // console("Employee data get success");
            return response.data[0];
        } 
        else {
            console("Employee not found");
            return response.data[0]=null;
            //toast.error("Failed to get employee data. Server returned status: " + response.status);
        }
    } catch (error) {
        console.error("Error get employee data:", error);
        toast.error("Failed to get employee data. Error details: " + error.message);
    }
}
export async function FetchData() {
    
    const baseUrl = 'https://localhost:7158/api/Home/FetchData';

    try {
        const response = await axios.get(baseUrl, {
           
        });
       
        if (response.status === 200 && response.data !== "400") {
            console.log(response.data);
            return response.data;
        } else {
            toast.error("Failed to fetch employee data. Server returned status: " + response.status);
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
        toast.error("Failed to fetch employee data. Error details: " + error.message);
    }
}










// import axios from 'axios';
// import { toast } from 'react-toastify';
// import API_BASE_URL from '../API_URL/config';

// export async function SaveEmployeeData(date, fromLocation, toLocation, empbarcode, employeeName, department, position, status, generatedNumber) {
//     const url = `${API_BASE_URL}/Home/SaveEmployeeData`;

//     // Prepare the data object
//     const data = {
//         date,
//         fromLocation,
//         toLocation,
//         empbarcode,
//         employeeName,
//         department,
//         position,
//         status,
//         generatedNumber
//     };

//     try {
//         const response = await axios.post(url, data);
//         debugger;
//         if (response.status === 200 && response.data !== '400') {
          
//             return response.data;
//         } else {
//             toast.error(`Failed to save employee data. Server returned status: ${response.status}`);
//         }
//     } catch (error) {
//         console.error('Error saving employee data:', error);
//         toast.error(`Failed to save employee data. Error details: ${error.message}`);
//     }
// }


