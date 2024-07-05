import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Stack, Alert, Snackbar, Typography } from '@mui/material';
import { Navbar, BillDetails, BillButtonSet, BillsTable } from '../../../components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Bills = () => {

    // Constants
    const navLinks = [
        {
            index: 1,
            label: 'DASHBOARD',
            link: '/budget-dashboard'
        },
        {
            index: 2,
            label: 'PURCHASES',
            link: '/budget-purchases'
        },
        {
            index: 3,
            label: 'BILLS',
            link: '/budget-bills'
        },
        {
            index: 4,
            label: 'SAVINGS',
            link: '/budget-savings'
        },
    ];

    // State variables
    const [successState, setSuccessState] = useState('');
    const [errorState, setErrorState] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);

    const [hasUnbatchedBills, setHasUnbatchedBills] = useState(false);
    const [billingTotal, setBillingTotal] = useState(0);
    const [billsCount, setBillsCount] = useState(0);
    const [billsPaidCount, setBillsPaidCount] = useState(0);
    const [bills, setBills] = useState([]);

    // Event Handlers
    const handleSuccessClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccessOpen(false);
    };
    const handleFailureClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setFailureOpen(false);
    };

    // Use Effects
    // useEffect(() => {
    //     GetBillReport();
    // }, [successState]);

    useEffect(() => {
        if (successState !== '')
        {
            setSuccessOpen(true);
        }
        GetBillReport();
        setSuccessState(''); // error here
    }, [successState]);

    useEffect(() => {
        if (errorState !== '')
        {
            setFailureOpen(true);
        }
    }, [errorState]);

    // API Calls
    async function GetBillReport() {
        try {
            // Get bill report data
            const response = await axios.get("https://localhost:44379/Bill/report");

            if (response.status === 200) {
                setHasUnbatchedBills(response.data.hasUnbatchedBills);
                setBillingTotal(response.data.billingTotal);
                setBillsCount(response.data.billsCount);
                setBillsPaidCount(response.data.billsPaidCount);
                setBills(response.data.billingList)
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Stack>
            <Navbar
                appName={"BullsBudget"}
                currentPage={"BILLS"}
                navLinks={navLinks}
                linkClassName={"progress-p-blue-grad"}
            />
            <Box
                className="dash-link"
                display="flex"
                justifyContent="flex-end"
                sx={{
                    pr: 6,
                    pt: 4,
                }}
            >
                <Link className='bill-link' to="/budget-billing-history">
                    <Typography className='no-deco'>View Billing History</Typography>
                </Link>
                <Link className='bill-link' to="/budget-billing-history">
                    <ArrowForwardIosIcon />
                </Link>
            </Box>
            <Box display="flex" justifyContent="center">
                <Stack className="container">
                    <BillDetails />
                    <BillButtonSet
                        setSuccessState={setSuccessState}
                        setErrorState={setErrorState}
                        billingTotal={billingTotal}
                        billsCount={billsCount}
                        billsPaidCount={billsPaidCount}
                    />
                    <BillsTable
                        hasUnbatchedBills={hasUnbatchedBills}
                        bills={bills}
                        setSuccessState={setSuccessState}
                        setErrorState={setErrorState}
                    />
                </Stack>
            </Box>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {successState}
                </Alert>
            </Snackbar>
            <Snackbar open={failureOpen} autoHideDuration={6000} onClose={handleFailureClose}>
                <Alert
                    onClose={handleFailureClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    ERROR: {errorState}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default Bills;