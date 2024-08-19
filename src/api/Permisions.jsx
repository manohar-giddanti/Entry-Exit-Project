import axios from "axios"; 

export async function GetPermisionValues (rulecode) {     
    debugger ;   
    const baseUrl = 'https://localhost:7158/api/CProjectData/GetPermisionValues';      
    try { 
        const response = await axios.get(baseUrl, {
            params: {
                rulecode: rulecode  
                
            } 
        });
        return response.data;  
    } catch (error) {
        console.error("There was an error fetching the data!", error); 
        throw error;  
    }   
}  


export async function SavePermissionValues(ruleCode, permissionsToSave) { 
    debugger ; 
    const baseUrl = 'https://localhost:7158/api/CProjectData/SavePermissionValues';
    try {
        const response = await axios.post(baseUrl, {
            ruleCode: ruleCode,
            permissions: permissionsToSave
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the data", error);
        throw error;
    }
}

                  


