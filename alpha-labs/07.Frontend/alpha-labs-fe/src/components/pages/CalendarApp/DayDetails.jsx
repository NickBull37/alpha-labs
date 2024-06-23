import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Paper, Box, Grid, Button } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';
import EventIcon from '@mui/icons-material/Event';
import FlareIcon from '@mui/icons-material/Flare';
import { DayDetailsHeader } from '../../../components';
import { boxCat } from '../../../utils/constants';

const PageContainer = styled(Box)(() => ({
    height: "100vh",
    backgroundColor: "#182434",
}));

const SectionBox = styled(Box)(() => ({
    display: "flex",
    paddingBottom: 4
}));
const BirthdayBox = styled(SectionBox)(() => ({
    borderBottom: "1px solid #00cccc"
}));
const EventBox = styled(SectionBox)(() => ({
    borderBottom: "1px solid #ff6600"
}));
const HolidayBox = styled(SectionBox)(() => ({
    borderBottom: "1px solid #e6e600"
}));

const DetailsPaper = styled(Paper)(() => ({
    width: '500px',
    padding: '28px',
    color: '#FFF',
    backgroundColor: '#333333',
    borderRadius: '12px',
    boxShadow: '0px 0px 10px 1px #1a1a1a',
}));

const DayDetails = () => {

    // Constants
    const date = new Date();
    const currentYear = date.getFullYear();
    const [searchParams] = useSearchParams();
    const month = searchParams.get('month');

    // State variables
    const [birthdayDetails, setBirthdayDetails] = useState([]);
    const [eventDetails, setEventDetails] = useState([]);
    const [holidayDetails, setHolidayDetails] = useState([]);

    // Event handlers

    // Use Effects
    useEffect(() => {
        GetDetails(month);
    }, []);

    const formatDate = (dateString) => {

        const date = new Date(dateString);
        if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)) {

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = String(date.getFullYear()).slice(-2);
            return `${month}/${day}/${year}`;

        } else {
            console.error('Invalid Date object');
            return null;
        }
    };

    async function GetDetails(month) {

        try {
            // Get birthdays, events, & holidays for the selected month
            const response = await axios.get(`https://localhost:44379/Details/get-month-details?month=${month}`);

            if (response.status === 200) {
                setBirthdayDetails(response.data.birthdays);
                setEventDetails(response.data.events);
                setHolidayDetails(response.data.holidays);
            }
        } catch (error) {
            // if (error.response) {
            //     setErrorState(error.response.data.title);
            // }
        }
    }

    return (
        <PageContainer>
            <DayDetailsHeader />
            <Stack
                display="flex"
                alignItems="center"
                mt={4}
                gap={1.5}
            >
                <Typography className="blackpearl-h3-blue-grad">
                    {month} {currentYear}
                </Typography>
                <DetailsPaper>
                    {birthdayDetails.length > 0 || holidayDetails.length > 0 ? (
                        <Stack gap={6}>
                            <Stack gap={1}>
                                <BirthdayBox gap={1.5}>
                                    <CakeIcon sx={{ color: '#00e6e6' }} />
                                    <Typography className='sec-header3'>
                                        Birthdays
                                    </Typography>
                                </BirthdayBox>
                                {birthdayDetails.length > 0 ? (
                                    <Box>
                                        {birthdayDetails.map((birthdayDetail) => (
                                            <Box display="flex" justifyContent="space-between" alignItems="baseline">
                                                <Typography sx={{ mr: 1 }}>
                                                    {birthdayDetail.birthday.name}
                                                </Typography>
                                                <Typography className='color-gray300'>
                                                    - {formatDate(birthdayDetail.birthday.date)}
                                                </Typography>
                                                <Typography flexGrow={1}></Typography>
                                                {birthdayDetail.daysUntil >= 0 ? (
                                                    <Typography className='color-gray300' sx={{ fontStyle: 'italic' }}>
                                                        occurs in <span className='blackpearl-p-blue-grad'>{birthdayDetail.daysUntil}</span>days
                                                    </Typography>
                                                ) : (
                                                    <Typography className='color-gray300' sx={{ fontStyle: 'italic' }}>
                                                        occured <span className='blackpearl-p-blue-grad'>{birthdayDetail.daysUntil * -1}</span>days ago
                                                    </Typography>
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                ) : (
                                    <Box sx={{ mb: 2 }}></Box>
                                )}
                            </Stack>

                            <Stack gap={1}>
                                <EventBox gap={1.5}>
                                    <EventIcon sx={{ color: '#ff6600' }} />
                                    <Typography className='sec-header3'>
                                        Events
                                    </Typography>
                                </EventBox>
                                {/* {(eventDetails ?? []).map((eventDetail, index) => (
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography sx={{ mr: 1 }}>
                                            {eventDetail.birthday.name}
                                        </Typography>
                                        <Typography className='color-gray300'>
                                            - {formatDate(eventDetail.birthday.date)}
                                        </Typography>
                                        <Typography flexGrow={1}></Typography>
                                        <Typography className='color-gray300' sx={{ fontStyle: 'italic' }}>
                                            occurs in <span className='blackpear-p-blue-grad'>{eventDetail.daysUntil}</span>days
                                        </Typography>
                                    </Box>
                                ))} */}
                                <Box sx={{ mb: 2 }}></Box>
                            </Stack>

                            <Stack gap={1}>
                                <HolidayBox gap={1.5}>
                                    <FlareIcon sx={{ color: '#e6e600' }} />
                                    <Typography className='sec-header3'>
                                        Holidays
                                    </Typography>
                                </HolidayBox>
                                {holidayDetails.length > 0 ? (
                                    <Box>
                                        {holidayDetails.map((holidayDetail) => (
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography sx={{ mr: 1 }}>
                                                    {holidayDetail.holiday.name}
                                                </Typography>
                                                <Typography className='color-gray300'>
                                                    - {formatDate(holidayDetail.holiday.date)}
                                                </Typography>
                                                <Typography flexGrow={1}></Typography>
                                                {holidayDetail.daysUntil >= 0 ? (
                                                    <Typography className='color-gray300' sx={{ fontStyle: 'italic' }}>
                                                        occurs in <span className='blackpearl-p-blue-grad'>{holidayDetail.daysUntil}</span>days
                                                    </Typography>
                                                ) : (
                                                    <Typography className='color-gray300' sx={{ fontStyle: 'italic' }}>
                                                        occured <span className='blackpearl-p-blue-grad'>{holidayDetail.daysUntil * -1}</span>days ago
                                                    </Typography>
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                ) : (
                                    <Box sx={{ mb: 1 }}></Box>
                                )}
                            </Stack>

                        </Stack>
                    ) : (
                        <Stack alignItems="center" sx={{ mt: 2 }}>
                            <Typography className="sec-header4">Empty</Typography>
                            <img src={boxCat} height={300}/>
                        </Stack>
                    )}
                </DetailsPaper>
            </Stack>
        </PageContainer>
    );
}

export default DayDetails;