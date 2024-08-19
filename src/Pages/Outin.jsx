

import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GetEmployeeData, UpdateEmpStatus } from '../api/outin';
import { useTranslation } from 'react-i18next';
import { FaPersonWalking } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import EditModal from '../components/EditModal';

const Outin = () => {
    const { t } = useTranslation();
    const [rows, setRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editedRows, setEditedRows] = useState(new Set());
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        toast.info("Welcome to the Employee Exit Page!");
        const fetchData = async () => {
            const data = await GetEmployeeData();
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
                outTime: item.IN_OUT_DT
            }));
            setRows(mappedData);
        };

        fetchData();
    }, []);

    const editRecord = (row) => {
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
    // const handleSuccessfulEdit = (id) => {
    //     setEditedRows(new Set(editedRows).add(id));
    //     setButtonDisabled(false);
    //     setRows(rows.filter(row => row.id !== id));

    // };
    const handleSuccessfulEdit = (id) => {
        // Use the previous state to avoid potential issues with stale state
        setEditedRows(prevEditedRows => {
            const newEditedRows = new Set(prevEditedRows);
            newEditedRows.add(id);
            return newEditedRows;
        });
    
        setButtonDisabled(false);
    
        // Filter out the row with the matching id
        setRows(prevRows => prevRows.filter(row => row.id !== id));
    };
    

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'date', headerName: t('Outin.label.date'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'fromLocation', headerName: t('Outin.label.fromLocation'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'toLocation', headerName: t('Outin.label.toLocation'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'barcode', headerName: t('Outin.label.barcode'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'employeeName', headerName: t('Outin.label.employeeName'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'department', headerName: t('Outin.label.department'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'position', headerName: t('Outin.label.position'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'status', headerName: t('Outin.label.status'), width: 150, headerClassName: 'data-grid-header' },
        { field: 'outTime', headerName: t('Outin.label.outTime'), width: 150, headerClassName: 'data-grid-header' },
        {
            field: 'actions',
            headerName: t('Outin.label.actions'),
            width: 150,
            headerClassName: 'data-grid-header',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editRecord(params.row)}
                    // disabled={editedRows.has(params.row.id)}
                    disabled={!isButtonDisabled}
                >
                    {t('Outin.label.edit')}
                </Button>
            ),
        },
    ];

    return (
        <Container>
            <ToastContainer theme="colored" position="top-center" autoClose={1200} pauseOnHover />
            <Typography variant="h6" gutterBottom style={{ color: '#bf40bf' }}>
                <FaPersonWalking /> / {t('Outin.title')}
            </Typography>
            <Paper elevation={3} sx={{ width: '100%', padding: 2 }}>
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
            <EditModal open={isModalOpen} onClose={handleCloseModal} row={selectedRow} onSuccessfulEdit={handleSuccessfulEdit}/>
        </Container>
    );
};

export default Outin;
