

import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GetInEmployeeData} from '../api/inout';
import { useTranslation } from 'react-i18next';
import { GiEntryDoor } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import EditModal2 from '../components/EditModel2';
const Inout = () => {
    const { t } = useTranslation();
    const [rows, setRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editedRows, setEditedRows] = useState(new Set());
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        toast.info("Welcome to the Employee Entry Page!");
        debugger;
        const fetchData = async () => {
            debugger;
            const data = await GetInEmployeeData();

            const mappedData = data.map((item, index) => ({
                id: index + 1,
                date: item.RECORD_DATE,
                fromLocation: item.FROM_LOCATION,
                toLocation: item.TO_LOCATION,
                barcode: item.EMP_BARCODE,
                employeeName: item.EMPLOYEE_NAME,
                department: item.DEPARTMENT,
                position: item.POSITION,
                status: item.STATUS,
                inTime: item.IN_OUT_DT
               // outTime: item.IN_OUT_DT
            }));

            setRows(mappedData);
        };

        fetchData();
    }, []);

    const editRecord = async (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
        setButtonDisabled(false);
    
      
    };
    const handleCloseModal = (updatedRow) => {
        setIsModalOpen(false);
        if (updatedRow) {
            setEditedRows(new Set(editedRows).add(updatedRow.id));
           //setSelectedRow.isButtonDisabled(false);
           setButtonDisabled(true);
            
            
        }
        setSelectedRow(null);
    };
    const handleSuccessfulEdit = (id) => {
        setEditedRows(new Set(editedRows).add(id));
        setButtonDisabled(false);

    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'date', headerName: t('Inout.label.date'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'fromLocation', headerName: t('Inout.label.fromLocation'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'toLocation', headerName: t('Inout.label.toLocation'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'barcode', headerName: t('Inout.label.barcode'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'employeeName', headerName: t('Inout.label.employeeName'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'department', headerName: t('Inout.label.department'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'position', headerName: t('Inout.label.position'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'status', headerName: t('Inout.label.status'), width: 150, headerClassName: 'data-grid-header' },
         { field: 'inTime', headerName: t('Inout.label.inTime'), width: 150, headerClassName: 'data-grid-header' },
        //{ field: 'outTime', headerName: t('Inout.label.outTime'), width: 150, headerClassName: 'data-grid-header' },
        {
            field: 'actions',
            headerName: t('Inout.label.actions'),
            width: 150,
            headerClassName: 'data-grid-header',
            renderCell: (params) => (
                <Button variant="contained" color="primary" onClick={() => editRecord(params.row)} disabled={!isButtonDisabled}>
                    {t('Outin.label.edit')}
                </Button>
            ),
        },
    ];

    return (
        
        <Container>
             <ToastContainer theme="colored"  
        position="top-center"   
        autoClose={1200}    
        pauseOnHover/>
            <Typography variant="h6" gutterBottom style={{ color: '#bf40bf' }}>
            <GiEntryDoor /> / {t('Inout.title')}
            </Typography>
            <Paper elevation={1} sx={{ width: '100%', padding: 2 }}>
           
                <div style={{ height: 400, width: '100%', marginTop: 16 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </Paper>
            <EditModal2 open={isModalOpen} onClose={handleCloseModal} row={selectedRow} onSuccessfulEdit={handleSuccessfulEdit}/>
        </Container>
    );
};

export default Inout;



