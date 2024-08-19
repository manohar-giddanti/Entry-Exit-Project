

import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { SendDataToAPI } from '../api/inout';

const EditModal2 = ({ open, onClose, row, onSuccessfulEdit }) => {
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

    

    const handleSave = async () => {
        debugger;
        const fromloc=formData.fromLocation;
        const toloc=formData.toLocation;
        const empid=formData.barcode;
        const empname=formData.employeeName;
        const dept=formData.department;
        const role=formData.position;
       const state=formData.status;
       if(state==='out'){
        const data=await SendDataToAPI(fromloc,toloc,empid,empname,dept,role,state);
        if(data==='success'){
            toast.success('Data submitted Success');
        }
        if(data==='Fail'){
            toast.error('Data submit is failed');
        }
        if(data==='SqlError'){
            toast.error('Data submit is failed due to DB error');
        }
       }
       else{
            toast.warn('The employee already is IN');
       }


      
    };

    
   

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('Editmodel.title')}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {formData.status === 'out' ? (
                            <TextField
                                margin="dense"
                                name="fromLocation"
                                label="From Location"
                                select
                                fullWidth
                                value={formData.fromLocation}
                                onChange={handleChange}
                            >
                                  <MenuItem value="APH">APH</MenuItem>
                    <MenuItem value="APH2">APH2</MenuItem>
                    <MenuItem value="APH3">APH3</MenuItem>
                    <MenuItem value="Apex">Apex</MenuItem>
                    <MenuItem value="Maxking">Maxking</MenuItem>
                    <MenuItem value="APC">APC</MenuItem>
                    <MenuItem value="Camphor">Camphor</MenuItem>
                            </TextField>
                        ) : (
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
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        {formData.status === 'out' ? (
                            <TextField
                                margin="dense"
                                name="toLocation"
                                label="To Location"
                                select
                                fullWidth
                                value={formData.toLocation}
                                onChange={handleChange}
                            >
                                 <MenuItem value="APH">APH</MenuItem>
                                  <MenuItem value="APH2">APH2</MenuItem>
                                  <MenuItem value="APH3">APH3</MenuItem>
                
                            </TextField>
                        ) : (
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
                        )}
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
                   
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">{t('Editmodel.btn.close')}</Button>
                <Button onClick={handleSave} color="primary">{t('Editmodel.btn.save')}</Button>
            </DialogActions>
           
        </Dialog>
    );
};

export default EditModal2;
