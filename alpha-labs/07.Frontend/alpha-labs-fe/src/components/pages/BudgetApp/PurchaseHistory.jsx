import React, { useState, useEffect } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Button } from '@mui/material';
import { Navbar } from '../../../components';

const PageContainer = styled(Stack)(() => ({
    // Your styles here
}));

const FlexBoxBetween = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    width: '100%'
}));

const PaperRecord = styled(Paper)(() => ({
    backgroundColor: '#3f3f46',
    color: '#fff',
    minWidth: '700px',
    padding: '1rem'
}));

const ThirdTextLeft = styled(Typography)(() => ({
    textAlign: 'left',
    fontSize: '1.25rem',
    lineHeight: '1.4',
    fontWeight: '600',
    position: 'relative',
}));

const ThirdTextRight = styled(Typography)(() => ({
    textAlign: 'right',
    fontSize: '1.125rem',
    lineHeight: '1.4',
    flex: 0
}));

const GradientButton = styled(Button)(() => ({
    marginTop: 8,
    color: '#fff',
    background: 'linear-gradient(to right, #00804d, #00cc7a)',
    boxShadow: '0px 2px 10px 1px #1a1a1a',
    '&:hover': {
        boxShadow: '0px 2px 15px 2px #1a1a1a',
        background: 'linear-gradient(to right, #00663d, #00b36b)',
    },
}));

const PurchaseHistory = () => {

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
    const [historyRecords, setHistoryRecords] = useState([]);

    // Use Effects
    useEffect(() => {
        GetPurchaseHistory();
    }, []);

    // API Calls
    async function GetPurchaseHistory() {
        try {
            // Get purchase history
            const response = await axios.get("https://localhost:44379/Purchase/get-purchase-history");
            if (response.status === 200 && Array.isArray(response.data.records)) {
                setHistoryRecords(response.data.records);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <PageContainer>
            <Navbar
                appName={"BullsBudget"}
                currentPage={"PURCHASES"}
                navLinks={navLinks}
                linkClassName={"progress-p-pink-grad"}
            />
            <Stack
                display="flex"
                alignItems="center"
                gap={4}
                sx={{
                    mt: 8
                }}
            >
                {historyRecords.map((record, index) => (
                    <Stack key={index}>
                        <Typography className='progress-h5-pink-grad'
                            sx={{
                                mb: 0.5
                            }}
                        >
                            {record.month} {record.year}
                        </Typography>
                        <PaperRecord>
                            <Stack gap={0.5}>
                                {record.purchaseNodes.map((node, category) => (
                                    <FlexBoxBetween key={category}>
                                        <ThirdTextLeft>
                                            {node.category} <span className='perc-text-pink'>({node.percentage}%)</span>
                                        </ThirdTextLeft>
                                        <Typography flex={1}></Typography>
                                        <ThirdTextRight>
                                            ${node.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                        </ThirdTextRight>
                                    </FlexBoxBetween>
                                ))}
                                <Box
                                    sx={{
                                        my: 1,
                                        borderBottom: '1px solid #ff1a75'
                                    }}
                                ></Box>
                                <FlexBoxBetween>
                                    <ThirdTextLeft>
                                        Total
                                    </ThirdTextLeft>
                                    <Typography flex={1}></Typography>
                                    <ThirdTextRight
                                        sx={{
                                            py: 0.5,
                                            px: 1,
                                            color: '#fff',
                                            fontWeight: 600,
                                            bgcolor: 'rgba(255, 77, 148, 0.2)',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        ${record.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </ThirdTextRight>
                                </FlexBoxBetween>
                            </Stack>
                        </PaperRecord>
                    </Stack>
                ))}
            </Stack>
        </PageContainer>
    );
}

export default PurchaseHistory;
