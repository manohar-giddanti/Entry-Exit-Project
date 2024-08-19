import React from "react";
import dashboardpic from '../assets/images/dashboardpic.webp' ; 
import { Grid, TextField, Button, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
const divStyle = {
    backgroundImage: `url(${dashboardpic})`,  
    backgroundSize: 'cover',  
    backgroundPosition: 'center',  
    height: '80vh',  
    width: '80vw',   
};
const Dashboard = () => {
    return (
        <Grid item xs={12} md={6} style={{ padding: '0 16px' }}>
            <Grid 
          container 
          style={{ 
            padding: 3, 
            // border: '1px solid #ff0066',
            backgroundColor: '#e6f2ff', 
            borderRadius: 5,
            margin: '0 auto',
            maxWidth: 500 // Ensures the width doesn't exceed 500px on larger screens

          }}
        >
          <h3 style={{ fontSize: 30, margin: '0 auto',color:'#009900' }}>DashBoard</h3>
        </Grid>
      <Paper elevation={1} style={{ padding: 10, width: '100%',marginTop:10 }}>
        
        <Grid container item xs={12} md={6}
          style={{ 
            padding: 3, 
             border: '1px solid #ff0066',
            backgroundColor: '#e6f2ff', 
            borderRadius: 1,
            margin: '0 auto',
            maxWidth: 1300, // Ensures the width doesn't exceed 500px on larger screens
            marginTop:50,
            height:500
          }}>
          
          </Grid>
      </Paper>
    </Grid>
       
    );
};

export default Dashboard;
