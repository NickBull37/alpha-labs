import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Typography, Paper, Box, Grid, Button } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';
import EventIcon from '@mui/icons-material/Event';
import FlareIcon from '@mui/icons-material/Flare';
import { DayDetailsHeader } from '../../../components';

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
    return (
        <PageContainer>
            <DayDetailsHeader />
            <Stack
                display="flex"
                alignItems="center"
                mt={4}
                gap={1.5}
            >
                <Typography className="blackpear-h3-blue-grad">
                    June 2024
                </Typography>
                <DetailsPaper>
                    <Stack gap={6}>
                        <Stack gap={1}>
                            <BirthdayBox gap={2}>
                                <CakeIcon sx={{ color: '#00e6e6' }} />
                                <Typography className='sec-header3'>
                                    Birthdays
                                </Typography>
                            </BirthdayBox>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography sx={{ mr: 1 }}>
                                    Lexi's Birthday
                                </Typography>
                                <Typography className='color-gray300'>
                                    - 7/6/24
                                </Typography>
                                <Typography flexGrow={1}></Typography>
                                <Typography className='color-gray300' sx={{ fontStyle: 'italic' }}>
                                    occurs in <span className='blackpear-p-blue-grad'>4</span>days
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack gap={1}>
                            <EventBox gap={2}>
                                <EventIcon sx={{ color: '#ff6600' }} />
                                <Typography className='sec-header3'>
                                    Events
                                </Typography>
                            </EventBox>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography sx={{ mr: 1 }}>
                                    Webstaurant Party
                                </Typography>
                                <Typography className='color-gray300'>
                                    - 7/4/24
                                </Typography>
                                <Typography flexGrow={1}></Typography>
                                <Typography className='color-gray300' sx={{ fontStyle: 'italic' }}>
                                    occurs in <span className='blackpear-p-blue-grad'>19</span>days
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack gap={1}>
                            <HolidayBox gap={2}>
                                <FlareIcon sx={{ color: '#e6e600' }} />
                                <Typography className='sec-header3'>
                                    Holidays
                                </Typography>
                            </HolidayBox>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography sx={{ mr: 1 }}>
                                    Father's Day
                                </Typography>
                                <Typography className='color-gray300'>
                                    - 7/21/24
                                </Typography>
                                <Typography flexGrow={1}></Typography>
                                <Typography className='color-gray300' sx={{ fontStyle: 'italic' }}>
                                    occurs in <span className='blackpear-p-blue-grad'>7</span>days
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </DetailsPaper>
            </Stack>
        </PageContainer>
    );
}

export default DayDetails;