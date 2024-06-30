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

        if (name === "Christmas") {
            setChristmasActive(!christmasActive);
        }
        if (name === "Easter") {
            setEasterActive(!easterActive);
        }
        if (name === "Father's Day") {
            setFathersDayActive(!fathersDayActive);
        }
        if (name === "Halloween") {
            setHalloweenActive(!halloweenActive);
        }
        if (name === "Independence Day") {
            setIndependenceDayActive(!independenceDayActive);
        }
        if (name === "Labor Day") {
            setLaborDayActive(!laborDayActive);
        }
        if (name === "Memorial Day") {
            setMemorialDayActive(!memorialDayActive);
        }
        if (name === "Mother's Day") {
            setMothersDayActive(!mothersDayActive);
        }
        if (name === "New Year's Day") {
            setNewYearsDayActive(!newYearsDayActive);
        }
        if (name === "New Year's Eve") {
            setNewYearsEveActive(!newYearsEveActive);
        }
        if (name === "Thanksgiving") {
            setThanksgivingActive(!thanksgivingActive);
        }
        if (name === "Valentine's Day") {
            setValentinesDayActive(!valentinesDayActive);
        }

        console.log("Name: " + name);
        console.log("Enabled Holidays: " + enabledHolidays);
        console.log("Disabled Holidays: " + disabledHolidays);

        let tempEnabled = enabledHolidays;
        let tempDisabled = disabledHolidays;

        if (isChecked) {
            tempEnabled.push(name);
            console.log("Temp Enabled: " + tempEnabled);
            let filteredDisabled = tempDisabled.filter(holiday => holiday !== name);
            console.log("Filtered Disabled: " + filteredDisabled);
            setEnabledHolidays(tempEnabled);
            setDisabledHolidays(filteredDisabled);
        }
        else {
            tempDisabled.push(name);
            let filteredEnabled = tempEnabled.filter(holiday => holiday !== name);
            setEnabledHolidays(filteredEnabled);
            setDisabledHolidays(tempDisabled);
        }
        setHaveValuesBeenUpdated(true);
    };

    // Use Effects
    useEffect(() => {
        GetActiveHolidays();
    }, []);

    // Form submission
    const onSubmit = (data) => {
        SetHolidays(data);
    };

    // API Calls
    async function GetActiveHolidays(data) {
        try {

            // Get all active holidays
            const response = await axios.get("https://localhost:44379/Holiday/get-holiday-statuses");

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
                setSuccessState('Holidays set successfully!');
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
                    onClick={handleClickOpen}
                >
                    <Stack alignItems="center" gap={1}>
                        <Typography>Manage</Typography>
                        <Typography>Holidays</Typography>
                        <FlareIcon sx={{ color: '#e6e600' }} />
                    </Stack>
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
                                                    checked={christmasActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Easter"
                                            control={
                                                <StyledCheckbox
                                                    id='Easter'
                                                    checked={easterActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Father's Day"
                                            control={
                                                <StyledCheckbox
                                                    id="Father's Day"
                                                    checked={fathersDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Halloween"
                                            control={
                                                <StyledCheckbox
                                                    id='Halloween'
                                                    checked={halloweenActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Independence Day"
                                            control={
                                                <StyledCheckbox
                                                    id='Independence Day'
                                                    checked={independenceDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Labor Day"
                                            control={
                                                <StyledCheckbox
                                                    id='Labor Day'
                                                    checked={laborDayActive}
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
                                                    checked={memorialDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Mother's Day"
                                            control={
                                                <StyledCheckbox
                                                    id="Mother's Day"
                                                    checked={mothersDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="New Year's Day"
                                            control={
                                                <StyledCheckbox
                                                    id="New Year's Day"
                                                    checked={newYearsDayActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="New Year's Eve"
                                            control={
                                                <StyledCheckbox
                                                    id="New Year's Eve"
                                                    checked={newYearsEveActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Thanksgiving"
                                            control={
                                                <StyledCheckbox
                                                    id='Thanksgiving'
                                                    checked={thanksgivingActive}
                                                    onChange={(e) => UpdateHolidayNamesList(e.target.id, e.target.checked)}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Valentine's Day"
                                            control={
                                                <StyledCheckbox
                                                    id="Valentine's Day"
                                                    checked={valentinesDayActive}
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