import React, { useState  } from "react";
import { Navbar, Nav, NavDropdown, Modal, Button, Form } from "react-bootstrap";
import ApacheLogo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import "../CSS/Navbar.css";
import { useNavigate } from "react-router-dom";
import { CgGoogle } from "react-icons/cg";
import AvatharIcon from "../assets/images/avathar.webp";
import { FaBell } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import useAutoLogout from '../hooks/useAutoLogout' ; 
import { GetUserData } from "../api/Navbar";   
import { UpdatePassword } from "../api/Navbar"; 


const Navbarr = ({ onLogout }) => { 
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const navigate = useNavigate();  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
     onLogout();
     navigate("/login"); 
   }; 
   const user = JSON.parse(sessionStorage.getItem('user'));

  useAutoLogout(handleLogout, 600000);

  const [show, setShow] = useState(false);
  const [updateshow, setUpdateshow] = useState(false);
  const [UserData , setUserData] = useState(null) ;   
 
  const LogoutModelOpen = async () => {
    setShow(true);
    const storedUsername = user?.username;
    if (storedUsername) {
      setUsername(storedUsername);
      try {
        const response = await GetUserData(storedUsername); 
        setUserData(response[0]); 
      } catch (error) {
        console.error("Error fetching user data", error);
      } 
    }
  };   

  const LogoutModelClose = () => setShow(false);
  const LogoutUpdateModelclose = () => setUpdateshow(false); 
  const OpenUpdatePassword = () => { 
    setShow(false);
    setUpdateshow(true); 
  };  
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleUpdate = async () => {  
    debugger ; 
    if (newPassword === confirmPassword) { 
      setLoading(true); 
      try {  
       const response = await UpdatePassword(username , newPassword );      
        console.log(response); 
        if(response == 1 ) 
        {
          handleLogout(); 
        } 
      } catch (error) {
        console.error("Error updating password", error);
        setError(t("Nav.UpdatePasswordError"));
      } finally {
        setLoading(false);
      }
    } else {
      setError(t("Nav.PasswordsDoNotMatch"));  
    } 
  };  

  const performf11operation = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
      });
    }
  };

  return (    
    <> 
      <Navbar expand="lg" className="navbar">   
        <div className="navbar-left">
          <Navbar.Brand href="#home" className="headding"> 
            <img       
              src={ApacheLogo}
              // className="d-inline-block align-top"  
              alt="Apache Logo"
              id="logo"
            />
            {t("Nav.headding")}
          </Navbar.Brand>
        </div> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className="navbar-right">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav> 
            <Nav className="ml-auto">
              <NavDropdown
                title={
                  <CgGoogle
                    style={{
                      width: "25px",
                      height: "25px",
                      fontWeight: "bold",
                      color: "#b3b4bd",
                      cursor : "pointer" , 

                    }}
                  />
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  href="#English"
                  onClick={() => changeLanguage("en")}
                >
                  {" "}
                  English{" "}
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#vietnam"
                  onClick={() => changeLanguage("yn")} 
                > 
                  {" "}
                  Việt Nam{" "}
                </NavDropdown.Item> 
                <NavDropdown.Item
                  href="#chinees"
                  onClick={() => changeLanguage("cn")}
                > 
                  {" "}
                  中国人{" "}
                </NavDropdown.Item> 
              </NavDropdown> 
            </Nav> 
            <Nav> 
              <img 
                src={AvatharIcon} 
                style={{ 
                  width: "25px",
                  height: "25px",
                  fontWeight: "bold",
                  color: "#b3b4bd",
                  borderRadius: "50%",
                  cursor : "pointer" ,  
                }} 
                onClick={LogoutModelOpen} 
                alt="Avathar" 
              />  

              {/* <NavDropdown.Item as={Link} to="#" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item> */}
              {/* </NavDropdown> */}
            </Nav>  
            <Nav>  
              <Nav.Item>  
                <Nav.Link> 
                    <SlSizeFullscreen 
                    style={{
                      width: "20px",
                      height: "20px",
                      fontWeight: "bold",
                      color: "#b3b4bd",
                    }}
                    //  onClick={handleFullwindow}
                     onClick={performf11operation}
                      />  
                </Nav.Link>  
              </Nav.Item> 
            </Nav> 
            <Nav> 
              <Nav.Item> 
                <Nav.Link> 
                  <FaBell 
                    style={{
                      width: "25px",
                      height: "25px",
                      fontWeight: "bold",
                      color: "#b3b4bd", 
                    }}  
                  />  
                </Nav.Link>  
              </Nav.Item>  
            </Nav>  
          </Navbar.Collapse> 
        </div>
      </Navbar>

      <Modal show={show} onHide={LogoutModelClose}>   
        <Modal.Header closeButton>  
          <Modal.Title> {t("Nav.User")} </Modal.Title>  
        </Modal.Header> 
        <Modal.Body> 
          <img
            src={AvatharIcon}
            style={{ width: "10rem", height: "10rem" }}
            alt="Avathar"
          />
          <div>
            <label> {UserData?.NAME} </label> 
          </div>
          <div>
            <label> {UserData?.EMAIL} </label>  
          </div>
          <div>
            <Button variant="primary" type="submit" onClick={OpenUpdatePassword}>   
              {t("Nav.UpdatePassword")}
            </Button>

            <Button variant="secondary" type="submit" onClick={handleLogout}>  
              {t("Nav.Logout")}
            </Button>
          </div>
        </Modal.Body>  
      </Modal>
      
      {/* Updated Model  */}
      <Modal show={updateshow} onHide={LogoutUpdateModelclose} centered >
        <Modal.Header closeButton>
          <Modal.Title>{t("Nav.Updatepassword")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="forUsername">
              <Form.Label style={{ color: "#116466", fontWeight: "bold" }}>
                {" "}
                {t("Nav.Username")}{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Nav.EnterUsername")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label style={{ color: "#116466", fontWeight: "bold" }}>
                {t("Nav.NewPassword")}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={t("Nav.EnterNewPassword")}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label style={{ color: "#116466", fontWeight: "bold" }}>
                {t("Nav.ConfirmPassword")}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={t("Nav.EnterConfirmPassword")} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              /> 
            </Form.Group> 
            <Button variant="primary" onClick={handleUpdate}> 
              {t("Nav.Update")}
            </Button> 
            <Button variant="secondary" type="submit" onClick={handleLogout}> 
              {t("Nav.Logout")}
            </Button>
          </Form>
        </Modal.Body> 
      </Modal>
    </>
  );
};

export default Navbarr;   


 
