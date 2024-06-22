import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Stack, Button, Typography, FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment } from '@mui/material';
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

const TransactionButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#00b36b',
    '&:hover': {
        backgroundColor: '#00663d',
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

const AddTransactionBtn = ({ setSuccessState, setErrorState }) => {

    // Constants
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State Variables
    const [transactionDate, setTransactionDate] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
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
        setTransactionDate(transactionDate);
        validateDate();
    }, [transactionDate]);
    
    useEffect(() => {
        setType(type);
        validateType();
    }, [type]);

    useEffect(() => {
        setDescription(description);
        validateDescription();
    }, [description]);

    useEffect(() => {
        setAmount(amount);
        validateAmount();
    }, [amount]);

    // Validate Transaction Date
    function validateDate() {
        if (transactionDate === undefined || transactionDate === '')
        {
            const label = document.getElementById("dateLabel");
            if (label)
            {
                label.classList.add("error-label");
            }
            const errorText = document.getElementById("dateErrorText");
            if (errorText) {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const label = document.getElementById("dateLabel");
            if (label)
            {
                label.classList.remove("error-label");
            }
            const errorText = document.getElementById("dateErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Transaction Type
    function validateType() {
        if (type === '')
        {
            const errorText = document.getElementById("typeErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const errorText = document.getElementById("typeErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Purchase Description
    function validateDescription() {
        if (description === '')
        {
            const errorText = document.getElementById("descriptionErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const errorText = document.getElementById("descriptionErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

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
        if (transactionDate === undefined || transactionDate === '')
        {
            const element = document.getElementById("dateLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("dateErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
            validationSuccessful = false;
        }
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
        if (type === '')
        {
            const element = document.getElementById("typeLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("typeErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
            validationSuccessful = false;
        }
        if (description === '')
        {
            const element = document.getElementById("descriptionLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("descriptionErrorText");
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
            SaveTransaction(data);
        }
    };

    // API Calls
    async function SaveTransaction(data) {

        try {
            // Create purchase record
            const response = await axios.post("https://localhost:44379/Transaction/create-transaction", {
                transactionDate: transactionDate,
                amount: Number(amount),
                type: type,
                description: description,
            });

            // Close dialog window
            if (response.status === 200) {
                // console.log('Save Transaction API call successful');
                setSuccessState('Transaction added successfully!');
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
                <TransactionButton variant="contained" onClick={handleClickOpen}>
                    Add Transaction
                </TransactionButton>
                <form id="add-transaction" onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            Add Transaction
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
                            <Stack gap={4}>
                                <Box>
                                    <Typography id="dateLabel" sx={{ mb: 1 }}>Date of Transaction</Typography>
                                    <input
                                        id="transactionDate"
                                        name="transactionDate"
                                        className="date-picker"
                                        type="date"
                                        value={transactionDate}
                                        {...register("transactionDate", { required: "Transaction date is required."})}
                                        onChange={ (e) => setTransactionDate(e.target.value) }
                                    />
                                    <Typography id="dateErrorText" className='hide-display mui-error-text'>Invalid date</Typography>
                                </Box>
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
                                <FormControl variant="outlined" sx={{ minWidth: 120, maxWidth: 250 }}>
                                    <InputLabel id="typeLabel" sx={{ color : '#fff' }}>Type</InputLabel>
                                    <Select
                                        id="type"
                                        name='type'
                                        label="Type"
                                        type='text'
                                        value={type}
                                        {...register("type", { required: "Type is required."})}
                                        onChange={ (e) => setType(e.target.value) }
                                        error={Boolean(errors.type)}
                                        sx={{ color : '#fff' }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value={'Deposit'}>Deposit</MenuItem>
                                        <MenuItem value={'Withdraw'}>Withdraw</MenuItem>
                                    </Select>
                                    <Typography id="categoryErrorText" className='hide-display mui-error-text'>Invalid type</Typography>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="descriptionLabel" htmlFor="description" sx={{ color : '#fff' }}>Description</InputLabel>
                                    <OutlinedInput
                                        id='description'
                                        name='description'
                                        label='Description'
                                        type='text'
                                        value={description}
                                        {...register("description", { required: "Description is required."})}
                                        onChange={ (e) => setDescription(e.target.value) }
                                        error={Boolean(errors.description)}
                                        sx={{ color: '#fff' }}
                                    />
                                    <Box display="flex" gap={1} sx={{ mt: 1.5 }}>
                                        <Typography
                                            className="quick-fill-transactions"
                                            onClick={ (e) => setDescription("Cash Withdraw") }
                                        >
                                            Cash Withdraw
                                        </Typography>
                                    </Box>
                                    <Typography id="descriptionErrorText" className='hide-display mui-error-text'>Invalid description</Typography>
                                </FormControl>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <SaveButton
                                id='submit'
                                type='submit'
                                form='add-transaction'
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

export default AddTransactionBtn;