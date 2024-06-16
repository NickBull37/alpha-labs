import React from 'react';
import axios from "axios";
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
    const [monthlyIncomeTotal, setMonthlyIncomeTotal] = useState(0);
    const [currentMonthlySavings, setCurrentMonthlySavings] = useState(0);

    // Purchase state variables
    const [entertainmentSpending, setEntertainmentSpending] = useState(0);
    const [entertainmentPercentage, setEntertainmentPercentage] = useState(0);
    const [foodSpending, setFoodSpending] = useState(0);
    const [foodPercentage, setFoodPercentage] = useState(0);
    const [housingSpending, setHousingSpending] = useState(0);
    const [housingPercentage, setHousingPercentage] = useState(0);
    const [miscSpending, setMiscSpending] = useState(0);
    const [miscPercentage, setMiscPercentage] = useState(0);

    // Bill state variables
    const [businessBillsAmount, setBusinessBillsAmount] = useState(0);
    const [businessBillsPercentage, setBusinessBillsPercentage] = useState(0);
    const [entertainmentBillsAmount, setEntertainmentBillsAmount] = useState(0);
    const [entertainmentBillsPercentage, setEntertainmentBillsPercentage] = useState(0);
    const [housingBillsAmount, setHousingBillsAmount] = useState(0);
    const [housingBillsPercentage, setHousingBillsPercentage] = useState(0);
    const [miscBillsAmount, setMiscBillsAmount] = useState(0);
    const [miscBillsPercentage, setMiscBillsPercentage] = useState(0);

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
            const response = await axios.get("https://localhost:7295/Dashboard/report");

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
                setMonthlyIncomeTotal(response.data.dashboardNodes.monthlyIncomeTotal);
                setCurrentMonthlySavings(response.data.dashboardNodes.currentMonthlySavings);

                // Purchases
                setEntertainmentSpending(response.data.purchaseNodes.totalEntertainmentSpending);
                setEntertainmentPercentage(response.data.purchaseNodes.totalEntertainmentPercentage);
                setFoodSpending(response.data.purchaseNodes.totalFoodSpending);
                setFoodPercentage(response.data.purchaseNodes.totalFoodPercentage);
                setHousingSpending(response.data.purchaseNodes.totalHousingSpending);
                setHousingPercentage(response.data.purchaseNodes.totalHousingPercentage);
                setMiscSpending(response.data.purchaseNodes.totalMiscSpending);
                setMiscPercentage(response.data.purchaseNodes.totalMiscPercentage);

                // Bills
                setBusinessBillsAmount(response.data.billingNodes.businessBillsAmount);
                setBusinessBillsPercentage(response.data.billingNodes.businessBillsPercentage);
                setEntertainmentBillsAmount(response.data.billingNodes.entertainmentBillsAmount);
                setEntertainmentBillsPercentage(response.data.billingNodes.entertainmentBillsPercentage);
                setHousingBillsAmount(response.data.billingNodes.housingBillsAmount);
                setHousingBillsPercentage(response.data.billingNodes.housingBillsPercentage);
                setMiscBillsAmount(response.data.billingNodes.miscBillsAmount);
                setMiscBillsPercentage(response.data.billingNodes.miscBillsPercentage);
                setFunds(response.data.fundList);
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
                backgroundColor: 'rgba(126, 34, 206, 0.1)'
            }}
        >
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
                                pt: 1,
                                color: '#9e50e2'
                            }}
                        >
                            ${monthlyPurchaseTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                    </Box>
                </Stack>
            </StyledPaper>
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
                                pt: 1,
                                color: '#9e50e2'
                            }}
                        >
                            ${monthlyBillingTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                    </Box>
                </Stack>
            </StyledPaper>
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
                        <span className="color-gray200">Paychecks Received</span>&nbsp;&nbsp;<span className="body1">{paycheckCount}/{paycheckTemplateCount}</span>
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="baseline">
                        <Typography className="num-text-bold"
                            sx={{
                                pt: 1,
                                color: '#9e50e2'
                            }}
                        >
                            ${monthlyIncomeTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                    </Box>
                </Stack>
            </StyledPaper>
            <StyledPaper elevation={8}
                sx={{
                    pt: 1,
                    pb: 2,
                    px: 2,
                }}
            >
                <Stack display="flex" justifyContent="space-between" sx={{ height: '100%' }}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography className="sec-header3">
                            Savings
                        </Typography>
                        <Tooltip title="The amount left over for saving. Calculated by TotalMonthlyIncome - MonthlyPurchases - MonthlyBilling. Click the savings value to deposit into available funds. A savings report must be generated before savings can be dispersed.">
                            <InfoOutlinedIcon fontSize='small' />
                        </Tooltip>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="baseline">
                        <Box className="savings-highlight">
                            <Typography className="num-text-bold"
                                sx={{
                                    color: '#00b33c',
                                    py: 0.5,
                                    px: 1.5,
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
                    </Box>
                </Stack>
            </StyledPaper>
        </Box>
    );
}

export default DashboardDetails;