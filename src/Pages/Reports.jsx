
import React, { useState } from 'react';
import { Grid, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { t } from 'i18next'; // Assuming you are using i18next for translations
import { toast, ToastContainer } from "react-toastify";
import { SaveEmployeeData } from '../api/home';
import { TbReportSearch } from "react-icons/tb";
import { FaFileDownload } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

const Reports = () => {
  const [date, setDate] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [empbarcode, setBarcode] = useState('');
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState([]); // State to hold DataGrid rows

  const handleSubmit = () => {
    if (!date) {
      toast.error("Please select Date");
    } else if (!fromLocation) {
      toast.error("Please select From Location");
    } else if (!toLocation) {
      toast.error("Please select To Location");
    } else if (!empbarcode) {
      toast.error("Please Enter Employee Barcode");
    } else if (!status) {
      toast.error("Please Enter Status");
    } else {
      const data = SaveEmployeeData(date, fromLocation, toLocation, empbarcode, status);

      console.log(data);
      toast.success('Employee data saved successfully');

      // Add new row to DataGrid
      const newRow = {
        id: rows.length + 1,
        date: date,
        fromLocation: fromLocation,
        toLocation: toLocation,
        barcode: empbarcode,
        status: status,
      };
      setRows([...rows, newRow]);

      // Clear form fields except date
      setFromLocation('');
      setToLocation('');
      setBarcode('');
      setStatus('');
    }
  };

  const handleDownloadPDF = () => {
    // Implement the logic to download the data as PDF
    console.log("Download PDF");
  };

  const handleDownloadExcel = () => {
    // Implement the logic to download the data as Excel
    console.log("Download Excel");
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: t('Home.label.date'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'fromLocation', headerName: t('Home.label.fromLocation'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'toLocation', headerName: t('Home.label.toLocation'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'barcode', headerName: t('Home.label.barcode'), width: 150, headerClassName: 'data-grid-header' },
    { field: 'status', headerName: t('Home.label.status'), width: 150, headerClassName: 'data-grid-header' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Grid item xs={12} container alignItems="center" justifyContent="left" style={{ flexShrink: 0, marginTop: 5 }}>
        <Typography variant="h6" component="h4" gutterBottom style={{ color: '#bf40bf' }}>
          <TbReportSearch /> / {t("reports.title.reports")}
        </Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center" justifyContent="center" style={{ flexShrink: 0, width: '100%', margin: '0 auto' }}>
        <Paper elevation={0} style={{ padding: 10, width: '100%', marginTop: 20, border: 'none' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item xs={12} container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <TextField
                    label={t("reports.label.date")}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={2}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>{t("reports.label.fromLocation")}</InputLabel>
                    <Select
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      label={t("reports.label.fromLocation")}
                    >
                      <MenuItem value="APH">APH</MenuItem>
                      <MenuItem value="APH2">APH2</MenuItem>
                      <MenuItem value="APH3">APH3</MenuItem>
                      <MenuItem value="Apex">Apex</MenuItem>
                      <MenuItem value="Maxking">Maxking</MenuItem>
                      <MenuItem value="APC">APC</MenuItem>
                      <MenuItem value="Camphor">Camphor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={2}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>{t("reports.label.toLocation")}</InputLabel>
                    <Select
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      label={t("reports.label.toLocation")}
                    >
                      <MenuItem value="APH">APH</MenuItem>
                      <MenuItem value="APH2">APH2</MenuItem>
                      <MenuItem value="APH3">APH3</MenuItem>
                      <MenuItem value="Apex">Apex</MenuItem>
                      <MenuItem value="Maxking">Maxking</MenuItem>
                      <MenuItem value="APC">APC</MenuItem>
                      <MenuItem value="Camphor">Camphor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    label={t("reports.label.barcode")}
                    value={empbarcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    placeholder={t("reports.placeholder.barcode")}
                  />
                </Grid>

                <Grid item xs={2}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>{t("reports.label.status")}</InputLabel>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      label={t("reports.label.status")}
                    >
                      <MenuItem value="in">In</MenuItem>
                      <MenuItem value="out">Out</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={1.5} >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                  >
                    {t("reports.button.submit")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <div>
      
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: 20 }}>
          <Grid item>
            <Button
              variant="outlined"
              color="success"
              startIcon={<IoMdDownload />}
              onClick={handleDownloadExcel}
              style={{ marginRight: 10 }}
            >
              {t("reports.button.Excel")}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<FaFileDownload />}
              onClick={handleDownloadPDF}
            >
              {t("reports.button.Pdf")}
            </Button>
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Search" variant="standard" style={{color:'#cc00cc'}}/>
          </Grid>
        </Grid>
      </div>
      <div style={{ flexGrow: 1, width: '100%', marginTop: 10 }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Reports;

