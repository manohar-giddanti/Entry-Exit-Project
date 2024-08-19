import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, MenuItem, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import {SendReasonDataToAPI,SendNormalDataToAPI} from '../api/outin';
import { useTranslation } from 'react-i18next';

const EditModal = ({ open, onClose, row, onSuccessfulEdit}) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        id: '',
        date: '',
        fromLocation: '',
        toLocation: '',
        barcode: '',
        employeeName: '',
        department: '',
        position: '',
        status: '',
        outTime: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const [reason, setReason] = useState('');
    const [showReason, setShowReason] = useState(false);

    useEffect(() => {
        if (row) {
            setFormData({
                fromLocation: row.fromLocation,
                toLocation: row.toLocation,
                barcode: row.barcode,
                employeeName: row.employeeName,
                department: row.department,
                position: row.position,
                status: row.status,
                outTime: row.outTime
            });
        }
    }, [row]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    };

    const handleSave = async () => {
        debugger;
        const outTimeDate = new Date(formData.outTime);
        const currentTime = new Date();

        const timeDifference = (currentTime - outTimeDate) / 1000 / 60; // difference in minutes

        if (timeDifference < 20) {
            setSnackbar({
                open: true,
                message: 'OK',
                severity: 'success'
            });
            setShowReason(false); // Hide the reason input
           await sendDataToAPI(); // Send data to API
            onClose(); // Close the dialog
           // toast.success("submit");
           onSuccessfulEdit(formData.id); // Call the callback to disable the button
        } else {
            if (reason.trim() === '') {
                setSnackbar({
                    open: true,
                    message: 'Please provide a reason for late coming',
                    severity: 'error'
                });
                setShowReason(true); // Show the reason input
                return;
            }
            setSnackbar({
                open: true,
                message: 'Late coming',
                severity: 'error'
            });
            await sendDataToAPI(); // Send data to API
            onClose(); // Close the dialog
           // toast.success("submit");
           onSuccessfulEdit(formData.id); // Call the callback to disable the button
        }
    };


    const sendDataToAPI = async () => {
        debugger;
        const reasonforlate=reason.trim();
        if(reasonforlate){
            const reasondata=await SendReasonDataToAPI(formData,reasonforlate);
        }
        else{
            const normaldata=await SendNormalDataToAPI(formData);
            debugger;
      console.log(normaldata);
      if (normaldata === "Success") {  
        toast.success("Data submitted successfully");
        
        

      } 
      if(normaldata === "Fail"){
        toast.error("Data submission failed");
      }
      if(normaldata === "") {
        toast.error("DataBase error occured");
      }
        }
        
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('Editmodel.title')}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="fromLocation"
                            label="From Location"
                            type="text"
                            fullWidth
                            value={formData.fromLocation}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="toLocation"
                            label="To Location"
                            type="text"
                            fullWidth
                            value={formData.toLocation}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="barcode"
                            label="Barcode"
                            type="text"
                            fullWidth
                            value={formData.barcode}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="employeeName"
                            label="Employee Name"
                            type="text"
                            fullWidth
                            value={formData.employeeName}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="department"
                            label="Department"
                            type="text"
                            fullWidth
                            value={formData.department}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="position"
                            label="Position"
                            type="text"
                            fullWidth
                            value={formData.position}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="outTime"
                            label="Out Time"
                            type="text"
                            fullWidth
                            value={formData.outTime}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="status"
                            label="Status"
                            select
                            fullWidth
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="in">in</MenuItem>
                            <MenuItem value="out">out</MenuItem>
                            
                           
                        </TextField>
                    </Grid>
                    {showReason && (
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                name="reason"
                                label="Reason for Late Coming"
                                type="text"
                                fullWidth
                                value={reason}
                                onChange={handleReasonChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">{t('Editmodel.btn.close')}</Button>
                <Button onClick={handleSave} color="primary">{t('Editmodel.btn.save')}</Button>
            </DialogActions>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default EditModal;







