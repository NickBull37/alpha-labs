import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Stack, Button, Typography, FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';

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
                            borderColor: '#ff6600',
                        },
                    },
                },
            },
        },
    });

const AddEventButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#2d3b52',
    minHeight: '100px',
    minWidth: '100px',
    padding: '10px',
    boxShadow: "0px 2px 10px 2px #1a1a1a",
    '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.6)',
        boxShadow: "0px 2px 10px 4px #1a1a1a",
    }
}));

const SaveButton = styled(Button)(() => ({
    backgroundColor: '#ff6600',
    '&:hover': {
        backgroundColor: '#cc5200',
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

const AddEventBtn = ({ setSuccessState, setErrorState }) => {

    // Constants
    const outerTheme = useTheme();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State Variables
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [name, setName] = useState('');

    // Event Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Use Effects
    useEffect(() => {
        setStartDate(startDate);
        validateStartDate();
    }, [startDate]);
    
    useEffect(() => {
        setEndDate(endDate);
        validateEndDate();
    }, [endDate]);

    useEffect(() => {
        setName(name);
        validateName();
    }, [name]);

    // Validate Day
    function validateStartDate() {
        if (startDate === undefined || startDate === '')
        {
            const label = document.getElementById("startDateLabel");
            if (label)
            {
                label.classList.add("error-label");
            }
            const errorText = document.getElementById("startDateErrorText");
            if (errorText) {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const label = document.getElementById("startDateLabel");
            if (label)
            {
                label.classList.remove("error-label");
            }
            const errorText = document.getElementById("startDateErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Month
    function validateEndDate() {
        if (endDate === undefined || endDate === '')
        {
            const errorText = document.getElementById("endDateErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const errorText = document.getElementById("endDateErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Name
    function validateName() {
        if (name === '')
        {
            const errorText = document.getElementById("nameErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const errorText = document.getElementById("nameErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate form before submission
    function validateFormFields () {

        var validationSuccessful = true;
        if (startDate === undefined || startDate === '')
        {
            const element = document.getElementById("startDateLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("startDateErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
            validationSuccessful = false;
        }
        if (endDate === undefined || endDate === '')
        {
            const element = document.getElementById("endDateLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("endDateErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
            validationSuccessful = false;
        }
        if (name === '')
        {
            const element = document.getElementById("nameLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("nameErrorText");
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
            SaveEvent(data);
        }
    };

    // API Calls
    async function SaveEvent(data) {

        try {
            // Create event record
            const response = await axios.post("https://localhost:44379/Event/add-event", {
                startDate: startDate,
                endDate: endDate,
                name: name
            });

            // Clear form & close dialog window
            if (response.status === 200) {
                // console.log('Save Event API call successful');
                setSuccessState('Event added successfully!');
                setOpen(false);

                setStartDate('');
                setEndDate('');
                setName('');
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
                <AddEventButton
                    variant="contained"
                    onClick={handleClickOpen}
                >
                    <Stack alignItems="center" gap={1}>
                        <Typography>Manage</Typography>
                        <Typography>Events</Typography>
                        <EventIcon sx={{ color: '#ff6600' }} />
                    </Stack>
                </AddEventButton>
                <form id="add-event" onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            <Box display="flex" alignItems="center">
                                <EventIcon
                                    fontSize='large'
                                    sx={{ mr: 2, color: '#ff6600' }}
                                />
                                <Typography className="sec-header2">
                                    Add Event
                                </Typography>
                            </Box>
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
                                    <Typography id="startDateLabel" sx={{ mb: 1 }}>Start Date</Typography>
                                    <input
                                        id="startDate"
                                        name="startDate"
                                        className="date-picker"
                                        type="date"
                                        value={startDate}
                                        {...register("startDate", { required: "Start date date is required."})}
                                        onChange={ (e) => setStartDate(e.target.value) }
                                    />
                                    <Typography id="startDateErrorText" className='hide-display mui-error-text'>Invalid date</Typography>
                                </Box>
                                <Box>
                                    <Typography id="endDateLabel" sx={{ mb: 1 }}>End Date</Typography>
                                    <input
                                        id="endDate"
                                        name="endDate"
                                        className="date-picker"
                                        type="date"
                                        value={endDate}
                                        {...register("endDate", { required: "End date date is required."})}
                                        onChange={ (e) => setEndDate(e.target.value) }
                                    />
                                    <Typography id="endDateErrorText" className='hide-display mui-error-text'>Invalid date</Typography>
                                </Box>
                                <FormControl>
                                    <InputLabel id="nameLabel" htmlFor="name" sx={{ color : '#fff' }}>Name</InputLabel>
                                    <OutlinedInput
                                        id='name'
                                        name='name'
                                        label='Name'
                                        type='text'
                                        value={name}
                                        onChange={ (e) => setName(e.target.value) }
                                        error={Boolean(errors.name)}
                                        sx={{ color: '#fff' }}
                                    />
                                    <Typography id="nameErrorText" className='hide-display mui-error-text'>Invalid name</Typography>
                                </FormControl>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <SaveButton
                                id='submit'
                                type='submit'
                                form='add-event'
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

export default AddEventBtn;