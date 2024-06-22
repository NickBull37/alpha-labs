import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Stack, Button, Typography, OutlinedInput, FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
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

const PaycheckButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#00b36b',
    '&:hover': {
        backgroundColor: '#00663d',
    },
}));

const SaveButton = styled(Button)(() => ({
    backgroundColor: '#00cc7a',
    '&:hover': {
        backgroundColor: '#00995c',
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

const AddPaycheckBtn = ({ setSuccessState, setErrorState }) => {

    // Constants
    const outerTheme = useTheme();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State Variables
    const [payDay, setPayDay] = useState(1);
    const [employer, setEmployer] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    // Event Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Use Effects
    useEffect(() => {
        setPayDay(payDay);
        validatePayDay();
    }, [payDay]);

    useEffect(() => {
        setEmployer(employer);
        validateEmployer();
    }, [employer]);

    useEffect(() => {
        setDescription(description);
        validateDescription();
    }, [description]);

    useEffect(() => {
        setAmount(amount);
        validateAmount();
    }, [amount]);

    // Validate Pay Day
    function validatePayDay() {
        if (payDay === undefined || payDay === 0)
        {
            const label = document.getElementById("payDayLabel");
            if (label)
            {
                label.classList.add("error-label");
            }
            const errorText = document.getElementById("payDayErrorText");
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

    // Validate Paycheck Employer
    function validateEmployer() {
        if (employer === '')
        {
            const errorText = document.getElementById("employerErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const errorText = document.getElementById("employerErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Paycheck Description
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

    // Validate Paycheck Amount
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
        if (payDay === undefined || payDay === 0)
        {
            const element = document.getElementById("payDayLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("payDayErrorText");
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
        if (employer === '')
        {
            const element = document.getElementById("employerLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("employerErrorText");
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
            SavePaycheck(data);
        }
    };

    // API Calls
    async function SavePaycheck() {


        try {
            // Create paycheck record
            const response = await axios.post("https://localhost:44379/Paycheck/create-paycheck-template", {
                payDay: payDay,
                employer: employer,
                amount: Number(amount),
                description: description,
            });

            // Close dialog window
            if (response.status === 200) {
                // console.log('Save Paycheck API call successful');
                setSuccessState('Paycheck created successfully!');
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
                <PaycheckButton variant="contained" onClick={handleClickOpen}
                    sx={{
                        mb: 1.5,
                    }}
                >
                    Add Paycheck
                </PaycheckButton>
                <form id="add-paycheck" onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            Create Paycheck
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
                                <FormControl>
                                    <InputLabel id="employerLabel" htmlFor="employer" sx={{ color : '#fff' }}>Employer</InputLabel>
                                    <OutlinedInput
                                        id='employer'
                                        name='employer'
                                        label='Employer'
                                        type='text'
                                        value={employer}
                                        {...register("employer", { required: "Employer is required."})}
                                        onChange={ (e) => setEmployer(e.target.value) }
                                        error={Boolean(errors.employer)}
                                        sx={{ maxWidth: '20rem', color: '#fff' }}
                                    />
                                    <Typography id="employerErrorText" className='hide-display mui-error-text'>Invalid value</Typography>
                                </FormControl>
                                <FormControl variant="outlined">
                                    <InputLabel id="payDayLabel" sx={{ color : '#fff' }}>Day</InputLabel>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Select
                                            id="payDay"
                                            name='payDay'
                                            label='Day'
                                            type='number'
                                            value={payDay}
                                            {...register("payDay", { required: "Pay day is required."})}
                                            onChange={ (e) => setPayDay(Number(e.target.value)) }
                                            error={Boolean(errors.payDay)}
                                            sx={{ color : '#fff', minWidth: '65px' }}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                            <MenuItem value={7}>7</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={9}>9</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={11}>11</MenuItem>
                                            <MenuItem value={12}>12</MenuItem>
                                            <MenuItem value={13}>13</MenuItem>
                                            <MenuItem value={14}>14</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={16}>16</MenuItem>
                                            <MenuItem value={17}>17</MenuItem>
                                            <MenuItem value={18}>18</MenuItem>
                                            <MenuItem value={19}>19</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={21}>21</MenuItem>
                                            <MenuItem value={22}>22</MenuItem>
                                            <MenuItem value={23}>23</MenuItem>
                                            <MenuItem value={24}>24</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={26}>26</MenuItem>
                                            <MenuItem value={27}>27</MenuItem>
                                            <MenuItem value={28}>28</MenuItem>
                                            <MenuItem value={29}>29</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                            <MenuItem value={31}>31</MenuItem>
                                        </Select>
                                        <Typography sx={{ color : '#fff' }}>
                                            Day of the month paycheck is received
                                        </Typography>
                                    </Box>
                                    <Typography id="payDayErrorText" className='hide-display mui-error-text'>Invalid value</Typography>
                                </FormControl>
                                <FormControl sx={{ maxWidth: 150 }}>
                                    <InputLabel id="amountLabel" htmlFor="amount" sx={{ color : '#fff' }}>Amount</InputLabel>
                                    <OutlinedInput
                                        id="amount"
                                        name='amount'
                                        label="Amount"
                                        type='number'
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon fontSize="small" sx={{ color: '#fff' }} />
                                            </InputAdornment>
                                        }
                                        value={amount}
                                        {...register("amount", { required: "Amount is required."})}
                                        onChange={ (e) => setAmount(e.target.value) }
                                        error={Boolean(errors.amount)}
                                        sx={{ color : '#fff' }}
                                    />
                                    <Typography id="amountErrorText" className='hide-display mui-error-text'>Invalid amount</Typography>
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
                                    <Typography id="descriptionErrorText" className='hide-display mui-error-text'>Invalid description</Typography>
                                </FormControl>
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ p: 1.5 }}>
                            <SaveButton
                                id='submit'
                                type='submit'
                                form='add-paycheck'
                                variant='contained'
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

export default AddPaycheckBtn;