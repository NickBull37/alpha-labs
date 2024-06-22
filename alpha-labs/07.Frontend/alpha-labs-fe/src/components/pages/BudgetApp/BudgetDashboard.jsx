import React from 'react';
import { Box, Stack, Typography, } from '@mui/material';
import { DashboardHeader, DashboardDetails, PurchaseDetails, BillDetails, SavingsDetails } from '../../../components';

const BudgetDashboard = () => {
    return (
        <>
            <DashboardHeader/>
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