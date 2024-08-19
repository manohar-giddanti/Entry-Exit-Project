
import axios from 'axios';
import { toast } from 'react-toastify';
import API_BASE_URL from '../API_URL/config';

export async function GetEmployeeData() {
    const url = `${API_BASE_URL}/Home/GetEmployeeData`;

    try {
        const response = await axios.get(url);

        if (response.status === 200 && response.data !== '400') {
           // toast.success('Employee data fetched successfully');
            return response.data;
        } else {
            toast.error(`Failed to fetch employee data. Server returned status: ${response.status}`);
            return [];
        }
    } catch (error) {
        toast.error(`Error to fetch employee data. Error details: ${error.message}`);
        return [];
    }
}


export async function UpdateEmpStatus(EmpId) {
    const url = `${API_BASE_URL}/Home/UpdateEmpStatus`;
     // Prepare the data object
     const data = {
        EmpId
    };


    try {
        const response = await axios.post(url,data);

        if (response.status === 200 && response.data !== '400') {
          
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


export async function SendReasonDataToAPI(formData,reasonforlate) {
    debugger;
     const url = `${API_BASE_URL}/Home/SendReasonDataToAPI`;
     try {
        const response = await axios.post(url, {
            fromLocation: formData.fromLocation,
            toLocation: formData.toLocation,
            barcode: formData.barcode,
            employeeName: formData.employeeName,
            department: formData.department,
            position: formData.position,
            status: formData.status,
            reason: reasonforlate
        });
        console.log('Response from API:', response.data);
        // Handle response from API if needed
    } catch (error) {
        console.error('Error sending data to API:', error);
        // Handle error if needed
    }
   
}

export async function SendNormalDataToAPI(formData) {
    debugger;
    
    const url = `${API_BASE_URL}/Home/SendNormalDataToAPI`;
    try {
       const response = await axios.post(url, {
           fromLocation: formData.fromLocation,
           toLocation: formData.toLocation,
           barcode: formData.barcode,
           employeeName: formData.employeeName,
           department: formData.department,
           position: formData.position,
           status: formData.status,
           
           
       });
       console.log('Response from API:', response.data);
       return response.data;
       // Handle response from API if needed
   } catch (error) {
       console.error('Error sending data to API:', error);
       // Handle error if needed
   }
  
}


