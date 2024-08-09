import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { Navbar } from '../../../components';
import { devBullLanding } from '../../../utils/constants';

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
    background: 'linear-gradient(to right, #17824b, #00e6cf)',
    boxShadow: '0px 2px 10px 1px #1a1a1a',
    backgroundColor: '#7e22ce',
    '&:hover': {
        background: 'linear-gradient(to right, #136c3e, #00b3a1)',
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
                gap={8}
                sx={{
                    pt: 16
                }}
            >
                <Box
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                >
                    <img src={devBullLanding} alt='logo' height={270} />
                    <Box
                        sx={{
                            px: 4,
                            backgroundColor: "#0D0F1C",
                            border: "1px solid #00ffdd",
                            borderRadius: "4px",
                            boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 15px 0px rgba(0, 0, 0, 0.44), 0px 1px 15px 0px rgba(0, 0, 0, 0.42)"
                        }}
                    >
                        <Typography className='hacked-h1'>
                            DEV-Bull
                        </Typography>
                    </Box>
                </Box>
                {/* Box for title */}
                <Box>
                    <Typography align={'center'} variant='h4'>
                        Examples & cheat-sheets for everything development related
                    </Typography>
                </Box>
                {/* Box for buttons */}
                <Box>
                    <Link to="/dev-home">
                        <GradientButton
                            variant="contained"
                            size='large'
                            href="/dev-home"
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