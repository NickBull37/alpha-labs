import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Box, Stack, Button } from '@mui/material';
import { calendarBull } from '../../../utils/constants';
import { NavbarLandingPage } from '../../../components';

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

const CalendarLanding = () => {

    const blue = 'rgba(25, 118, 210, 0.8)';

    return (
        <LandingPageStack>
            <NavbarLandingPage
                appName={"BullsCalendar"}
            />
            <LandingContentStack className="cal-bg-image" gap={8} pb={4}>
                <Stack ml={1}>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems="center"
                    >
                        <img src={calendarBull} alt='logo' height={270} />
                        <Stack>
                            <Typography className="blackpearl-h1-blue-grad">
                                Bull's
                            </Typography>
                            <Typography className="blackpearl-h1caps-blue-grad"
                                sx={{
                                    pl: 1
                                }}
                            >
                                CALENDAR
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>

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
    )
}

export default CalendarLanding;