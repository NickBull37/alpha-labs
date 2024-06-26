import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Box, Stack, Button } from '@mui/material';
import { calendarBull } from '../../../utils/constants';
import { CalendarHeader, CalLandingHeader } from '../../../components';

const LandingStack = styled(Stack)(() => ({
    height: '85vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: '',
    //backgroundColor: '#333333',
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
    return (
        <Stack>
            <CalendarHeader />
            <Stack
                pt={5}
                pb={8.5}
                gap={8}
                sx={{
                    bgcolor: '#101823'
                }}
            >
                <Stack gap={3}>
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
                            <Typography className="blackpearl-h1-blue-grad">
                                Calendar
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>

                {/* Box for title */}
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography align={'center'} variant='h4'>
                        A simple calendar app for tracking birthdays, holidays, and special events
                    </Typography>
                </Box>

                {/* Box for buttons */}
                <Box display={'flex'} justifyContent={'center'} gap={12}>
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
            </Stack>
        </Stack>
    )
}

export default CalendarLanding;