import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, Typography, TextField, InputAdornment, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LandingHeader } from './../../../components';
import { useForm } from 'react-hook-form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const StyledTextField = styled(TextField)({
    maxWidth: '120px',
    '& .MuiInputBase-input': {
        color: '#fff'
    },
    '& label': {
        color: '#fff',
    },
    '& label.Mui-focused': {
        color: '#00cc7a',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#00cc7a',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#00cc7a',
        },
    },
});

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#3f3f46',
    color: '#fff',
    minWidth: '230px'
}));

const GradientButton = styled(Button)(() => ({
    marginTop: 8,
    color: '#fff',
    background: 'linear-gradient(to right, #00804d, #00cc7a)',
    boxShadow: '0px 2px 10px 1px #1a1a1a',
    backgroundColor: '#7e22ce',
    '&:hover': {
        boxShadow: '0px 2px 15px 2px #1a1a1a',
        background: 'linear-gradient(to right, #00663d, #00b36b)',
    },
}));

const DepositFunds = () => {

    // Constants
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State variables
    const [monthlySavings, setMonthlySavings] = useState(0);
    const [funds, setFunds] = useState([]);
    const [fundUpdates, setFundUpdates] = useState([]);
    const [hasNegativeAmount, setHasNegativeAmount] = useState(false);

    // Event Handlers
    const handleDepositEntered = (id) => (event) => {

        const depositAmount = parseFloat(event.target.value) || 0;
        let prevUpdate = fundUpdates.find(data => data.fundId === id);

        if (prevUpdate !== undefined && prevUpdate.amount === depositAmount) {
            return;
        }

        let tempMonthlySavings = monthlySavings;
        let tempUpdates = [...fundUpdates];

        if (prevUpdate) {
            tempMonthlySavings += parseFloat(prevUpdate.amount);
            tempUpdates = tempUpdates.filter(data => data.fundId !== id);
        }
        
        tempUpdates.push({ fundId: id, amount: depositAmount });
        setFundUpdates(tempUpdates);
        setMonthlySavings(tempMonthlySavings - depositAmount);

        if (tempMonthlySavings - depositAmount < 0) {
            setHasNegativeAmount(true);
        }
        else{
            setHasNegativeAmount(false);
        }
    };

    const handleDepositBtnClick = () => {
        UpdateFunds();
    };

    // Use Effects
    useEffect(() => {
        GetMonthlySavings();
        GetFundNodes();
    }, []);

    useEffect(() => {
        console.log("Funds Updated: ", fundUpdates);
    }, [fundUpdates]);

    // API Calls
    async function GetFundNodes() {
        try {
            // Get fund nodes data
            const response = await axios.get("https://localhost:44379/Fund/nodes");

            if (response.status === 200) {
                setFunds(response.data);
            }
        } catch (error) {
            alert(error);
        }
    }

    async function GetMonthlySavings() {
        try {
            // Get monthly savings amount
            const response = await axios.get("https://localhost:44379/Fund/get-monthly-savings");

            if (response.status === 200) {
                setMonthlySavings(response.data);
            }
        } catch (error) {
            alert(error);
        }
    }

    async function UpdateFunds() {
        try {
            // Deposit savings allocated to each fund
            const response = await axios.post("https://localhost:44379/Fund/deposit-funds", {
                fundDeposits: fundUpdates
            });

            console.log("Fund Updates: ", fundUpdates);

            if (response.status === 200) {
                navigate("/budget-savings");
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <LandingHeader />
            <Box
                className="dash-link"
                display="flex"
                sx={{
                    pl: 4,
                    pt: 4,
                }}
            >
                <Link className='dash-link' to="/budget-dashboard">
                    <ArrowBackIosIcon />
                </Link>
                <Link className='dash-link' to="/budget-dashboard">
                    <Typography className='no-deco'>Return to Dashboard</Typography>
                </Link>
            </Box>
            <Stack
                alignItems="center"
                gap={10}
                sx={{
                    mt: 2
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <Typography className="pg-header3">Savings to Deposit:&nbsp;&nbsp;</Typography>
                    <Box>
                        {!hasNegativeAmount ? (
                            <Typography className="num-text-bold"
                                sx={{
                                    color: '#00cc7a',
                                    py: 0.5,
                                    px: 1.5,
                                    border: '1px solid #1a1a1a',
                                    borderRadius: '5px',
                                    backgroundColor: '#3f3f46',
                                    boxShadow: '0px 2px 5px 0px #1a1a1a'
                                }}
                            >
                                ${monthlySavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Typography>
                        ) : (
                            <Typography className="num-text-bold"
                                sx={{
                                    color: '#e60000',
                                    py: 0.5,
                                    px: 1.5,
                                    border: '1px solid #1a1a1a',
                                    borderRadius: '5px',
                                    backgroundColor: '#3f3f46',
                                    boxShadow: '0px 2px 5px 0px #1a1a1a'
                                }}
                            >
                                ${monthlySavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Typography>
                        )}
                        
                    </Box>
                </Box>
                <Box
                    display="flex"
                    gap={12}
                >
                    {funds.map((fund, index) => (
                        <Stack
                            gap={3}
                        >
                            <StyledPaper elevation={8} key={fund.id}
                                sx={{
                                    py: 1,
                                    pl: 2,
                                    pr: 1.5
                                }}
                            >
                                <Stack display="flex" sx={{ minWidth: '100%!important' }}>
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                        alignItems="center"
                                        sx={{
                                            mb: 1,
                                            minWidth: '210px'
                                        }}
                                    >
                                        <Typography className="sec-header3"
                                            flexGrow={1}
                                        >
                                            {fund.name}
                                        </Typography>
                                    </Box>
                                    <Typography className="subtitle2">
                                            <span className="color-gray200">
                                                Deposits:
                                            </span>
                                            &nbsp;&nbsp;
                                            <span className="body1">
                                                {fund.depositCount}
                                            </span>
                                        </Typography>
                                    <Typography className="subtitle2">
                                        <span className="color-gray200">
                                            Current Balance:
                                        </span>
                                        &nbsp;&nbsp;
                                        <span className="body1 green-txt">
                                            ${fund.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                        </span>
                                    </Typography>
                                </Stack>
                            </StyledPaper>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography sx={{ pr: 2 }}>Deposit:</Typography>
                                <StyledTextField
                                    id="depositAmount"
                                    label='Amount'
                                    startadornment={
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon fontSize="small" sx={{ color: '#fff' }} />
                                        </InputAdornment>
                                    }
                                    onBlur={handleDepositEntered(fund.id)}
                                />
                            </Box>
                        </Stack>
                    ))}
                </Box>
                <GradientButton
                    variant="contained"
                    size='large'
                    // href="/budget-dashboard"
                    disabled={hasNegativeAmount}
                    onClick={handleDepositBtnClick}
                >
                    Deposit Funds
                </GradientButton>
            </Stack>
        </>
    );
}

export default DepositFunds;