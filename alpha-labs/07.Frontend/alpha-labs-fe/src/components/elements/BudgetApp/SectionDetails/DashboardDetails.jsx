import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, Typography, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#3f3f46',
    color: '#fff',
    minWidth: '190px'
}));

const DashboardDetails = () => {

    // Dashboard state variables
    const [monthlyPurchaseTotal, setMonthlyPurchaseTotal] = useState(0);
    const [luxuryPurchaseTotal, setLuxuryPurchaseTotal] = useState(0);
    const [luxuryPurchaseLimit, setLuxuryPurchaseLimit] = useState(0);
    const [billsCount, setBillsCount] = useState(0);
    const [billsPaidCount, setBillsPaidCount] = useState(0);
    const [monthlyBillingTotal, setMonthlyBillingTotal] = useState(0);
    const [paycheckCount, setPaycheckCount] = useState(0);
    const [paycheckTemplateCount, setPaycheckTemplateCount] = useState(0);
    const [monthlyDepositTotal, setMonthlyDepositTotal] = useState(0);
    const [monthlyIncomeTotal, setMonthlyIncomeTotal] = useState(0);
    const [currentMonthlySavings, setCurrentMonthlySavings] = useState(0);

    // Fund state variables
    const [funds, setFunds] = useState([]);

    // Use Effects
    useEffect(() => {
        GetDashboardReport();
    }, []);

    // API Calls
    async function GetDashboardReport() {
        try {
            // Get dashboard report data
            const response = await axios.get("https://localhost:44379/Dashboard/report");

            if (response.status === 200)
            {
                // Dashboard
                setMonthlyPurchaseTotal(response.data.dashboardNodes.monthlyPurchaseTotal);
                setLuxuryPurchaseTotal(response.data.dashboardNodes.luxuryPurchaseTotal);
                setLuxuryPurchaseLimit(response.data.dashboardNodes.luxuryPurchaseLimit);
                setBillsCount(response.data.dashboardNodes.billsCount);
                setBillsPaidCount(response.data.dashboardNodes.billsPaidCount);
                setMonthlyBillingTotal(response.data.dashboardNodes.monthlyBillingTotal);
                setPaycheckCount(response.data.dashboardNodes.paycheckCount);
                setPaycheckTemplateCount(response.data.dashboardNodes.paycheckTemplateCount);
                setMonthlyDepositTotal(response.data.dashboardNodes.monthlyDepositTotal)
                setMonthlyIncomeTotal(response.data.dashboardNodes.monthlyIncomeTotal);
                setCurrentMonthlySavings(response.data.dashboardNodes.currentMonthlySavings);
            }
        } catch (error) {
            //alert(error);
        }
    }

    return (
        <Box display="flex" justifyContent="space-evenly" gap={6}
            sx={{
                p: 2,
                border: '2px solid #7e22ce',
                borderRadius: '5px',
                backgroundColor: 'rgba(126, 34, 206, 0.1)',
            }}
        >
            {/* INCOME NODE */}
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Box display="flex" justifyContent="space-between">
                        <Typography className="sec-header3">
                            Total Income
                        </Typography>
                        <Tooltip title="The total income from the current month including paychecks and deposits. Paychecks that have not been logged for the month will be included.">
                            <InfoOutlinedIcon fontSize='small' />
                        </Tooltip>
                    </Box>
                    <Typography className="subtitle2">
                        <span className="color-gray200">Paychecks Rec.</span>&nbsp;&nbsp;<span className="body1">{paycheckCount}/{paycheckTemplateCount}</span>
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="baseline">
                        <Typography className="num-text-bold"
                            sx={{
                                pt: 2,
                                color: '#9e50e2'
                            }}
                        >
                            ${monthlyIncomeTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                    </Box>
                </Stack>
            </StyledPaper>
            {/* PURCHASE NODE */}
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Box display="flex" justifyContent="space-between">
                        <Typography className="sec-header3">
                            Purchases
                        </Typography>
                        <Tooltip title="The total sum of all purchases (luxuries & necessities) made in the current month.">
                            <InfoOutlinedIcon fontSize='small' />
                        </Tooltip>
                    </Box>
                    <Typography className="subtitle2">
                        <span className="color-gray200">Luxury Total</span>&nbsp;&nbsp;<span className="body1">${luxuryPurchaseTotal}</span>
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="baseline">
                        <Typography className="num-text-bold"
                            sx={{
                                pt: 2,
                                color: '#9e50e2'
                            }}
                        >
                            ${monthlyPurchaseTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                    </Box>
                </Stack>
            </StyledPaper>
            {/* BILLING NODE */}
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Box display="flex" justifyContent="space-between">
                        <Typography className="sec-header3">
                            Billing
                        </Typography>
                        <Tooltip title="The total sum of all bills (paid & un-paid) due in the current month.">
                            <InfoOutlinedIcon fontSize='small' />
                        </Tooltip>
                    </Box>
                    <Typography className="subtitle2">
                        <span className="color-gray200">Bills Paid</span>&nbsp;&nbsp;<span className="body1">{billsPaidCount}/{billsCount}</span>
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="baseline">
                        <Typography className="num-text-bold"
                            sx={{
                                pt: 2,
                                color: '#9e50e2'
                            }}
                        >
                            ${monthlyBillingTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                    </Box>
                </Stack>
            </StyledPaper>
            {/* SAVINGS NODE */}
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack display="flex" justifyContent="space-between" sx={{ height: '100%' }}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography className="sec-header3">
                            Savings
                        </Typography>
                        <Tooltip title="The amount left over for saving. Calculated by TotalMonthlyIncome - MonthlyPurchases - MonthlyBilling - the sum of all fund deposits already made this month. Click the savings value to deposit into available funds. A savings report must be generated before savings can be dispersed.">
                            <InfoOutlinedIcon fontSize='small' />
                        </Tooltip>
                    </Box>
                    <Typography className="subtitle2">
                        <span className="color-gray200">Deposited</span>&nbsp;&nbsp;<span className="body1">${monthlyDepositTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="baseline">
                        <Link to="/budget-deposit">
                            <Box>
                                <Typography className="num-text-bold"
                                    sx={{
                                        mt: 2,
                                        px: 1,
                                        color: '#00cc7a',
                                        border: '1px solid #333333',
                                        borderRadius: '5px',
                                        backgroundColor: '#595959',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            bgcolor: '#4d4d4d',
                                            boxShadow: '0px 2px 5px 0px #1a1a1a'
                                        },
                                    }}
                                >
                                    ${currentMonthlySavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                </Stack>
            </StyledPaper>
        </Box>
    );
}

export default DashboardDetails;