import axios from "axios"; 

export async function GetUserData(storedUsername) {  
    const baseUrl = 'https://localhost:7158/api/CProjectData/GetUserData'; 
    try {
      const Data = await axios.get(baseUrl , {
        params: {
            username :  storedUsername 
        }  
      }) ;
      return Data.data ; 
    } catch (error) {
      console.error("Error updating password", error);
      throw error;
    }
  }  

  export async function UpdatePassword(username , password) {    
    debugger ;  
    const baseUrl = 'https://localhost:7158/api/CProjectData/UpdatePassword'; 
    try {
      const Data = await axios.get(baseUrl , {
        params: {
            username :  username , 
            password :  password   
        }   
      }) ;
      return Data.data ; 
    } catch (error) {
      console.error("Error updating password", error);
      throw error;
    }
  } 
