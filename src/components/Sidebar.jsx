 
import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";  
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaquery";
import "../CSS/sidebar.css";
import { GetSidebar } from "../api/sidebar";
import * as Icons from "react-icons/fa";  


const CustomSidebar = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [menuItems, setMenuItems] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user")); 
    const storedUsername = user.username;
    if (storedUsername) {
      setUsername(storedUsername);
    }
    setCollapsed(isSmallScreen);
  }, [isSmallScreen]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        if (!username) return;
        const data = await GetSidebar(username);
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, [username]);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName];  
    return IconComponent ? <IconComponent /> : null;
  }; 

  return (
    <Sidebar collapsed={collapsed} className="sidebar"> 
      <Menu iconShape="circle">
        <MenuItem
          icon={<FaBars color="#3D52A0" />}
          onClick={handleToggle}
          className="Togglebutton"
        >
          <span className={`apache-text ${collapsed ? "collapsed" : ""}`}>
            {t("Sidebar.APACHE")}
          </span>
        </MenuItem>
        {menuItems.map((item, index) => (
          <MenuItem key={index} color="#3D52A0"> 
            <Link to={item.PATH} className="link" color="#3D52A0">
              {React.cloneElement(getIconComponent(item.ICON ) , {className : 'icon'})}   
              <span>{t(`Sidebar.${item.NAME}`)}</span>    
            </Link>
          </MenuItem>
        ))} 
      </Menu>
    </Sidebar> 
  );
};

export default CustomSidebar; 



