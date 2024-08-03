import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Box, Stack, Alert, Snackbar } from '@mui/material';
import { Navbar, SavingsDetails, SavingsButtonSet, SavingsTable } from '../../../components';

const Savings = () => {

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

    const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);
    const [currentMonthlySavings, setCurrentMonthlySavings] = useState(0);
    const [combinedFundTotal, setCombinedFundTotal] = useState(0);
    const [paycheckCount, setPaycheckCount] = useState(0);
    const [paycheckTemplateCount, setPaycheckTemplateCount] = useState(0);
    const [funds, setFunds] = useState([]);
    const [paychecks, setPaychecks] = useState([]);
    const [tableRecords, setTableRecords] = useState([]);

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
    useEffect(() => {
        GetFundReport();
    }, [successState]);

    useEffect(() => {
        if (successState !== '')
        {
            setSuccessOpen(true);
        }
    }, [successState]);

    useEffect(() => {
        if (errorState !== '')
        {
            setFailureOpen(true);
        }
    }, [errorState]);

    // API Calls
    async function GetFundReport() {
        try {
            // Get fund report data
            const response = await axios.get("https://localhost:44379/Fund/report");

            if (response.status === 200) {
                setTotalMonthlyIncome(response.data.totalMonthlyIncome);
                setCurrentMonthlySavings(response.data.currentMonthlySavings);
                setCombinedFundTotal(response.data.combinedFundTotal);
                setPaycheckCount(response.data.paycheckCount);
                setPaycheckTemplateCount(response.data.paycheckTemplateCount);
                setFunds(response.data.fundList);
                // setPaychecks(response.data.paycheckList);
                setTableRecords(response.data.tableRecords)
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <Navbar
                appName={"BullsBudget"}
                currentPage={"SAVINGS"}
                navLinks={navLinks}
                linkClassName={"progress-p-green-grad"}
            />
            <Box
                display="flex"
                justifyContent="center"
                sx={{
                    pt: 16
                }}
            >
                <Stack className="container">
                    <SavingsDetails />
                    <SavingsButtonSet
                        paycheckCount={paycheckCount}
                        paycheckTemplateCount={paycheckTemplateCount}
                        totalMonthlyIncome={totalMonthlyIncome}
                        currentMonthlySavings={currentMonthlySavings}
                        setSuccessState={setSuccessState}
                        setErrorState={setErrorState}
                    />
                    <SavingsTable
                        funds={funds}
                        tableRecords={tableRecords}
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
        </>
    );
}

export default Savings;