import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Stack, Button, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FlareIcon from '@mui/icons-material/Flare';

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
                            borderColor: '#b3b300',
                        },
                    },
                },
            },
        },
    });

const AddHolidayButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: 'rgba(25, 118, 210, 0.6)'
}));

const SaveButton = styled(Button)(() => ({
    backgroundColor: '#b3b300',
    '&:hover': {
        backgroundColor: '#808000',
    },
}));

const StyledCheckbox = styled(Checkbox)(() => ({
    color: '#fff',
    '&.Mui-checked': {
        color: '#e6e600',
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

const AddHolidayBtn = ({ setSuccessState, setErrorState }) => {

    // Constants
    const outerTheme = useTheme();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State Variables
    const [christmasActive, setChristmasActive] = useState(false);
    const [easterActive, setEasterActive] = useState(false);
    const [fathersDayActive, setFathersDayActive] = useState(false);
    const [halloweenActive, setHalloweenActive] = useState(false);
    const [independenceDayActive, setIndependenceDayActive] = useState(false);
    const [laborDayActive, setLaborDayActive] = useState(false);
    const [memorialDayActive, setMemorialDayActive] = useState(false);
    const [mothersDayActive, setMothersDayActive] = useState(false);
    const [newYearsDayActive, setNewYearsDayActive] = useState(false);
    const [newYearsEveActive, setNewYearsEveActive] = useState(false);
    const [thanksgivingActive, setThanksgivingActive] = useState(false);
    const [valentinesDayActive, setValentinesDayActive] = useState(false);

    const [haveValuesBeenUpdated, setHaveValuesBeenUpdated] = useState(false);
    const [holidayNames, setHolidayNames] = useState([]);
    const [enabledHolidays, setEnabledHolidays] = useState([]);
    const [disabledHolidays, setDisabledHolidays] = useState([]);

    // Event Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const UpdateHolidayNamesList = (name, isChecked) => {
        let tempEnabled = enabledHolidays;
        let tempDisabled = disabledHolidays;

        if (isChecked) {
            tempEnabled.push(name);
        }
        else {
            tempDisabled.push(name);
        }

        setEnabledHolidays(tempEnabled);
        setDisabledHolidays(tempDisabled);
        setHaveValuesBeenUpdated(true);
    };

    // Use Effects
    useEffect(() => {
        GetActiveHolidays();
    }, []);

    // Validate form before submission
    function validateFormFields () {

        var validationSuccessful = true;
        if (holidayNames.length === 0)
        {
            const element = document.getElementById("namesLabel");
            if (element)
            {
                element.classList.add("error-label");
            }
            const errorText = document.getElementById("namesErrorText");
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
            SetHolidays(data);
        }
    };

    // API Calls
    async function GetActiveHolidays(data) {
        try {

            // Get all active holidays
            const response = await axios.get("https://localhost:44379/Holiday/get-active-holidays");

            if (response.status === 200) {

                let tempEnabled = [];
                let tempDisabled = [];

                setChristmasActive(response.data.isChristmasActive);
                if (response.data.isChristmasActive) {
                    tempEnabled.push("Christmas");
                }
                else{
                    tempDisabled.push("Christmas");
                }

                setEasterActive(response.data.isEasterActive);
                if (response.data.isEasterActive) {
                    tempEnabled.push("Easter");
                }
                else{
                    tempDisabled.push("Easter");
                }

                setFathersDayActive(response.data.isFathersDayActive);
                if (response.data.isFathersDayActive) {
                    tempEnabled.push("Father's Day");
                }
                else{
                    tempDisabled.push("Father's Day");
                }

                setHalloweenActive(response.data.isHalloweenActive);
                if (response.data.isHalloweenActive) {
                    tempEnabled.push("Halloween");
                }
                else{
                    tempDisabled.push("Halloween");
                }

                setIndependenceDayActive(response.data.isIndependenceDayActive);
                if (response.data.isIndependenceDayActive) {
                    tempEnabled.push("Independence Day");
                }
                else{
                    tempDisabled.push("Independence Day");
                }

                setLaborDayActive(response.data.isLaborDayActive);
                if (response.data.isLaborDayActive) {
                    tempEnabled.push("Labor Day");
                }
                else{
                    tempDisabled.push("Labor Day");
                }

                setMemorialDayActive(response.data.isMemorialDayActive);
                if (response.data.isMemorialDayActive) {
                    tempEnabled.push("Memorial Day");
                }
                else{
                    tempDisabled.push("Memorial Day");
                }

                setMothersDayActive(response.data.isMothersDayActive);
                if (response.data.isMothersDayActive) {
                    tempEnabled.push("Mother's Day");
                }
                else{
                    tempDisabled.push("Mother's Day");
                }

                setNewYearsDayActive(response.data.isNewYearsDayActive);
                if (response.data.isNewYearsDayActive) {
                    tempEnabled.push("New Year's Day");
                }
                else{
                    tempDisabled.push("New Year's Day");
                }

                setNewYearsEveActive(response.data.isNewYearsEveActive);
                if (response.data.isNewYearsEveActive) {
                    tempEnabled.push("New Year's Eve");
                }
                else{
                    tempDisabled.push("New Year's Eve");
                }

                setThanksgivingActive(response.data.isThanksgivingActive);
                if (response.data.isThanksgivingActive) {
                    tempEnabled.push("Thanksgiving");
                }
                else{
                    tempDisabled.push("Thanksgiving");
                }

                setValentinesDayActive(response.data.isValentinesDayActive);
                if (response.data.isValentinesDayActive) {
                    tempEnabled.push("Valentine's Day");
                }
                else{
                    tempDisabled.push("Valentine's Day");
                }

                setEnabledHolidays(tempEnabled);
                setDisabledHolidays(tempDisabled);
                
            }
        } catch (error) {
            if (error.response) {
                setErrorState(error.response.data.title);
            }
            setOpen(false);
        }
    }

    async function SetHolidays(data) {

        try {
            // Create holiday records
            const response = await axios.post("https://localhost:44379/Holiday/set-holidays", {
                enabledHolidays: enabledHolidays,
                disabledHolidays: disabledHolidays
            });

            // Clear form & close dialog window
            if (response.status === 200) {
                setSuccessState('Holiday added successfully!');
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
                <AddHolidayButton
                    variant="contained"
                    endIcon={<FlareIcon sx={{ color: '#e6e600' }} />}
                    onClick={handleClickOpen}
                >
                    Add
                </AddHolidayButton>
                <form id="set-holidays" onSubmit={handleSubmit(onSubmit)}>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogTitle>
                            <Box display="flex" alignItems="center">
                                <FlareIcon
                                    fontSize='large'
                                    sx={{ mr: 2, color: '#e6e600' }}
                                />
                                <Typography className="sec-header2">
                                    Select Holidays
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
                            <FormGroup>
                                <Box display="flex" justifyContent="space-around">
                                    <Stack gap={1}>
                                        <FormControlLabel
                                            label="Christmas"
                                            control={
                                                <StyledCheckbox
                                                    id='Christmas'
                                                    value={christmasActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Easter"
                                            control={
                                                <StyledCheckbox
                                                    id='Easter'
                                                    value={easterActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Father's Day"
                                            control={
                                                <StyledCheckbox
                                                    id="Father's Day"
                                                    value={fathersDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Halloween"
                                            control={
                                                <StyledCheckbox
                                                    id='Halloween'
                                                    value={halloweenActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Independence Day"
                                            control={
                                                <StyledCheckbox
                                                    id='Independence Day'
                                                    value={independenceDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Labor Day"
                                            control={
                                                <StyledCheckbox
                                                    id='Labor Day'
                                                    value={laborDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                    </Stack>
                                    <Stack gap={1}>
                                        <FormControlLabel
                                            label="Memorial Day"
                                            control={
                                                <StyledCheckbox
                                                    id='Memorial Day'
                                                    value={memorialDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Mother's Day"
                                            control={
                                                <StyledCheckbox
                                                    id="Mother's Day"
                                                    value={mothersDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="New Year's Day"
                                            control={
                                                <StyledCheckbox
                                                    id="New Year's Day"
                                                    value={newYearsDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="New Year's Eve"
                                            control={
                                                <StyledCheckbox
                                                    id="New Year's Eve"
                                                    value={newYearsEveActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Thanksgiving"
                                            control={
                                                <StyledCheckbox
                                                    id='Thanksgiving'
                                                    value={thanksgivingActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Valentine's Day"
                                            control={
                                                <StyledCheckbox
                                                    id="Valentine's Day"
                                                    value={valentinesDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                    </Stack>
                                </Box>
                            </FormGroup>
                        </DialogContent>
                        <DialogActions>
                            <SaveButton
                                id='submit'
                                type='submit'
                                form='set-holidays'
                                variant='contained'
                                disabled={!haveValuesBeenUpdated}
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

export default AddHolidayBtn;