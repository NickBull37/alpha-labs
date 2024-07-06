import React, { useState, useEffect } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Button } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Navbar, BillingHistoryTable } from '../../../components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PageContainer = styled(Stack)(() => ({
    // Your styles here
}));

const StyledAccordion = styled(Accordion)(() => ({
    maxWidth: '800px',
    backgroundColor: '#3f3f46',
    color: '#fff',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
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

const BillingHistory = () => {

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
        GetBillingHistory();
    }, []);

    // API Calls
    async function GetBillingHistory() {
        try {
            // Get billing history
            const response = await axios.get("https://localhost:44379/Bill/get-billing-history");
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
                currentPage={"BILLS"}
                navLinks={navLinks}
                linkClassName={"progress-p-blue-grad"}
            />
            <Stack
                display="flex"
                alignItems="center"
                sx={{
                    mt: 10
                }}
            >
                {historyRecords.map((record) => (
                    <Box key={record.id}>
                        {record.id === 1 ? (
                            <StyledAccordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography className='progress-h5-blue-grad'>
                                        {record.month} {record.year}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <BillingHistoryTable historyRecord={record} />
                                </AccordionDetails>
                            </StyledAccordion>
                        ) : (
                            <StyledAccordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography className='progress-h5-pink-grad'>
                                        {record.month} {record.year}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <BillingHistoryTable historyRecord={record} />
                                </AccordionDetails>
                            </StyledAccordion>
                        )}
                    </Box>
                ))}
            </Stack>
        </PageContainer>
    );
}

export default BillingHistory;
