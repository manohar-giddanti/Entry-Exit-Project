
import axios from 'axios';
import { toast } from 'react-toastify';
import API_BASE_URL from '../API_URL/config';

export async function GetInEmployeeData() {
    debugger;
    const url = `${API_BASE_URL}/Home/GetInEmployeeData`;

    try {
        const response = await axios.get(url);

        if (response.status === 200 && response.data !== '400') {
            //toast.success('Employee data fetched successfully');
            return response.data;
        } else {
          // toast.error(`Failed to fetch employee data. Server returned status: ${response.status}`);
            return [];
        }
    } catch (error) {
        toast.error(`Failed to fetch employee data. Error details: ${error.message}`);
        return [];
    }
}

export async function SendDataToAPI(fromloc,toloc,empid,empname,dept,role,state) {
    debugger;
     const url = `${API_BASE_URL}/Home/SendDataToAPI`;
     try {
        const response = await axios.post(url, {
            fromLocation:fromloc,
            toLocation:toloc,
            barcode: empid,
            employeeName: empname,
            department:dept,
            position:role,
            status:state
    
        });
        console.log('Response from API:', response.data);
        debugger;
        // Handle response from API if needed
    } catch (error) {
        console.error('Error sending data to API:', error);
        // Handle error if needed
    }
   
}

// export async function SendDataToAPI(fromloc, toloc, empid, empname, dept, role, state) {
//     debugger;
//     const url = `${API_BASE_URL}/Home/SendDataToAPI?fromLocation=${encodeURIComponent(fromloc)}&toLocation=${encodeURIComponent(toloc)}&empbarcode=${encodeURIComponent(empid)}&employeeName=${encodeURIComponent(empname)}&department=${encodeURIComponent(dept)}&position=${encodeURIComponent(role)}&status=${encodeURIComponent(state)}`;
//     try {
//         const response = await axios.post(url);
//         console.log('Response from API:', response.data);
//         // Handle response from API if needed
//     } catch (error) {
//         console.error('Error sending data to API:', error);
//         // Handle error if needed
//     }
// }
