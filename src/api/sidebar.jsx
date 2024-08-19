import axios from 'axios'; 

export async function GetSidebar(username) {    
    debugger ; 
    const baseUrl = 'https://localhost:7158/api/CProjectData/GetSidebar';    
    try { 
        const response = await axios.get(baseUrl, {
            params: {
                username: username 
            } 
        });
        return response.data;  
    } catch (error) {
        console.error("There was an error fetching the data!", error); 
        throw error;  
    }   
} 
