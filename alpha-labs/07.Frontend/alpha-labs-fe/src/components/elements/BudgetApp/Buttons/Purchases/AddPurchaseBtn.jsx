import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Stack, Button, Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment } from '@mui/material';
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
                            borderColor: '#ff1a75',
                        },
                    },
                },
            },
        },
    });

const PurchaseButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#ff1a75',
    '&:hover': {
        backgroundColor: '#b30047',
    },
}));

const SaveButton = styled(Button)(() => ({
    backgroundColor: '#ff1a75',
    '&:hover': {
        backgroundColor: '#cc0052',
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

const AddPurchaseBtn = ({ setSuccessState, setErrorState }) => {

    // Constants
    const outerTheme = useTheme();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State Variables
    const [purchaseDate, setPurchaseDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [isLuxury, setIsLuxury] = useState(false);

    // Event Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Use Effects
    useEffect(() => {
        setPurchaseDate(purchaseDate);
        validateDate();
    }, [purchaseDate]);
    
    useEffect(() => {
        setCategory(category);
        validateCategory();
    }, [category]);

    useEffect(() => {
        setDescription(description);
        validateDescription();
    }, [description]);

    useEffect(() => {
        setAmount(amount);
        validateAmount();
    }, [amount]);

    useEffect(() => {
        setIsLuxury(isLuxury);
    }, [isLuxury]);

    // Validate Purchase Date
    function validateDate() {
        if (purchaseDate === undefined || purchaseDate === '')
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

    // Validate Purchase Category
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

    // Validate Purchase Amount
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
        if (purchaseDate === undefined || purchaseDate === '')
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
            SavePurchase(data);
        }
    };

    // API Calls
    async function SavePurchase(data) {

        try {
            // Create purchase record
            const response = await axios.post("https://localhost:44379/Purchase/create-purchase", {
                purchaseDate: purchaseDate,
                amount: Number(amount),
                category: category,
                description: description,
                isLuxury: isLuxury
            });

            // Clear form & close dialog window
            if (response.status === 200) {
                // console.log('Save Purchase API call successful');
                setSuccessState('Purchase added successfully!');
                setOpen(false);

                setPurchaseDate('');
                setCategory('');
                setDescription('');
                setAmount('');
                setIsLuxury(false);
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
                <PurchaseButton variant="contained" onClick={handleClickOpen}>
                    Add Purchase
                </PurchaseButton>
                <form id="add-purchase" onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            Add Purchase
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
                                    <Typography id="dateLabel" sx={{ mb: 1 }}>Date of Purchase</Typography>
                                    <input
                                        id="purchaseDate"
                                        name="purchaseDate"
                                        className="date-picker"
                                        type="date"
                                        value={purchaseDate}
                                        {...register("purchaseDate", { required: "Purchase date is required."})}
                                        onChange={ (e) => setPurchaseDate(e.target.value) }
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
                                    <InputLabel id="categoryLabel" sx={{ color : '#fff' }}>Category</InputLabel>
                                    <Select
                                        id="category"
                                        name='category'
                                        label="Category"
                                        type='text'
                                        value={category}
                                        {...register("category", { required: "Category is required."})}
                                        onChange={ (e) => setCategory(e.target.value) }
                                        error={Boolean(errors.category)}
                                        sx={{ color : '#fff' }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value={'Car'}>Car</MenuItem>
                                        <MenuItem value={'Clothes'}>Clothes</MenuItem>
                                        <MenuItem value={'Consumables'}>Consumables</MenuItem>
                                        <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                                        <MenuItem value={'Food'}>Food</MenuItem>
                                        <MenuItem value={'Housing'}>Housing</MenuItem>
                                        <MenuItem value={'Miscellaneous'}>Miscellaneous</MenuItem>
                                        <MenuItem value={'Service'}>Service</MenuItem>
                                        {/* <MenuItem value={'Other'}>Other</MenuItem> */}
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
                                        //{...register("description", { required: "Description is required."})}
                                        onChange={ (e) => setDescription(e.target.value) }
                                        error={Boolean(errors.description)}
                                        sx={{ color: '#fff' }}
                                    />
                                    <Box display="flex" gap={1} sx={{ mt: 1.5 }}>
                                        <Typography
                                            className="quick-fill"
                                            onClick={ (e) => setDescription("Door Dash - lunch") }
                                        >
                                            Door Dash - lunch
                                        </Typography>
                                        <Typography
                                            className="quick-fill"
                                            onClick={ (e) => setDescription("Door Dash - dinner") }
                                        >
                                            Door Dash - dinner
                                        </Typography>
                                        <Typography
                                            className="quick-fill"
                                            onClick={ (e) => setDescription("Wawa") }
                                        >
                                            Wawa
                                        </Typography>
                                    </Box>
                                    <Typography id="descriptionErrorText" className='hide-display mui-error-text'>Invalid description</Typography>
                                </FormControl>
                                <FormControlLabel
                                    label="Is this a luxury purchase?"
                                    control={
                                        <Checkbox
                                            id='isLuxury'
                                            name='isLuxury'
                                            value={isLuxury}
                                            onChange={ (e) => setIsLuxury(!isLuxury) }
                                            sx={{
                                                color: '#fff',
                                                '&.Mui-checked': {
                                                    color: '#ff1a75',
                                                },
                                            }}
                                        />
                                    }
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <SaveButton
                                id='submit'
                                type='submit'
                                form='add-purchase'
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

export default AddPurchaseBtn;