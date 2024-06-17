import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Stack, Button, ToggleButton, Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
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
                            borderColor: '#1976d2',
                        },
                    },
                },
            },
        },
    });

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

const StyledButtonGroup = styled(ToggleButtonGroup)(() => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        color: '#fff',
        border: '1px solid #cccccc'
    },
}));

const SaveButton = styled(Button)(() => ({
    backgroundColor: '#1976d2',
    '&:hover': {
        backgroundColor: '#1359a0',
    },
}));

const AddBillBtn = ({ setSuccessState, setErrorState }) => {

    // Constants
    const outerTheme = useTheme();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State Variables
    const [paymentFrequency, setPaymentFrequency] = useState('');
    const [paymentDueDay, setPaymentDueDay] = useState(1);
    const [isAutoPay, setIsAutoPay] = useState(false);
    const [amount, setAmount] = useState('');
    const [isVariableAmount, setIsVariableAmount] = useState(false);
    const [category, setCategory] = useState('');
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
        setPaymentFrequency(paymentFrequency);
        validatepaymentFrequency();
    }, [paymentFrequency]);

    useEffect(() => {
        setPaymentDueDay(paymentDueDay);
        validatePaymentDueDay();
    }, [paymentDueDay]);

    useEffect(() => {
        setIsAutoPay(isAutoPay);
    }, [isAutoPay]);

    useEffect(() => {
        setAmount(amount);
        validateAmount();
    }, [amount]);

    useEffect(() => {
        setIsVariableAmount(isVariableAmount);
    }, [isVariableAmount]);
    
    useEffect(() => {
        setCategory(category);
        validateCategory();
    }, [category]);

    useEffect(() => {
        setDescription(description);
        validateDescription();
    }, [description]);

    // Validate Due Day
    function validatePaymentDueDay() {
        if (paymentDueDay === undefined || paymentDueDay === 0)
        {
            const label = document.getElementById("paymentDueDayLabel");
            if (label)
            {
                label.classList.add("error-label");
            }
            const errorText = document.getElementById("paymentDueDayErrorText");
            if (errorText) {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const label = document.getElementById("paymentDueDayLabel");
            if (label)
            {
                label.classList.remove("error-label");
            }
            const errorText = document.getElementById("paymentDueDayErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Bill Payments per Year
    function validatepaymentFrequency() {
        if (paymentFrequency === '')
        {
            const errorText = document.getElementById("paymentFrequencyErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const label = document.getElementById("paymentFrequencyLabel");
            if (label)
            {
                label.classList.remove("error-label");
            }
            const errorText = document.getElementById("paymentFrequencyErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Bill Category
    function validateCategory() {
        if (category === '')
        {
            const errorText = document.getElementById("categoryErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const errorText = document.getElementById("categoryErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Bill Description
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

    // Validate Bill Amount
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
        if (paymentDueDay === undefined || paymentDueDay === 0)
        {
            const element = document.getElementById("paymentDueDayLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("paymentDueDayErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
            validationSuccessful = false;
        }
        if (paymentFrequency === '')
        {
            const element = document.getElementById("paymentFrequencyLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("paymentFrequencyErrorText");
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
        if (category === '')
        {
            const element = document.getElementById("categoryLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("categoryErrorText");
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
            SaveBillTemplate(data);
        }
    };

    // API Calls
    async function SaveBillTemplate() {

        try {
            // Create bill record
            const response = await axios.post("https://localhost:44379/Bills/create-bill-template", {
                paymentFrequency: paymentFrequency,
                paymentDueDay: paymentDueDay,
                amount: Number(amount),
                isVariableAmount: isVariableAmount,
                category: category,
                description: description,
                isAutoPay: isAutoPay
            });

            // Close dialog window
            if (response.status === 200) {
                // console.log('Save Bill API call successful');
                setSuccessState('Bill created successfully!');
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
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Bill
                </Button>
                <form id="add-bill" onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            Create Bill
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
                                    <Typography id="paymentFrequencyLabel" sx={{ mb: 1 }}>Bill is paid</Typography>
                                    <StyledButtonGroup
                                        color="primary"
                                        id="paymentFrequency"
                                        value={paymentFrequency}
                                        exclusive
                                        required
                                        //{...register("paymentFrequency", { required: "Payment frequency is required."})}
                                        // onChange={ (e) => setPaymentFrequency(e.target.value) }
                                        onChange={ (e, value) => setPaymentFrequency(value) }
                                    >
                                        <ToggleButton value={'Monthly'}>Monthly</ToggleButton>
                                        <ToggleButton value={'Quarterly'}>Quarterly</ToggleButton>
                                        <ToggleButton value={'Bi-annually'}>Bi-annually</ToggleButton>
                                        <ToggleButton value={'Annually'}>Annually</ToggleButton>
                                    </StyledButtonGroup>
                                    <Typography id="paymentFrequencyErrorText" className='hide-display mui-error-text'>Payment frequency is required</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={4}>
                                    <FormControl variant="outlined">
                                        <InputLabel id="paymentDueDayLabel" sx={{ color : '#fff' }}>Day</InputLabel>
                                        <Select
                                            id="paymentDueDay"
                                            name='paymentDueDay'
                                            label='Day'
                                            type='number'
                                            value={paymentDueDay}
                                            {...register("paymentDueDay", { required: "Payment due day is required."})}
                                            onChange={ (e) => setPaymentDueDay(Number(e.target.value)) }
                                            error={Boolean(errors.paymentDueDay)}
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
                                        <Typography sx={{ color : '#fff' }}>Day of month payment is due</Typography>
                                        <Typography id="paymentDueDayErrorText" className='hide-display mui-error-text'>Invalid value</Typography>
                                    </FormControl>
                                    <FormControlLabel
                                        label="Is Auto-Paid?"
                                        control={
                                            <Checkbox
                                                id='IsAutoPay'
                                                name='isAutoPay'
                                                value={isAutoPay}
                                                onChange={ (e) => setIsAutoPay(e.target.checked) }
                                                sx={{
                                                    color: '#fff',
                                                    '&.Mui-checked': {
                                                        color: '#1976d2',
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                </Box>
                                <Box display="flex" alignItems="center" gap={4}>
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
                                    <FormControlLabel
                                        label="Does the amount vary month to month?"
                                        control={
                                            <Checkbox
                                                id='IsVariableAmount'
                                                name='isVariableAmount'
                                                value={isVariableAmount}
                                                onChange={ (e) => setIsVariableAmount(e.target.checked) }
                                                sx={{
                                                    color: '#fff',
                                                    '&.Mui-checked': {
                                                        color: '#1976d2',
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                </Box>
                                <FormControl variant="outlined" sx={{ minWidth: 120, maxWidth: 180 }}>
                                    <InputLabel id="categoryLabel" sx={{ color : '#fff' }}>Category</InputLabel>
                                    <Select
                                        id="category"
                                        label="Category"
                                        name='category'
                                        labelId="categoryLabel"
                                        value={category}
                                        {...register("category", { required: "Category is required."})}
                                        onChange={ (e) => setCategory(e.target.value) }
                                        error={Boolean(errors.category)}
                                        sx={{ color : '#fff' }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value={'Car'}>Car</MenuItem>
                                        <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                                        <MenuItem value={'Housing'}>Housing</MenuItem>
                                        <MenuItem value={'WebDev'}>Web Dev</MenuItem>
                                        {/* <MenuItem value={'Utilities'}>Utilities</MenuItem> */}
                                        <MenuItem value={'Other'}>Other</MenuItem>
                                    </Select>
                                    <Typography id="categoryErrorText" className='hide-display mui-error-text'>Invalid category</Typography>
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
                                form='add-bill'
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

export default AddBillBtn;