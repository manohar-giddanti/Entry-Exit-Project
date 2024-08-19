
import React, { useState , useEffect  } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import '../CSS/main.css';
import Home from '../Pages/Home'; 
import Login from '../Pages/Login';  
import CustomSidebar from './Sidebar';
import Navbar from './Navbar';  
import Permisions  from '../Pages/Permisions';
import Dashboard from '../Pages/Dashboard';
import Reports from '../Pages/Reports';
import Inout from '../Pages/Inout'; 
import Outin from '../Pages/Outin'; 

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

  const handleLogout = () => { 
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    setIsAuthenticated(false); 
  };  

  return (  
    <>  
    <Router>  
        {isAuthenticated ? (    
          <>  
          <Navbar onLogout={handleLogout}/>   
          <div className='app-container'>  
            <CustomSidebar onLogout={handleLogout} />  
            <div className="content">   
              <Routes>  
                <Route path="/home" element={<Home />} /> 
                <Route path='/permisions' element = {<Permisions/>}/> 
                <Route path='/dashboard' element = { <Dashboard/>}/> 
                <Route path='/reports' element = { <Reports/>}/> 
                <Route path='/inout' element = { <Inout/>}/> 
                <Route path='/outin' element = { <Outin/>}/>  
              </Routes>  
            </div>  
            </div>  
          </>  
        ) : (  
          <Routes>  
            <Route path="/login" element={<Login onLogin={handleLogin} />} />  
            <Route path="*" element={<Navigate to="/login" />} />  
          </Routes>  
        )}   
    </Router>  
    </>
  );
};

export default Main ; 
 



  
 




