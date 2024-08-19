
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/login.css';  
import { toast, ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";
import { GetLogin } from '../api/login'; 
import { CircularProgress, Backdrop } from "@mui/material";

const Login = ({ onLogin , setLogedIn }) => {   
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(false) ; 
  const navigate = useNavigate();


  const handleClick = async (event) => {  
    debugger  ;
    event.preventDefault();  
  
    if (username === '') {
      toast.error('Please enter Username');
    } else if (password === '') {
      toast.error('Please enter Password');
    } else { 
      setLoading(true) ; 
      try { 
        debugger ;  
        const response = await GetLogin(username, password); 

        if (response === "Success") {  
          debugger ; 
          sessionStorage.setItem('user', JSON.stringify({ username }));  
          sessionStorage.setItem('isLoggedIn', 'true'); 
          //  sessionStorage.setItem({username}) ;  
          // setLoggedIn(true); 
          sessionStorage.getItem({username}) ; 
          toast.success('Login successful'); 
          setTimeout(() => {
            onLogin();
            navigate('/home');
          }, 3000); 
        }
        if(response === "Fail")
        {
          toast.error("login Failed...")  ; 
        }
        if(response === "SqlError") 
        {
          toast.error("Sql Server Authentication Error")   ;  
        }
      } catch (error) {  
        console.error('Login error', error); 
        toast.error('Something went wrong. Please try again!');  
      }  
      finally{
        setLoading(false) ; 
      }
    }         
  };   
  
  return (   
     <div className="login-container">      
     <ToastContainer
        theme="colored"  
        position="top-center"   
        autoClose={1200}    
        pauseOnHover    
      />  
       <Backdrop
        open={loading}
        style={{
          zIndex: 1300, 
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>  
      <div className="login-box">   
        <h2>Login</h2>   
        <div className="input-group">  
          <label className="label">Username</label>  
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter User ID"
          />   
        </div> 
        <div className="input-group"> 
          <label className="label">Password</label> 
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />  
        </div> 
        <div className="forget-password">     
          <label>Forgot Password?</label>    
          {/* <a href="#">Forgot Password?</a>  */}
        </div> 
        <div className="input-group">                                         
          <button className="button" onClick={handleClick}>Login</button> 
        </div>             
        <div className="footer">              
          <label>Developed by APH - IT</label>     
        </div>        
      </div>    
    </div>     

  
  );  
};  

export default Login;
