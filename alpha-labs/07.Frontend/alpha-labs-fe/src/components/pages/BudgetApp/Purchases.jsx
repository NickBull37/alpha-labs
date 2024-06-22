import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Box, Stack, Alert, Snackbar, Divider, Typography } from '@mui/material';
import { PurchaseHeader, PrevPurchaseDetails, PurchaseDetails, PurchaseButtonSet, PurchasesTable } from '../../../components';

const Purchases = () => {

    // Constants
    const [successState, setSuccessState] = useState('');
    const [errorState, setErrorState] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);

    // State variables
    const [purchaseTotal, setPurchaseTotal] = useState(0);
    const [luxuryPurchaseTotal, setLuxuryPurchaseTotal] = useState(0);
    const [luxuryPurchaseLimit, setLuxuryPurchaseLimit] = useState(0);
    const [necessityPurchaseTotal, setNecessityPurchaseTotal] = useState(0);
    const [purchases, setPurchases] = useState([]);

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
        if (!successOpen) {
            setSuccessState('');
        }
    }, [successOpen]);

    useEffect(() => {
        if (successState !== '')
        {
            console.log("Setting snackbar open.");
            console.log("Success State: " + successState);
            setSuccessOpen(true);
        }
        GetPurchaseReport();
    }, [successState]);

    useEffect(() => {
        if (errorState !== '')
        {
            setFailureOpen(true);
        }
    }, [errorState]);

    // API Calls
    async function GetPurchaseReport() {
        try {
            // Get purchase report data
            const response = await axios.get("https://localhost:44379/Purchase/report");

            if (response.status === 200) {
                setPurchaseTotal(response.data.purchaseTotal);
                setLuxuryPurchaseTotal(response.data.luxuryPurchaseTotal);
                setLuxuryPurchaseLimit(response.data.luxuryPurchaseLimit);
                setNecessityPurchaseTotal(response.data.necessityPurchaseTotal);
                setPurchases(response.data.purchaseList);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <PurchaseHeader />
            <Box display="flex" justifyContent="center" sx={{ mt: 6 }}>
                {/* <PurchasesLeftSidebar /> */}
                <Stack className="container" gap={2}>
                    <PrevPurchaseDetails />
                    <Stack gap={0.5}>
                        <Typography textAlign="right" className="sec-header5">
                            Prev Month
                        </Typography>
                        <Divider color={"#666666"} />
                        <Typography className="sec-header5-grad">
                            Current Month
                        </Typography>
                    </Stack>
                    <PurchaseDetails />
                    <PurchaseButtonSet
                        purchaseTotal={purchaseTotal}
                        luxuryPurchaseTotal={luxuryPurchaseTotal}
                        luxuryPurchaseLimit={luxuryPurchaseLimit}
                        necessityPurchaseTotal={necessityPurchaseTotal}
                        setSuccessState={setSuccessState}
                        setErrorState={setErrorState}
                    />
                    <PurchasesTable
                        purchases={purchases}
                        setSuccessState={setSuccessState}
                        setErrorState={setErrorState}
                    />
                </Stack>
                {/* <PurchasesRightSidebar /> */}
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

export default Purchases;