import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { Navbar } from '../../../components';
import { weatherBull } from '../../../utils/constants';

const LandingPageStack = styled(Stack)(() => ({
    width: '100vw',
    display: 'flex',
}));

const LandingContentStack = styled(Stack)(() => ({
    height: '100%',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const WeatherLanding = () => {

    const navLinks = [];

    return (
        <LandingPageStack>
            <Navbar
                appName={"BullsWeather"}
                navLinks={navLinks}
            />
            <LandingContentStack
                gap={2}
                sx={{
                    pt: 20
                }}
            >
                <Box
                    display="flex"
                >
                    <Typography className='eros-h1-blue-grad'>
                        Bull's
                    </Typography>
                    <img src={weatherBull} height={200}></img>
                    <Typography>
                        Weather
                    </Typography>
                </Box>
            </LandingContentStack>
        </LandingPageStack>
    );
}

export default WeatherLanding;