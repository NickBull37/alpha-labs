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
import CakeIcon from '@mui/icons-material/Cake';

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
                            borderColor: '#00e6e6',
                        },
                    },
                },
            },
        },
    });

const AddBirthdayButton = styled(Button)(() => ({
    color: '#fff',
    //backgroundColor: '#2d3b52',
    backgroundColor: '#222f44',
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
    backgroundColor: '#00cccc',
    '&:hover': {
        backgroundColor: '#009999',
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

const AddBirthdayBtn = ({ setSuccessState, setErrorState }) => {

    // Constants
    const outerTheme = useTheme();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State Variables
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
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
        setDay(day);
        validateDay();
    }, [day]);
    
    useEffect(() => {
        setMonth(month);
        validateMonth();
    }, [month]);

    useEffect(() => {
        setName(name);
        validateName();
    }, [name]);

    // Validate Day
    function validateDay() {
        if (day === undefined || day === 0)
        {
            const label = document.getElementById("dayLabel");
            if (label)
            {
                label.classList.add("error-label");
            }
            const errorText = document.getElementById("dayErrorText");
            if (errorText) {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const label = document.getElementById("dayLabel");
            if (label)
            {
                label.classList.remove("error-label");
            }
            const errorText = document.getElementById("dayErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate Month
    function validateMonth() {
        if (month === undefined || month === 0)
        {
            const errorText = document.getElementById("monthErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const errorText = document.getElementById("monthErrorText");
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
        if (day === undefined || day === 0)
        {
            const element = document.getElementById("dayLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("dayErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
            validationSuccessful = false;
        }
        if (month === undefined || month === 0)
        {
            const element = document.getElementById("monthLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("monthErrorText");
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
            SaveBirthday(data);
        }
    };

    // API Calls
    async function SaveBirthday(data) {

        try {
            // Create birthday record
            const response = await axios.post("https://localhost:44379/Birthday/add-birthday", {
                day: day,
                month: month,
                name: name
            });

            // Clear form & close dialog window
            if (response.status === 200) {
                // console.log('Save Birthday API call successful');
                setSuccessState('Birthday added successfully!');
                setOpen(false);

                setDay(0);
                setMonth(0);
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
                <AddBirthdayButton
                    variant="contained"
                    onClick={handleClickOpen}
                >
                    <Stack alignItems="center" gap={1}>
                        <Typography>Manage</Typography>
                        <Typography>Birthdays</Typography>
                        <CakeIcon sx={{ color: '#00e6e6' }} />
                    </Stack>
                </AddBirthdayButton>
                <form id="add-birthday" onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            <Box display="flex" alignItems="center">
                                <CakeIcon
                                    fontSize='large'
                                    sx={{ mr: 2, color: '#00e6e6' }}
                                />
                                <Typography className="sec-header2">
                                    Add Birthday
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
                                <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200 }}>
                                    <InputLabel id="monthLabel" sx={{ color : '#fff' }}>Month</InputLabel>
                                    <Select
                                        id="month"
                                        name='month'
                                        label="Month"
                                        // type='text'
                                        value={month}
                                        {...register("month", { required: "Month is required."})}
                                        onChange={ (e) => setMonth(e.target.value) }
                                        error={Boolean(errors.month)}
                                        sx={{ color : '#fff' }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value={1}>January</MenuItem>
                                        <MenuItem value={2}>February</MenuItem>
                                        <MenuItem value={3}>March</MenuItem>
                                        <MenuItem value={4}>April</MenuItem>
                                        <MenuItem value={5}>May</MenuItem>
                                        <MenuItem value={6}>June</MenuItem>
                                        <MenuItem value={7}>July</MenuItem>
                                        <MenuItem value={8}>August</MenuItem>
                                        <MenuItem value={9}>September</MenuItem>
                                        <MenuItem value={10}>October</MenuItem>
                                        <MenuItem value={11}>November</MenuItem>
                                        <MenuItem value={12}>December</MenuItem>
                                    </Select>
                                    <Typography id="monthErrorText" className='hide-display mui-error-text'>Invalid month</Typography>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 100 }}>
                                    <InputLabel id="dayLabel" sx={{ color : '#fff' }}>Day</InputLabel>
                                    <Select
                                        id="day"
                                        name='day'
                                        label="Day"
                                        // type='text'
                                        value={day}
                                        {...register("day", { required: "Day is required."})}
                                        onChange={ (e) => setDay(e.target.value) }
                                        error={Boolean(errors.day)}
                                        sx={{ color : '#fff' }}
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
                                    <Typography id="dayErrorText" className='hide-display mui-error-text'>Invalid day</Typography>
                                </FormControl>
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
                                form='add-birthday'
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

export default AddBirthdayBtn;