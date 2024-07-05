import React from 'react';
import { Box, Stack, Typography, } from '@mui/material';
import { Navbar, DashboardDetails, PurchaseDetails, BillDetails, SavingsDetails } from '../../../components';

const BudgetDashboard = () => {

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

    return (
        <>
            <Navbar
                appName={"BullsBudget"}
                currentPage={"DASHBOARD"}
                navLinks={navLinks}
                linkClassName={"progress-p-purple-grad"}
            />
            <Box
                display="flex"
                justifyContent="center"
                mt={6}
                mb={12}
            >
                <Stack className="container" gap={4}>
                    <Stack>
                        <Typography className="sec-header4">
                            Dashboard
                        </Typography>
                        <DashboardDetails />
                    </Stack>
                    <Stack>
                        <Typography className="sec-header4">
                            Purchases
                        </Typography>
                        <PurchaseDetails />
                    </Stack>
                    <Stack>
                        <Typography className="sec-header4">
                            Bills
                        </Typography>
                        <BillDetails />
                    </Stack>
                    <Stack>
                        <Typography className="sec-header4">
                            Savings
                        </Typography>
                        <SavingsDetails />
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default BudgetDashboard;