import React, { useState , useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaBuromobelexperte } from "react-icons/fa";
import { GetPermisionValues, SavePermissionValues } from "../api/Permisions";  
import { ToastContainer , toast } from "react-toastify";  
import { CircularProgress, Backdrop } from "@mui/material";


const Permissions = () => { 
  
  const { t } = useTranslation(); 
  const [modules, setModules] = useState([]);
  const [rulecode, setRulecode] = useState("");
  const [switchStates, setSwitchStates] = useState({});
  const [loading , setLoading] = useState(false) ; 
  // Set functions when page is loaded 
  useEffect(() => { 
    toast.info("Welcome to the Permissions Management Page!");
  }, []); 

  // Get Modules from backend by rule code // Query Button 
  const RuleCodeBasedModules = async () => {
    debugger ; 
    if (rulecode === null || rulecode === "") {
      console.log("Plese enter rulecode");
      toast.warn("Please enter rule code ..") ; 
    } else { 
       setLoading(true) ; 
       try{
        const response = await GetPermisionValues(rulecode);
        console.log(response);
        setModules(response);  
        if(response.length === 0) 
        {
          toast.warning("The rule code doesn't contain any Modules ") ; 
        }
        const initializeSwitchStates = response.reduce((acc, module, index) => {               
          acc[index] = module.ISENABLE === 'Y'; 
          return acc;
        }, {});
        setSwitchStates(initializeSwitchStates); 
       }
       catch (error) {
        console.error("Error fetching permission values:", error);
        toast.error("Failed to fetch permission values.");
      } finally {
        setLoading(false); 
      } 
    }
  };  
  // for switch button turn on to off 
  const handleSwitchChange = (index) => (event) => {
    setSwitchStates((prevStates) => ({ 
      ...prevStates,
      [index]: event.target.checked,
    }));
  };    

  // For rule code change when enter in text box 
  const handleRulecodeChange = (event) => {
    setRulecode(event.target.value);
  };   

  // Reset Button 
  const ResetModules = () => {
    setLoading(true);
    const resetSwitchStates = Object.keys(switchStates).reduce((acc, key) => {
      acc[key] = false; // Turn off all switches
      return acc;
    }, {});
    setSwitchStates(resetSwitchStates);
  
    setTimeout(() => {
      setLoading(false);
      toast.success("Reset Successfully..");
    }, 1000);
  };
  

  // Save Button 
  const SaveModules = async () => { debugger ; 
    const permissionsToSave = modules.map((module, index) => ({
      name: module.NAME,
      isEnabled: switchStates[index] || false,
    })); 
    if(permissionsToSave.length === 0 )
    {
      toast.warn("The is no Modules ..") ; 
    }
    else{
      setLoading(true) ; 
      try {
        const response = await SavePermissionValues(rulecode, permissionsToSave); 
        console.log(response);  
        toast.success("Permision Success .. ") ; 
      } catch (error) {
        console.error("Error saving modules", error);  
      } 
      finally{
        setLoading(false) ; 
      }
    } 
   
  };

  return (
    <>
   
    <ToastContainer
        theme="colored"  
        position="top-center"   
        autoClose={1200}    
        pauseOnHover    
      /> 
      <h4> 
        {" "} 
        <FaBuromobelexperte /> / {t("permision.List")} /{" "}
        {t("Permision_Management")}{" "}
      </h4> 
      
      <Paper elevation={2} style={{ padding: "20px" }}>
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
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="name-input">
              {t("Permision.Rule.code")}
            </InputLabel>
          </Grid> 
          <Grid item container> 
            <TextField
              id="name-input"
              label={t("Permision.Enter.Rule_Code")}  
              required 
              variant="outlined"
              style={{ width: 280 }}
              value={rulecode}
              onChange={handleRulecodeChange} 
            />
          </Grid>
          <Grid item xs></Grid>
          <Grid item style={{ alignContent: "end" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "8px", padding: "10px 20px" }}
              onClick={RuleCodeBasedModules}
            > 
              {t("Permisions.Query")}
            </Button> 
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "8px", padding: "10px 20px" }}
              onClick={ResetModules}
            >
              {t("Permisions.Reset")}
            </Button>
            <Button
              variant="contained"
              color="success"
              style={{ marginRight: "8px", padding: "10px 20px" }}
              onClick={SaveModules}
            >
              {t("Permisions.Save")}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* For Permision Paper  */}
      <Paper elevation={2} style={{ padding: "20px", marginTop: "20px" }}> 
        <Grid container spacing={2}>
          {modules.map((module, index) => (
            <Grid item xs={12} sm={12} md={12} key={index}>
              <Paper style={{ padding: "10px" }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >  
                  <Grid item> {t(`Permision.${module.NAME}`)}</Grid> 
                  <Grid item>
                    <FormControlLabel
                      control={<Switch color="secondary" />} 
                      labelPlacement="start"
                      checked={switchStates[index] || false}
                      onChange={handleSwitchChange(index)} 
                    /> 
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper> 
    </>
  );
};

export default Permissions;
