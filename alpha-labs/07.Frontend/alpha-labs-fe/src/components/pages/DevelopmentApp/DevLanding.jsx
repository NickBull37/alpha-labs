import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { Navbar } from '../../../components';
import { devBull } from '../../../utils/constants';

const LandingPageStack = styled(Stack)(() => ({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
}));

const LandingContentStack = styled(Stack)(() => ({
    height: '85vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#101823'
    backgroundImage: '',
}));

const GradientButton = styled(Button)(() => ({
    minHeight: '45px',
    minWidth: '120px',
    color: '#fff',
    background: 'linear-gradient(to right, #0951aa, #00cccc)',
    boxShadow: '0px 2px 10px 1px #1a1a1a',
    backgroundColor: '#7e22ce',
    '&:hover': {
        background: 'linear-gradient(to right, #063a79, #009999)',
    },
}));

const DevLanding = () => {

    const navLinks = [];

    return (
        <LandingPageStack>
            <Navbar
                appName={"BullsDev"}
                navLinks={navLinks}
            />
            <LandingContentStack
                sx={{
                    pt: 16
                }}
            >
                <Box
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                >
                    <img scr={devBull} alt='logo' height={270} />
                    <Typography className='hacked-demo-h1'>
                        DEV-Bull
                    </Typography>
                </Box>
                {/* Box for title */}
                <Box>
                    <Typography align={'center'} variant='h4'>
                        A simple calendar app for tracking birthdays, holidays, and special events
                    </Typography>
                </Box>
                {/* Box for buttons */}
                <Box>
                    <Link to="/calendar-list">
                        <GradientButton
                            variant="contained"
                            size='large'
                            href="/calendar-list"
                        >
                            Enter
                        </GradientButton>
                    </Link>
                </Box>
            </LandingContentStack>
        </LandingPageStack>
    );
}

export default DevLanding;