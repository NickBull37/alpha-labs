import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Paper, Box, Grid, Button } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';
import EventIcon from '@mui/icons-material/Event';
import FlareIcon from '@mui/icons-material/Flare';
import { CalLandingHeader, CalButtonSet } from '../../../components';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const Toolbar = styled(Paper)(() => ({
    color: '#FFF',
    backgroundColor: '#1E293B',
    border: '2px solid #27272a',
    borderRadius: '12px',
}));

const Calendar = styled(Paper)(() => ({
    padding: '24px',
    color: '#FFF',
    backgroundColor: '#1E293B',
    border: '2px solid #27272a',
    borderRadius: '12px',
}));

const DayNode = styled(Paper)(() => ({
    color: '#FFF',
    backgroundColor: '#4d4d4d',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '110px',
    padding: '1em',
}));

const CurrentDayNode = styled(DayNode)(() => ({
    backgroundColor: 'rgba(25, 118, 210, 0.4)',
}));

const EmptyNode = styled(DayNode)(() => ({
    backgroundColor: '#1E293B',
}));

function createBirthdays(name, month, day) {
    return { name, month, day };
}
  
const rows = [
    createBirthdays('Jack\'s Birthday', 11, 8),
    createBirthdays('Mom\'s Birthday', 1, 21),
];

const CalendarList = () => {

    // Constants
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    const currentMonthRef = useRef(null);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // State variables
    const [currentDate, setCurrentDate] = useState(new Date());
    const [birthdays, setBirthdays] = useState([]);
    const [events, setEvents] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [successState, setSuccessState] = useState('');
    const [errorState, setErrorState] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);
    
    // Event Handlers
    const handlePrevYear = () => {
        setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    };

    const handleNextYear = () => {
        setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    };

    const handleSuccessClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccessOpen(false);
    };
    const handleFailureClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setFailureOpen(false);
    };

    // Use Effects
    useEffect(() => {
        if (currentMonthRef.current) {
            currentMonthRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        GetBirthdays();
    }, []);

    useEffect(() => {
        if (successState !== '')
        {
            GetBirthdays();
            console.log("Setting snackbar open.");
            console.log("Success State: " + successState);
            setSuccessOpen(true);
        }
    }, [successState]);

    useEffect(() => {
        if (errorState !== '')
        {
            setFailureOpen(true);
        }
    }, [errorState]);

    const renderCalendar = (year, month) => {
        const days = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();
        const endDay = new Date(year, month, days).getDay();

        let daysArray = [];
        for (let i = 0; i < startDay; i++) {
            daysArray.push(null);
        }
        for (let i = 1; i <= days; i++) {
            daysArray.push(i);
        }
        for (let i = endDay; i < 6; i++) {
            daysArray.push(null);
        }
        return daysArray;
    };

    // API Calls
    async function GetBirthdays() {

        try {
            // Get birthdays for the current calendar year
            const response = await axios.get("https://localhost:44379/Birthday/birthdays");

            if (response.status === 200) {
                setBirthdays(response.data);
            }
        } catch (error) {
            if (error.response) {
                setErrorState(error.response.data.title);
            }
        }
    }

    return (
        <>
            <CalLandingHeader />
            <CalButtonSet
                setSuccessState={setSuccessState}
                setErrorState={setErrorState}
            />
            <Box
                sx={{
                    my: 4,
                    px: 20,
                }}
            >
                <Toolbar elevation={8}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Button onClick={handlePrevYear} startIcon={<ArrowBack />}>Previous Year</Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                {currentDate.getFullYear()}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleNextYear} endIcon={<ArrowForward />}>Next Year</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
                {monthNames.map((monthName, index) => {
                    const daysInMonth = renderCalendar(currentDate.getFullYear(), index);
                    return (
                        <Calendar
                            key={index}
                            elevation={3}
                            style={{ marginTop: '40px' }}
                            ref={index === currentDate.getMonth() ? currentMonthRef : null}
                        >
                            <Typography variant="h6" align="center">
                                {monthName}
                            </Typography>
                            <Grid container spacing={1.5} style={{ marginTop: '8px' }}>
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                                    <Grid item xs={1.714} key={day}>
                                        <Typography variant="subtitle1" align="center">
                                            {day}
                                        </Typography>
                                    </Grid>
                                ))}
                                {daysInMonth.map((day, dayIndex) => (
                                    <Grid item xs={1.714} key={dayIndex}>
                                        <Link>
                                            {day ? (
                                                (day === todayDate && currentDate.getFullYear() === todayYear && index === todayMonth) ? (
                                                    <CurrentDayNode elevation={4}>
                                                        <Typography variant="body2">
                                                            {day}
                                                        </Typography>
                                                    </CurrentDayNode>
                                                ) : (
                                                    <DayNode elevation={4}>
                                                        <Typography variant="body2">
                                                            {day}
                                                        </Typography>
                                                        <Box
                                                            display="flex"
                                                            justifyContent="flex-end"
                                                            alignItems="flex-end"
                                                        >
                                                            {birthdays.find(element => element.day === day && element.monthName === monthName) !== undefined && (
                                                                <CakeIcon fontSize='large' sx={{ color: '#00e6e6' }} />
                                                            )}
                                                            {birthdays.find(element => element.day === day && element.monthName === monthName) !== undefined && (
                                                                <EventIcon fontSize='large'  sx={{ ml: 1.5, color: '#ff6600' }} />
                                                            )}
                                                            {birthdays.find(element => element.day === day && element.monthName === monthName) !== undefined && (
                                                                <FlareIcon fontSize='large' sx={{ ml: 1.5, color: '#e6e600' }} />
                                                            )}
                                                        </Box>
                                                        
                                                    </DayNode>
                                                )
                                                ) : (
                                                    <EmptyNode elevation={0}></EmptyNode>
                                                )}
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </Calendar>
                    );
                })}
            </Box>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {successState}
                </Alert>
            </Snackbar>
            <Snackbar open={failureOpen} autoHideDuration={6000} onClose={handleFailureClose}>
                <Alert
                    onClose={handleFailureClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    ERROR: {errorState}
                </Alert>
            </Snackbar>
        </>
    );
}

export default CalendarList;