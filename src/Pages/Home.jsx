

import React, { useState, useEffect } from 'react';
import { Grid, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { t } from 'i18next'; // Assuming you are using i18next for translations
import { FaIndustry } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { SaveEmployeeData} from '../api/home';
import { GetEmpData,FetchData} from '../api/home';


const Home = () => {
  const [date, setDate] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [empbarcode, setBarcode] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [rows, setRows] = useState([]); // State to hold DataGrid rows

  useEffect(() => {
    // Set current date
    const currentDate = new Date().toISOString().split('T')[0];
    setDate(currentDate);

  }, []);


  const handleGetData = async () => {
    if (!empbarcode) {
        toast.error("Please Enter Employee Barcode");
    }
    else{
        const empdata = await GetEmpData(empbarcode);
       
        if (empdata) {
            setEmployeeName(empdata.EMPLOYEE_NAME);
            setDepartment(empdata.DEPARTMENT);
            setPosition(empdata.POSITION);
           toast.success("Employee Found");
        }
        
        else{
          toast.warning("Employee not found!");
          setEmployeeName('');
            setDepartment('');
            setPosition('');
        }
    }

   
  };

  const handleSubmit = async () => {
    debugger;
     // Check if all variables are missing
     if (!fromLocation && !toLocation && !empbarcode && !employeeName && !department && !position && !status) {
      toast.error("Please enter the details");
      return;
  }
     else if(!fromLocation) {
      toast.error("Please select From Location");
      return;
    } else if (!toLocation) {
      toast.error("Please select To Location");
      return;
    } else if (!empbarcode) {
      toast.error("Please Enter Employee Barcode");
      return;
    } else if (!employeeName) {
      toast.error("Please Enter Employee Name");
      return;
    } else if (!department) {
      toast.error("Please Enter Employee Department");
      return;
    } else if (!position) {
      toast.error("Please Enter Employee Position");
      return;
    } else if (!status) {
      toast.error("Please Enter Employee Status");
      return;
    }
    else{
      const data =await SaveEmployeeData(fromLocation, toLocation, empbarcode, employeeName, department, position, status);
      debugger;
      console.log(data);
      if (data === "Success") {  
        toast.success("Data submitted successfully");
        fetchDataByDate();
        setIsGridVisible(true); // Show the grid on successful submission
      
      } 
      if(data === "Fail"){
        toast.error("Data submission failed");
      }
      if(data === "") {
        toast.error("DataBase error occured");
      }
    }
  };

  const fetchDataByDate = async () => {
    debugger;
      const datareturn = await FetchData(); // Replace with your actual endpoint
      //const data = await response.json();
      console.log(datareturn);
      debugger;
      if (datareturn && datareturn.length > 0) {
        const formattedData = datareturn.map((item, index) => ({
          id: index+1,
          date: new Date(item.IN_OUT_DT).toLocaleDateString(),
          fromLocation: item.FROM_LOCATION,
          toLocation: item.TO_LOCATION,
          barcode: item.EMP_BARCODE,
          employeeName: item.EMPLOYEE_NAME,
          department: item.DEPARTMENT,
          position: item.POSITION,
          status: item.STATUS
          //generatedNumber: item.ID // Or whatever field you want to use
        }));
        setRows(formattedData);
        setIsGridVisible(true); // Show the grid when data is fetched
      } else {
        toast.warning("No data found for today");
     }
   
  };

  // Call fetchDataByDate to load data when component mounts
  useEffect(() => {
    fetchDataByDate();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: t('Home.label.date'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'fromLocation', headerName: t('Home.label.fromLocation'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'toLocation', headerName: t('Home.label.toLocation'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'barcode', headerName: t('Home.label.barcode'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'employeeName', headerName: t('Home.label.employeeName'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'department', headerName: t('Home.label.department'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'position', headerName: t('Home.label.position'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'status', headerName: t('Home.label.status'), width: 150, headerClassName: 'data-grid-header' },
    // { field: 'generatedNumber', headerName: t('Home.label.generatedNumber'), width: 150, headerClassName: 'data-grid-header' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ToastContainer  theme="colored"  
        position="top-center"   
        autoClose={1200}    
        pauseOnHover />
      <Grid item xs={12} container alignItems="center" justifyContent="left" style={{ flexShrink: 0, marginTop: 5 }}>
        <Typography variant="h6" component="h4" gutterBottom style={{ color: '#bf40bf' }}>
          <FaIndustry /> \ {t("Home.heading.welcome")}
        </Typography>
      </Grid>

      <Grid item xs={12} container alignItems="center" justifyContent="center" style={{ flexShrink: 0, width: '100%', margin: '0 auto' }}>
        <Paper elevation={1} style={{ padding: 10, width: '100%', marginTop: 20 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm="auto" container justifyContent="center" alignItems="center">
              <img
                src="#" // Replace with actual image source
                alt="Emp Photo"
                style={{
                  width: 150,
                  height: 150,
                  border: '2px solid #ccc',
                  borderRadius: 5,
                }}
              />
            </Grid>

            <Grid item xs={12} sm container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
                <TextField
                  label={t("Home.label.date")}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                 
                  style={{ width: '100%' }}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
              <TextField
                  label={t("Home.label.barcode")}
                  value={empbarcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  required
                  style={{ width: '100%' }}
                  variant="outlined"
                  placeholder={t("Home.placeholder.barcode")}
                />
         
              </Grid>

              <Grid item xs={12} sm={6} md={1} container justifyContent="center" alignItems="center">
              <Button
                 
                 color="secondary"
                  onClick={handleGetData}
                  style={{ width: '50%' }}
                >
                  {t("Home.button.getdata")}
                </Button>
          
              </Grid>

              <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">

              <TextField
                  label={t("Home.label.employeeName")}
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  style={{ width: '100%' }}
                  variant="outlined"
                  placeholder={t("Home.placeholder.employeeName")}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">

              <TextField
                  label={t("Home.label.department")}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                
                  style={{ width: '100%' }}
                  variant="outlined"
                  placeholder={t("Home.placeholder.department")}
                />
        
              </Grid>

              <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
              <TextField
                  label={t("Home.label.position")}
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                
                  style={{ width: '100%' }}
                  variant="outlined"
                  placeholder={t("Home.placeholder.position")}
                />
         
              </Grid>

              <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
                  <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel>{t("Home.label.fromLocation")}</InputLabel>
                  <Select
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    label={t("Home.label.fromLocation")}
                  >
                    <MenuItem value="APH">APH</MenuItem>
                    <MenuItem value="APH2">APH2</MenuItem>
                    <MenuItem value="APH3">APH3</MenuItem>
                  
                  </Select>
                </FormControl>
          
              </Grid>

              <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
                    
              <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel>{t("Home.label.toLocation")}</InputLabel>
                  <Select
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    label={t("Home.label.toLocation")}
                  >
                    <MenuItem value="APH">APH</MenuItem>
                    <MenuItem value="APH2">APH2</MenuItem>
                    <MenuItem value="APH3">APH3</MenuItem>
                
                  </Select>
                </FormControl>
           
              </Grid>

               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
                     <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel>{t("Home.label.status")}</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label={t("Home.label.status")}
                  >
                    <MenuItem value="in">In</MenuItem>
                    <MenuItem value="out">Out</MenuItem>
                  </Select>
                </FormControl>
              </Grid> 

              <Grid item xs={12} container justifyContent="center" alignItems="center">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  style={{ width: '20%' }}
                >
                  {t("Home.button.submit")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
     
      {isGridVisible && (
      <div style={{ flexGrow: 1, width: '100%', marginTop: 20 }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight />
      </div>
         )}
    </div>
  );
};

export default Home;











// import React, { useState, useEffect } from 'react';
// import { Grid, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { t } from 'i18next'; // Assuming you are using i18next for translations
// import { FaIndustry } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import { SaveEmployeeData, GetEmpData, FetchData } from '../api/home';

// const Home = () => {
//   const [date, setDate] = useState('');
//   const [fromLocation, setFromLocation] = useState('');
//   const [toLocation, setToLocation] = useState('');
//   const [empbarcode, setBarcode] = useState('');
//   const [employeeName, setEmployeeName] = useState('');
//   const [department, setDepartment] = useState('');
//   const [position, setPosition] = useState('');
//   const [status, setStatus] = useState('');
//   const [isGridVisible, setIsGridVisible] = useState(false);
//   const [rows, setRows] = useState([]); // State to hold DataGrid rows

//   useEffect(() => {
//     // Set current date
//     const currentDate = new Date().toISOString().split('T')[0];
//     setDate(currentDate);
//     // Call fetchDataByDate to load data when component mounts
//     fetchDataByDate();
//   }, []);

//   const handleGetData = async () => {
//     if (!empbarcode) {
//       toast.error("Please Enter Employee Barcode");
//     } else {
//       const empdata = await GetEmpData(empbarcode);
//       if (empdata) {
//         setEmployeeName(empdata.EMPLOYEE_NAME || '');
//         setDepartment(empdata.DEPARTMENT || '');
//         setPosition(empdata.POSITION || '');
//       } else {
//         toast.warning("Employee not found");
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     if (!fromLocation) {
//       toast.error("Please select From Location");
//       return;
//     } else if (!toLocation) {
//       toast.error("Please select To Location");
//       return;
//     } else if (!empbarcode) {
//       toast.error("Please Enter Employee Barcode");
//       return;
//     } else if (!employeeName) {
//       toast.error("Please Enter Employee Name");
//       return;
//     } else if (!department) {
//       toast.error("Please Enter Employee Department");
//       return;
//     } else if (!position) {
//       toast.error("Please Enter Employee Position");
//       return;
//     } else if (!status) {
//       toast.error("Please Enter Employee Status");
//       return;
//     } else {
//       const data = await SaveEmployeeData(fromLocation, toLocation, empbarcode, employeeName, department, position, status);
//       if (data === "1") {
//         toast.success("Data submitted successfully");
//         fetchDataByDate(); // Fetch data after successful submission
//         setIsGridVisible(true); // Show the grid on successful submission
//       } else {
//         toast.error("Data submission failed");
//       }
//     }
//   };

//   const fetchDataByDate = async () => {
//     const datareturn = await FetchData(); // Replace with your actual endpoint
//     if (datareturn && datareturn.length > 0) {
//       const formattedData = datareturn.map((item, index) => ({
//         id: item.ID,
//         date: new Date(item.IN_OUT_DT).toLocaleDateString(),
//         fromLocation: item.FROM_LOCATION,
//         toLocation: item.TO_LOCATION,
//         barcode: item.EMP_BARCODE,
//         employeeName: item.EMPLOYEE_NAME,
//         department: item.DEPARTMENT,
//         position: item.POSITION,
//         status: item.STATUS
//       }));
//       setRows(formattedData);
//     } else {
//       toast.warning("No data found for today");
//       setIsGridVisible(false); // Hide the grid if no data found
//     }
//   };

//   // Define columns for the DataGrid
//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'date', headerName: t('Home.label.date'), width: 150, headerClassName: 'data-grid-header' },
//     { field: 'fromLocation', headerName: t('Home.label.fromLocation'), width: 150, headerClassName: 'data-grid-header' },
//     { field: 'toLocation', headerName: t('Home.label.toLocation'), width: 150, headerClassName: 'data-grid-header' },
//     { field: 'barcode', headerName: t('Home.label.barcode'), width: 150, headerClassName: 'data-grid-header' },
//     { field: 'employeeName', headerName: t('Home.label.employeeName'), width: 150, headerClassName: 'data-grid-header' },
//     { field: 'department', headerName: t('Home.label.department'), width: 150, headerClassName: 'data-grid-header' },
//     { field: 'position', headerName: t('Home.label.position'), width: 150, headerClassName: 'data-grid-header' },
//     { field: 'status', headerName: t('Home.label.status'), width: 150, headerClassName: 'data-grid-header' }
//   ];

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <Grid item xs={12} container alignItems="center" justifyContent="left" style={{ flexShrink: 0, marginTop: 5 }}>
//         <Typography variant="h6" component="h4" gutterBottom style={{ color: '#bf40bf' }}>
//           <FaIndustry /> \ {t("Home.heading.welcome")}
//         </Typography>
//       </Grid>

//       <Grid item xs={12} container alignItems="center" justifyContent="center" style={{ flexShrink: 0, width: '100%', margin: '0 auto' }}>
//         <Paper elevation={1} style={{ padding: 10, width: '100%', marginTop: 20 }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} sm="auto" container justifyContent="center" alignItems="center">
//               <img
//                 src="#" // Replace with actual image source
//                 alt="Emp Photo"
//                 style={{
//                   width: 150,
//                   height: 150,
//                   border: '2px solid #ccc',
//                   borderRadius: 5,
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} sm container spacing={2} alignItems="center">
//               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
//                 <TextField
//                   label={t("Home.label.date")}
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   style={{ width: '100%' }}
//                   variant="outlined"
//                   InputLabelProps={{ shrink: true }}
//                   disabled
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
//                 <TextField
//                   label={t("Home.label.barcode")}
//                   value={empbarcode}
//                   onChange={(e) => setBarcode(e.target.value)}
//                   required
//                   style={{ width: '100%' }}
//                   variant="outlined"
//                   placeholder={t("Home.placeholder.barcode")}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={2} container justifyContent="center" alignItems="center">
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleGetData}
//                   style={{ width: '20%' }}
//                 >
//                   {t("Home.button.getdata")}
//                 </Button>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
//                 <TextField
//                   label={t("Home.label.employeeName")}
//                   value={employeeName}
//                   onChange={(e) => setEmployeeName(e.target.value)}
//                   style={{ width: '100%' }}
//                   variant="outlined"
//                   placeholder={t("Home.placeholder.employeeName")}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
//                 <TextField
//                   label={t("Home.label.department")}
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                   style={{ width: '100%' }}
//                   variant="outlined"
//                   placeholder={t("Home.placeholder.department")}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
//                 <TextField
//                   label={t("Home.label.position")}
//                   value={position}
//                   onChange={(e) => setPosition(e.target.value)}
//                   style={{ width: '100%' }}
//                   variant="outlined"
//                   placeholder={t("Home.placeholder.position")}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
//                 <FormControl variant="outlined" style={{ width: '100%' }}>
//                   <InputLabel>{t("Home.label.fromLocation")}</InputLabel>
//                   <Select
//                     value={fromLocation}
//                     onChange={(e) => setFromLocation(e.target.value)}
//                     label={t("Home.label.fromLocation")}
//                   >
//                     <MenuItem value="APH">APH</MenuItem>
//                     <MenuItem value="APH2">APH2</MenuItem>
//                     <MenuItem value="APH3">APH3</MenuItem>
//                     <MenuItem value="Apex">Apex</MenuItem>
//                     <MenuItem value="Maxking">Maxking</MenuItem>
//                     <MenuItem value="APC">APC</MenuItem>
//                      <MenuItem value="Camphor">Camphor</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
//                 <FormControl variant="outlined" style={{ width: '100%' }}>
//                   <InputLabel>{t("Home.label.toLocation")}</InputLabel>
//                   <Select
//                     value={toLocation}
//                     onChange={(e) => setToLocation(e.target.value)}
//                     label={t("Home.label.toLocation")}
//                   >
//                     <MenuItem value="APH">APH</MenuItem>
//                     <MenuItem value="APH2">APH2</MenuItem>
//                     <MenuItem value="APH3">APH3</MenuItem>
//                     <MenuItem value="Apex">Apex</MenuItem>
//                     <MenuItem value="Maxking">Maxking</MenuItem>
//                     <MenuItem value="APC">APC</MenuItem>
//                      <MenuItem value="Camphor">Camphor</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
//                 <FormControl variant="outlined" style={{ width: '100%' }}>
//                   <InputLabel>{t("Home.label.status")}</InputLabel>
//                   <Select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                     label={t("Home.label.status")}
//                   >
//                     <MenuItem value="">
//                       <em>{t("Home.placeholder.status")}</em>
//                     </MenuItem>
//                     <MenuItem value="IN">IN</MenuItem>
//                     <MenuItem value="OUT">OUT</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>

//             <Grid item xs={12} container justifyContent="center" alignItems="center" style={{ marginTop: 20 }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//                 style={{ width: '20%' }}
//               >
//                 {t("Home.button.submit")}
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>

//       <Grid item xs={12} container alignItems="center" justifyContent="center" style={{ marginTop: 20 }}>
//         {isGridVisible && (
//           <Paper elevation={1} style={{ width: '100%', padding: 20 }}>
//             <Typography variant="h6" gutterBottom style={{ marginBottom: 20 }}>
//               {t("Home.label.recordList")}
//             </Typography>
//             <div style={{ height: 400, width: '100%' }}>
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 pageSize={5}
//                 rowsPerPageOptions={[5]}
//                 checkboxSelection
//                 disableSelectionOnClick
//               />
//             </div>
//           </Paper>
//         )}
//       </Grid>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Home;
