import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: '#cccccc',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: '#999999',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: '#00cc7a',
                        },
                    },
                },
            },
        },
    });

const AddFundsButton = styled(Button)(() => ({
    color: '#00cc7a',
    '&:hover': {
        backgroundColor: 'rgba(0, 204, 122, 0.1)',
    },
}));

const DepositFundsButton = styled(IconButton)(() => ({
    color: '#00cc7a',
    '&:hover': {
        backgroundColor: 'rgba(0, 102, 61, 0.3)',
    },
}));

const SaveButton = styled(Button)(() => ({
    backgroundColor: '#00cc7a',
    '&:hover': {
        backgroundColor: '#00663d',
    },
}));

const BootstrapDialog = styled(Dialog)(() => ({
    '& .MuiDialogTitle-root': {
        backgroundColor: '#4d4d4d',
        color: '#fff'
    },
    '& .MuiDialogContent-root': {
        backgroundColor: '#4d4d4d',
        color: '#fff'
    },
    '& .MuiDialogActions-root': {
        backgroundColor: '#4d4d4d',
        color: '#fff'
    },
}));

const DepositFundsBtn = ({ fund, setSuccessState, setErrorState }) => {

    // Constants
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const formId = `deposit-funds-${fund.id}`;

    // State Variables
    const [amount, setAmount] = useState('');

    // Event Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Use Effects
    useEffect(() => {
        setAmount(amount);
        validateAmount();
    }, [amount]);

    // Validate Transaction Amount
    function validateAmount() {
        if (amount <= 0)
        {
            const label = document.getElementById("amountLabel");
            if (label)
            {
                label.classList.add("error-label");
            }
            const errorText = document.getElementById("amountErrorText");
            if (errorText) {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const label = document.getElementById("amountLabel");
            if (label)
            {
                label.classList.remove("error-label");
            }
            const errorText = document.getElementById("amountErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate form before submission
    function validateFormFields () {

        var validationSuccessful = true;
        if (amount <= 0)
        {
            const element = document.getElementById("amountLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("amountErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
            validationSuccessful = false;
        }
        // Return success
        if (validationSuccessful)
        {
            return validationSuccessful;
        }
    }

    // Form submission
    const onSubmit = (data) => {
        var validationSuccessful = validateFormFields();
        if (validationSuccessful)
        {
            DepositFunds(data);
        }
    };

    // API Calls
    async function DepositFunds(data) {

        try {
            // Create purchase record
            const response = await axios.post("https://localhost:44379/Fund/create-fund-transaction", {
                fundID: fund.id,
                amount: Number(amount)
            });

            // Close dialog window
            if (response.status === 200) {
                // console.log('Deposit Funds API call successful');
                setSuccessState('Funds deposited successfully!');
                setOpen(false);
            }
        } catch (error) {
            if (error.response) {
                setErrorState(error.response.data.title);
            }
            setOpen(false);
        }
    }

    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            <React.Fragment>
                <AddFundsButton variant="text" size='small' onClick={handleClickOpen}>
                    Deposit Funds
                </AddFundsButton>
                <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            {fund.name}
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: '#b3b3b3',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent dividers>
                            <Box display="flex" alignItems="baseline" gap={2}>
                                <FormControl sx={{ maxWidth: 150 }}>
                                    <InputLabel id="amountLabel" htmlFor="amount" sx={{ color : '#fff' }}>Amount</InputLabel>
                                    <OutlinedInput
                                        id="amount"
                                        name='amount'
                                        label="Amount"
                                        type='number'
                                        required
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon fontSize="small" sx={{ color: '#fff' }} />
                                            </InputAdornment>
                                        }
                                        value={amount}
                                        {...register("amount", { required: "Amount is required."})}
                                        onChange={ (e) => setAmount(Number(e.target.value)) }
                                        error={Boolean(errors.amount)}
                                        sx={{ color : '#fff' }}
                                    />
                                    <Typography id="amountErrorText" className='hide-display mui-error-text'>Invalid amount</Typography>
                                </FormControl>
                                <Typography>
                                    How much would you like to add to this fund?
                                </Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <SaveButton
                                id='submit'
                                type='submit'
                                form={formId}
                                variant='contained'
                                onClick={validateFormFields}
                            >
                                Save
                            </SaveButton>
                        </DialogActions>
                    </BootstrapDialog>
                </form>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default DepositFundsBtn;