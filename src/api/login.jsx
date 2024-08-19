import axios from "axios"; 

export async function GetLogin (username , password ) {    

    debugger ;   
    const baseUrl = 'https://localhost:7158/api/CProjectData/Login';    
    try { 
        const response = await axios.get(baseUrl, {
            params: {
                username: username , 
                password : password
            } 
        });
        return response.data;  
    } catch (error) {
        console.error("There was an error fetching the data!", error); 
        throw error;  
    }   
}  

   
  

    
  
    
  
                    
  
 