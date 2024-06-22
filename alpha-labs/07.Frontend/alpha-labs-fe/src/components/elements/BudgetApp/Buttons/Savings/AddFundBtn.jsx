import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Stack, Button, Typography, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

const FundButton = styled(Button)(() => ({
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

const AddFundBtn = ({ setSuccessState, setErrorState }) => {
    
    // Constants
    const outerTheme = useTheme();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    // State Variables
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
        setName(name);
        validateName();
    }, [name]);

    // Validate fund name
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
    const onSubmit = () => {
        var validationSuccessful = validateFormFields();
        if (validationSuccessful)
        {
            AddFund();
        }
    };

    // API Calls
    async function AddFund() {

        // Create fund record
        try {
            // Create fund record
            const response = await axios.post("https://localhost:44379/Fund/create-fund", {
                name: name
            });

            // Close dialog window
            if (response.status === 200) {
                // console.log('Add Fund API call successful');
                setSuccessState('Fund created successfully!');
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
                <FundButton variant="contained" onClick={handleClickOpen} sx={{ mb: 1.5 }}>
                    Create Fund
                </FundButton>
                <form id="add-fund" onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            Create Fund
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent dividers>
                            <Stack p={3}>
                                <FormControl>
                                    <InputLabel id="nameLabel" htmlFor="name" sx={{ color : '#fff' }}>Fund Name</InputLabel>
                                    <OutlinedInput
                                        id='name'
                                        name='name'
                                        label='Fund Name'
                                        type='text'
                                        value={name}
                                        {...register("name", { required: "Fund Name is required."})}
                                        onChange={ (e) => setName(e.target.value) }
                                        error={Boolean(errors.name)}
                                        sx={{ color: '#fff' }}
                                    />
                                    <Typography id="nameErrorText" className='hide-display mui-error-text'>You must enter a name</Typography>
                                </FormControl>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <SaveButton
                                id='submit'
                                type='submit'
                                form='add-fund'
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

export default AddFundBtn;