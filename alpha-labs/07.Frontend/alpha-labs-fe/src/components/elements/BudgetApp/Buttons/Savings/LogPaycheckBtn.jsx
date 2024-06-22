import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Stack, Button, Typography, FormControlLabel, FormControl, RadioGroup, Radio } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const PaycheckButton = styled(Button)(() => ({
    color: '#00cc7a',
    backgroundColor: '#27272a',
    border: '1px solid #00cc7a',
    '&:hover': {
        backgroundColor: 'rgba(0, 204, 122, 0.2)',
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

const LogPaycheckBtn = ({ setSuccessState, setErrorState }) => {

    // Constants
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    // State Variables
    const [templates, setTemplates] = useState([]);
    const [selectedTemplateID, setSelectedTemplateID] = useState(0);

    // Event Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleRadioChange = (event) => {
        setSelectedTemplateID(event.target.value);
    };

    // Use Effects
    useEffect(() => {
        GetPaycheckTemplates();
    }, []);

    useEffect(() => {
        validateTemplateID();
    }, [selectedTemplateID]);

    // Validate paycheck template id
    function validateTemplateID() {
        if (selectedTemplateID === 0)
        {
            const errorText = document.getElementById("templateIdErrorText");
            if (errorText)
            {
                errorText.classList.remove("hide-display");
            }
        }
        else
        {
            const errorText = document.getElementById("templateIdErrorText");
            if (errorText)
            {
                errorText.classList.add("hide-display");
            }
        }
    }

    // Validate form before submission
    function validateFormFields () {

        var validationSuccessful = true;
        if (selectedTemplateID === 0)
        {
            const errorText = document.getElementById("templateIdErrorText");
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
            LogPaycheck();
        }
    };

    // API Calls
    async function GetPaycheckTemplates() {
        try {
            // Get paycheck template records
            const response = await axios.get("https://localhost:44379/Paycheck/templates");

            if (response.status === 200) {
                setTemplates(response.data);
            }
        } catch (error) {
            if (error.response) {
                setErrorState(error.response.data.title);
            }
            setOpen(false);
        }
    }

    async function LogPaycheck() {
        try {
            
            // Log paycheck record
            const response = await axios.post(`https://localhost:44379/Paycheck/log-paycheck?id=${selectedTemplateID}`);

            // Close dialog window
            if (response.status === 200) {
                // console.log('Log Paycheck API call successful');
                setSuccessState('Paycheck logged successfully!');
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
        <React.Fragment>
            <PaycheckButton size='small' variant="contained" onClick={handleClickOpen}>
                Log Paycheck
            </PaycheckButton>
            <form id="log-paycheck" onSubmit={handleSubmit(onSubmit)}>
                <BootstrapDialog
                    fullWidth={true}
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Log Paycheck
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
                        <Stack gap={2}>
                            <Typography id="templateIdLabel">
                                Which paycheck are you recording?
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    name="paycheck-template"
                                    value={selectedTemplateID}
                                    onChange={handleRadioChange}
                                >
                                    {templates.map((template) => (
                                        <FormControlLabel
                                            key={template.id}
                                            value={template.id}
                                            control={
                                                <Radio
                                                    //{...register("selectedTemplateID", { required: "Paycheck is required."})}
                                                    onChange={ (e) => setSelectedTemplateID(e.target.value) }
                                                    sx={{
                                                        color: '#fff',
                                                        '&.Mui-checked': {
                                                            color: '#00cc7a',
                                                        },
                                                    }}
                                                />
                                            }
                                            label={template.description}
                                        />
                                    ))}
                                </RadioGroup>
                                <Typography id="templateIdErrorText" className='hide-display mui-error-text'>A paycheck must be selected</Typography>
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <SaveButton
                            id='submit'
                            type='submit'
                            form='log-paycheck'
                            variant='contained'
                        >
                            Save
                        </SaveButton>
                    </DialogActions>
                </BootstrapDialog>
            </form>
        </React.Fragment>
    );
}

export default LogPaycheckBtn;