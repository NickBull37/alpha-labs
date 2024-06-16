import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, Typography, } from '@mui/material';

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#3f3f46',
    color: '#fff',
    minWidth: '190px'
}));

const BillDetails = () => {

    // State variables
    const [businessBillsAmount, setBusinessBillsAmount] = useState(0);
    const [businessBillsPercentage, setBusinessBillsPercentage] = useState(0);
    const [carBillsAmount, setCarBillsAmount] = useState(0);
    const [carBillsPercentage, setCarBillsPercentage] = useState(0);
    const [entertainmentBillsAmount, setEntertainmentBillsAmount] = useState(0);
    const [entertainmentBillsPercentage, setEntertainmentBillsPercentage] = useState(0);
    const [housingBillsAmount, setHousingBillsAmount] = useState(0);
    const [housingBillsPercentage, setHousingBillsPercentage] = useState(0);
    const [webDevBillsAmount, setWebDevBillsAmount] = useState(0);
    const [webDevBillsPercentage, setWebDevBillsPercentage] = useState(0);

    // Use Effects
    useEffect(() => {
        GetBillingNodes();
    }, []);

    // API Calls
    async function GetBillingNodes() {
        try {
            // Get purchase nodes data
            const response = await axios.get("https://localhost:7295/Bills/nodes");

            if (response.status === 200) {
                setBusinessBillsAmount(response.data.businessBillsAmount);
                setBusinessBillsPercentage(response.data.businessBillsPercentage);
                setCarBillsAmount(response.data.carBillsAmount);
                setCarBillsPercentage(response.data.carBillsPercentage);
                setEntertainmentBillsAmount(response.data.entertainmentBillsAmount);
                setEntertainmentBillsPercentage(response.data.entertainmentBillsPercentage);
                setHousingBillsAmount(response.data.housingBillsAmount);
                setHousingBillsPercentage(response.data.housingBillsPercentage);
                setWebDevBillsAmount(response.data.webDevBillsAmount);
                setWebDevBillsPercentage(response.data.webDevBillsPercentage);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Box display="flex" justifyContent="space-evenly" gap={6}
            sx={{
                p: 2,
                border: '2px solid #1976d2',
                borderRadius: '5px',
                backgroundColor: 'rgba(25, 118, 210, 0.1)'
            }}
        >
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Automotive
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">
                            Total
                        </span>&nbsp;&nbsp;
                        <span className="body1">
                            ${carBillsAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#1976d2'
                        }}
                    >
                        {carBillsPercentage > 0 ? (
                            <span>{carBillsPercentage}%</span>
                        ) : carBillsPercentage === 0 && carBillsAmount > 0 ? (
                            <span>&lt;1%</span>
                        ) : (
                            <span>0%</span>
                        )}
                    </Typography>
                </Stack>
            </StyledPaper>
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Entertainment
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">Total</span>&nbsp;&nbsp;
                        <span className="body1">
                            ${entertainmentBillsAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#1976d2'
                        }}
                    >
                        {entertainmentBillsPercentage > 0 ? (
                            <span>{entertainmentBillsPercentage}%</span>
                        ) : entertainmentBillsPercentage === 0 && entertainmentBillsAmount > 0 ? (
                            <span>&lt;1%</span>
                        ) : (
                            <span>0%</span>
                        )}
                    </Typography>
                </Stack>
            </StyledPaper>
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Housing
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">Total</span>&nbsp;&nbsp;
                        <span className="body1">
                            ${housingBillsAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#1976d2'
                        }}
                    >
                        {housingBillsPercentage > 0 ? (
                            <span>{housingBillsPercentage}%</span>
                        ) : housingBillsPercentage === 0 && housingBillsAmount > 0 ? (
                            <span>&lt;1%</span>
                        ) : (
                            <span>0%</span>
                        )}
                    </Typography>
                </Stack>
            </StyledPaper>
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        WebDev
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">Total</span>&nbsp;&nbsp;
                        <span className="body1">
                            ${webDevBillsAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#1976d2'
                        }}
                    >
                        {webDevBillsPercentage > 0 ? (
                            <span>{webDevBillsPercentage}%</span>
                        ) : webDevBillsPercentage === 0 && webDevBillsAmount > 0 ? (
                            <span>&lt;1%</span>
                        ) : (
                            <span>0%</span>
                        )}
                    </Typography>
                </Stack>
            </StyledPaper>
        </Box>
    );
}

export default BillDetails;